variable "env" {
  description = "Environment name"
  type        = string
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

variable "health_check_path" {
  description = "Health check endpoint path"
  type        = string
  default     = "/health"
}

variable "container_port" {
  description = "Container port"
  type        = number
  default     = 8080
}

variable "tags" {
  description = "Additional tags"
  type        = map(string)
  default     = {}
}

resource "aws_lb" "main" {
  name               = "${var.env}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = var.public_subnet_ids

  tags = merge(var.tags, {
    Name        = "${var.env}-alb"
    Environment = var.env
  })
}

resource "aws_security_group" "alb" {
  name_prefix = "${var.env}-alb-"
  vpc_id      = var.vpc_id

  ingress {
    description = "HTTPS from internet"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP from internet (redirected to HTTPS)"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "All outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.tags, {
    Name        = "${var.env}-alb-sg"
    Environment = var.env
  })
}

resource "aws_lb_target_group" "blue" {
  name        = "${var.env}-blue"
  port        = var.container_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    enabled             = true
    path                = var.health_check_path
    port                = "traffic-port"
    protocol            = "HTTP"
    healthy_threshold   = 3
    unhealthy_threshold = 3
    timeout             = 10
    interval            = 15
    matcher             = "200"
  }

  deregistration_delay = 30

  tags = merge(var.tags, {
    Name        = "${var.env}-blue-tg"
    Color       = "blue"
    Environment = var.env
  })
}

resource "aws_lb_target_group" "green" {
  name        = "${var.env}-green"
  port        = var.container_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    enabled             = true
    path                = var.health_check_path
    port                = "traffic-port"
    protocol            = "HTTP"
    healthy_threshold   = 3
    unhealthy_threshold = 3
    timeout             = 10
    interval            = 15
    matcher             = "200"
  }

  deregistration_delay = 30

  tags = merge(var.tags, {
    Name        = "${var.env}-green-tg"
    Color       = "green"
    Environment = var.env
  })
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.main.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = var.certificate_arn

  default_action {
    type = "forward"

    forward {
      target_group {
        arn    = aws_lb_target_group.blue.arn
        weight = 100
      }

      target_group {
        arn    = aws_lb_target_group.green.arn
        weight = 0
      }

      stickiness {
        enabled  = true
        duration = 300
      }
    }
  }
}

resource "aws_lb_listener" "http_redirect" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "green_internal" {
  load_balancer_arn = aws_lb.main.arn
  port              = 8443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = var.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.green.arn
  }
}

output "alb_arn" {
  description = "ALB ARN"
  value       = aws_lb.main.arn
}

output "alb_dns_name" {
  description = "ALB DNS name"
  value       = aws_lb.main.dns_name
}

output "alb_arn_suffix" {
  description = "ALB ARN suffix for CloudWatch metrics"
  value       = aws_lb.main.arn_suffix
}

output "alb_sg_id" {
  description = "ALB security group ID"
  value       = aws_security_group.alb.id
}

output "https_listener_arn" {
  description = "HTTPS listener ARN"
  value       = aws_lb_listener.https.arn
}

output "blue_tg_arn" {
  description = "Blue target group ARN"
  value       = aws_lb_target_group.blue.arn
}

output "green_tg_arn" {
  description = "Green target group ARN"
  value       = aws_lb_target_group.green.arn
}

output "green_tg_arn_suffix" {
  description = "Green target group ARN suffix for CloudWatch metrics"
  value       = aws_lb_target_group.green.arn_suffix
}

output "green_internal_url" {
  description = "Internal URL for green target group (pre-traffic smoke testing)"
  value       = "https://${aws_lb.main.dns_name}:8443"
}
