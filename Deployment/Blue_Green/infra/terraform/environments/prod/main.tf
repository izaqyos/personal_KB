terraform {
  required_version = ">= 1.5"

  backend "s3" {
    bucket         = "your-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.env
      ManagedBy   = "terraform"
      Project     = var.project_name
    }
  }
}

variable "env" {
  description = "Environment name"
  type        = string
  default     = "prod"
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "your-app"
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "public_subnet_ids" {
  description = "Public subnet IDs for ALB"
  type        = list(string)
}

variable "private_subnet_ids" {
  description = "Private subnet IDs for ECS tasks"
  type        = list(string)
}

variable "certificate_arn" {
  description = "ACM certificate ARN for HTTPS"
  type        = string
}

variable "sns_topic_arn" {
  description = "SNS topic ARN for alarm notifications"
  type        = string
}

module "blue_green_alb" {
  source = "../../modules/blue-green-alb"

  env               = var.env
  vpc_id            = var.vpc_id
  public_subnet_ids = var.public_subnet_ids
  private_subnet_ids = var.private_subnet_ids
  certificate_arn   = var.certificate_arn

  health_check_path = "/health"
  container_port    = 8080

  tags = {
    Project = var.project_name
  }
}

module "canary_alarms" {
  source = "../../modules/canary-alarms"

  env                    = var.env
  alb_arn_suffix         = module.blue_green_alb.alb_arn_suffix
  green_tg_arn_suffix    = module.blue_green_alb.green_tg_arn_suffix
  ecs_cluster_name       = aws_ecs_cluster.main.name
  ecs_service_name_green = aws_ecs_service.green.name
  sns_topic_arn          = var.sns_topic_arn

  error_rate_threshold     = 1.0
  p99_latency_threshold_ms = 2000
  cpu_threshold            = 80
  memory_threshold         = 80
}

resource "aws_ecs_cluster" "main" {
  name = "${var.env}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_ecs_service" "blue" {
  name            = "${var.env}-app-blue"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 3
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.private_subnet_ids
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = module.blue_green_alb.blue_tg_arn
    container_name   = "app"
    container_port   = 8080
  }

  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent         = 200

  lifecycle {
    ignore_changes = [task_definition, desired_count]
  }
}

resource "aws_ecs_service" "green" {
  name            = "${var.env}-app-green"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 0
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.private_subnet_ids
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = module.blue_green_alb.green_tg_arn
    container_name   = "app"
    container_port   = 8080
  }

  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent         = 200

  lifecycle {
    ignore_changes = [task_definition, desired_count]
  }
}

resource "aws_ecs_task_definition" "app" {
  family                   = "${var.env}-app-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "1024"
  memory                   = "2048"
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name      = "app"
      image     = "PLACEHOLDER"
      essential = true

      portMappings = [
        {
          containerPort = 8080
          protocol      = "tcp"
        }
      ]

      environment = [
        { name = "ENV", value = var.env },
        { name = "AWS_REGION", value = var.aws_region }
      ]

      secrets = [
        {
          name      = "DB_CONNECTION_STRING"
          valueFrom = "arn:aws:secretsmanager:${var.aws_region}:${data.aws_caller_identity.current.account_id}:secret:${var.env}/app/db-connection-string"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.app.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }

      healthCheck = {
        command     = ["CMD-SHELL", "curl -f http://localhost:8080/health || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }
    }
  ])

  lifecycle {
    ignore_changes = [container_definitions]
  }
}

data "aws_caller_identity" "current" {}

resource "aws_security_group" "ecs" {
  name_prefix = "${var.env}-ecs-"
  vpc_id      = var.vpc_id

  ingress {
    description     = "Traffic from ALB"
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [module.blue_green_alb.alb_sg_id]
  }

  egress {
    description = "All outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.env}-ecs-sg"
  }
}

resource "aws_iam_role" "ecs_execution" {
  name = "${var.env}-ecs-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_execution" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role" "ecs_task" {
  name = "${var.env}-ecs-task-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_cloudwatch_log_group" "app" {
  name              = "/ecs/${var.env}-app"
  retention_in_days = 90
}

output "alb_dns" {
  description = "ALB DNS name"
  value       = module.blue_green_alb.alb_dns_name
}

output "green_internal_url" {
  description = "Internal URL for green pre-traffic testing"
  value       = module.blue_green_alb.green_internal_url
}

output "alarm_names" {
  description = "Canary alarm names"
  value       = module.canary_alarms.alarm_names
}
