variable "env" {
  description = "Environment name"
  type        = string
}

variable "alb_arn_suffix" {
  description = "ALB ARN suffix for CloudWatch dimensions"
  type        = string
}

variable "green_tg_arn_suffix" {
  description = "Green target group ARN suffix for CloudWatch dimensions"
  type        = string
}

variable "ecs_cluster_name" {
  description = "ECS cluster name"
  type        = string
}

variable "ecs_service_name_green" {
  description = "ECS green service name"
  type        = string
}

variable "sns_topic_arn" {
  description = "SNS topic ARN for alarm actions"
  type        = string
}

variable "error_rate_threshold" {
  description = "5xx error rate threshold percentage"
  type        = number
  default     = 1.0
}

variable "p99_latency_threshold_ms" {
  description = "p99 latency threshold in milliseconds"
  type        = number
  default     = 2000
}

variable "cpu_threshold" {
  description = "CPU utilization threshold percentage"
  type        = number
  default     = 80
}

variable "memory_threshold" {
  description = "Memory utilization threshold percentage"
  type        = number
  default     = 80
}

locals {
  common_tags = {
    Environment = var.env
    Purpose     = "canary-monitoring"
  }
}

resource "aws_cloudwatch_metric_alarm" "green_5xx_rate" {
  alarm_name        = "${var.env}-green-5xx-rate"
  alarm_description = "5xx error rate on green target group exceeds ${var.error_rate_threshold}%"

  evaluation_periods  = 2
  datapoints_to_alarm = 2
  comparison_operator = "GreaterThanThreshold"
  threshold           = var.error_rate_threshold
  treat_missing_data  = "notBreaching"

  metric_query {
    id          = "error_rate"
    expression  = "(errors/requests)*100"
    label       = "5xx Error Rate %"
    return_data = true
  }

  metric_query {
    id = "errors"

    metric {
      metric_name = "HTTPCode_Target_5XX_Count"
      namespace   = "AWS/ApplicationELB"
      period      = 60
      stat        = "Sum"

      dimensions = {
        LoadBalancer = var.alb_arn_suffix
        TargetGroup  = var.green_tg_arn_suffix
      }
    }
  }

  metric_query {
    id = "requests"

    metric {
      metric_name = "RequestCount"
      namespace   = "AWS/ApplicationELB"
      period      = 60
      stat        = "Sum"

      dimensions = {
        LoadBalancer = var.alb_arn_suffix
        TargetGroup  = var.green_tg_arn_suffix
      }
    }
  }

  alarm_actions = [var.sns_topic_arn]
  ok_actions    = [var.sns_topic_arn]

  tags = local.common_tags
}

resource "aws_cloudwatch_metric_alarm" "green_p99_latency" {
  alarm_name        = "${var.env}-green-p99-latency"
  alarm_description = "p99 latency on green target group exceeds ${var.p99_latency_threshold_ms}ms"

  namespace           = "AWS/ApplicationELB"
  metric_name         = "TargetResponseTime"
  statistic           = "p99"
  period              = 60
  evaluation_periods  = 3
  datapoints_to_alarm = 2
  comparison_operator = "GreaterThanThreshold"
  threshold           = var.p99_latency_threshold_ms / 1000
  treat_missing_data  = "notBreaching"

  dimensions = {
    LoadBalancer = var.alb_arn_suffix
    TargetGroup  = var.green_tg_arn_suffix
  }

  alarm_actions = [var.sns_topic_arn]
  ok_actions    = [var.sns_topic_arn]

  tags = local.common_tags
}

resource "aws_cloudwatch_metric_alarm" "green_4xx_spike" {
  alarm_name        = "${var.env}-green-4xx-spike"
  alarm_description = "4xx error rate on green target group exceeds 10%"

  evaluation_periods  = 3
  datapoints_to_alarm = 2
  comparison_operator = "GreaterThanThreshold"
  threshold           = 10
  treat_missing_data  = "notBreaching"

  metric_query {
    id          = "error_rate"
    expression  = "(errors/requests)*100"
    label       = "4xx Error Rate %"
    return_data = true
  }

  metric_query {
    id = "errors"

    metric {
      metric_name = "HTTPCode_Target_4XX_Count"
      namespace   = "AWS/ApplicationELB"
      period      = 60
      stat        = "Sum"

      dimensions = {
        LoadBalancer = var.alb_arn_suffix
        TargetGroup  = var.green_tg_arn_suffix
      }
    }
  }

  metric_query {
    id = "requests"

    metric {
      metric_name = "RequestCount"
      namespace   = "AWS/ApplicationELB"
      period      = 60
      stat        = "Sum"

      dimensions = {
        LoadBalancer = var.alb_arn_suffix
        TargetGroup  = var.green_tg_arn_suffix
      }
    }
  }

  alarm_actions = [var.sns_topic_arn]

  tags = local.common_tags
}

resource "aws_cloudwatch_metric_alarm" "green_cpu" {
  alarm_name        = "${var.env}-green-cpu-high"
  alarm_description = "CPU utilization on green ECS service exceeds ${var.cpu_threshold}%"

  namespace           = "AWS/ECS"
  metric_name         = "CPUUtilization"
  statistic           = "Average"
  period              = 60
  evaluation_periods  = 3
  datapoints_to_alarm = 2
  comparison_operator = "GreaterThanThreshold"
  threshold           = var.cpu_threshold
  treat_missing_data  = "notBreaching"

  dimensions = {
    ClusterName = var.ecs_cluster_name
    ServiceName = var.ecs_service_name_green
  }

  alarm_actions = [var.sns_topic_arn]

  tags = local.common_tags
}

resource "aws_cloudwatch_metric_alarm" "green_memory" {
  alarm_name        = "${var.env}-green-memory-high"
  alarm_description = "Memory utilization on green ECS service exceeds ${var.memory_threshold}%"

  namespace           = "AWS/ECS"
  metric_name         = "MemoryUtilization"
  statistic           = "Average"
  period              = 60
  evaluation_periods  = 3
  datapoints_to_alarm = 2
  comparison_operator = "GreaterThanThreshold"
  threshold           = var.memory_threshold
  treat_missing_data  = "notBreaching"

  dimensions = {
    ClusterName = var.ecs_cluster_name
    ServiceName = var.ecs_service_name_green
  }

  alarm_actions = [var.sns_topic_arn]

  tags = local.common_tags
}

resource "aws_cloudwatch_metric_alarm" "green_healthy_hosts" {
  alarm_name        = "${var.env}-green-unhealthy"
  alarm_description = "Green target group has fewer than 1 healthy host"

  namespace           = "AWS/ApplicationELB"
  metric_name         = "HealthyHostCount"
  statistic           = "Minimum"
  period              = 60
  evaluation_periods  = 2
  datapoints_to_alarm = 2
  comparison_operator = "LessThanThreshold"
  threshold           = 1
  treat_missing_data  = "breaching"

  dimensions = {
    LoadBalancer = var.alb_arn_suffix
    TargetGroup  = var.green_tg_arn_suffix
  }

  alarm_actions = [var.sns_topic_arn]

  tags = local.common_tags
}

output "alarm_names" {
  description = "Map of alarm purpose to alarm name"
  value = {
    error_5xx  = aws_cloudwatch_metric_alarm.green_5xx_rate.alarm_name
    latency_p99 = aws_cloudwatch_metric_alarm.green_p99_latency.alarm_name
    error_4xx  = aws_cloudwatch_metric_alarm.green_4xx_spike.alarm_name
    cpu_high   = aws_cloudwatch_metric_alarm.green_cpu.alarm_name
    memory_high = aws_cloudwatch_metric_alarm.green_memory.alarm_name
    unhealthy  = aws_cloudwatch_metric_alarm.green_healthy_hosts.alarm_name
  }
}
