provider "aws" {
  region = var.aws_region
}

# 1. Customer Traffic Isolation (Frontend Edge Network)
resource "aws_s3_bucket" "frontend_bucket" {
  bucket        = "options-fintech-frontend-${var.environment}-platform"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "frontend_privacy" {
  bucket                  = aws_s3_bucket.frontend_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# 2. Internal Microservice Network Isolation (Backend)
resource "aws_security_group" "internal_backend_sg" {
  name        = "fintech-backend-${var.environment}-sg"
  description = "Restricts all direct inbound internet access to backend services"
  vpc_id      = var.vpc_id

  ingress {
    description = "Allow private internal microservice communication only"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"] # Restricted to internal VPC paths only
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}