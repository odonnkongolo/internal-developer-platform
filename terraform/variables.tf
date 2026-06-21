variable "aws_region" {
  type    = string
  default = "eu-west-1"
}

variable "environment" {
  type    = string
  default = "development"
}

variable "vpc_id" {
  type        = string
  description = "Target enterprise network loop"
  default     = "vpc-0123456789abcdef0" 
}