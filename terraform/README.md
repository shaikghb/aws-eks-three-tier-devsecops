# Terraform layout placeholder

Planned reusable modules: VPC, IAM GitHub OIDC, ECR, EKS, RDS PostgreSQL, WAF/ingress, and observability. Environment roots will separate dev and prod.

Before deployment, configure remote state with encryption, versioning, access controls and locking. Never commit Terraform state, backend credentials or real terraform.tfvars. Run fmt, validate, security scanning and human-reviewed terraform plan. This placeholder creates no infrastructure.
