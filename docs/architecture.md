# Architecture and design decisions

## Application tiers
- **Presentation:** static React application built by Vite and served by Nginx.
- **Service:** Node.js/Express REST API with security headers, restricted CORS and health endpoints.
- **Data:** PostgreSQL on Amazon RDS in private subnets in AWS; local Compose uses PostgreSQL.

## Target AWS shape
1. Public entry: AWS WAF associated with an ALB or supported ingress integration, HTTPS-only with ACM certificates.
2. Private application layer: EKS workloads on private subnets; public ingress limited to the load balancer.
3. Private data layer: RDS PostgreSQL, no public endpoint, TLS in transit, encryption at rest, backups and retention.
4. ECR stores immutable image tags/digests. EKS pulls images using IAM roles, not embedded credentials.
5. GitHub Actions assumes a narrowly scoped AWS role via OIDC. Use separate roles and protected environments for dev and prod.

## Trust boundaries
- Internet to edge: approved HTTPS entry points; WAF managed rules and rate limits.
- Edge to app: only intended service routes; API not directly internet-exposed unless designed.
- App to database: access only from backend workload identity/security group; credentials from Secrets Manager.
- CI to AWS: OIDC subject and audience restricted in IAM trust. No static AWS access keys.
- Developer machine: local .env files are ignored by Git; examples contain placeholders only.

A modular monorepo keeps application, deployment and infrastructure changes together. Docker Compose makes local development reproducible before cloud spending. Terraform will use reusable modules and separate environment roots; configure remote encrypted state and locking before team use.
