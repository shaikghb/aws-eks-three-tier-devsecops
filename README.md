# AWS EKS Three-Tier DevSecOps Platform

A production-minded learning project for building, scanning, deploying, and operating a three-tier application on AWS EKS. The stack is React (frontend), Node.js/Express (API), and Amazon RDS PostgreSQL (data), with GitHub Actions, OIDC federation, ECR, Terraform, Kubernetes, and layered security controls.

> **Status:** Bootstrap stage. Application scaffolding and CI security gates are the first milestone. AWS infrastructure is intentionally not provisioned by this repository yet. Review Terraform plans and estimated costs before applying anything.

## Architecture

```text
Browser
  |
  v
AWS WAF (planned) -> Application Load Balancer / Ingress
                          |
                    React frontend
                          |
                    Node.js API
                          |
             Private subnets / RDS PostgreSQL

GitHub Actions -> tests -> SonarQube/SonarCloud -> Trivy filesystem/image scans
              -> AWS OIDC role -> ECR -> EKS deployment (later milestone)

Secrets: AWS Secrets Manager; workloads should receive only the secrets they require.
```

## Repository layout

```text
app/
  frontend/                 React + Vite UI
  backend/                  Express API + tests
  database/                 local development schema/seed guidance
  docker-compose.yml        local app stack
.github/workflows/          pull-request CI and reusable security workflow
.github/dependabot.yml      dependency update automation
security/                   security policy and threat model notes
kubernetes/                 secure deployment manifests
terraform/                  reusable IaC module/environment layout
scripts/                    developer helper scripts
docs/                       architecture, setup and deployment runbooks
```

## Prerequisites

- Node.js 22 LTS and npm
- Docker Desktop / Docker Engine with Compose
- Git
- Optional later: Terraform, AWS CLI, `kubectl`, `helm`, SonarQube/SonarCloud token

## Run locally

```bash
cd app
cp .env.example .env
# Review and adjust local-only values in .env; never commit real credentials.
docker compose up --build
```

Frontend: http://localhost:8080  
API health: http://localhost:3000/health  
API info: http://localhost:3000/api/v1/info

If you prefer running Node directly:

```bash
cd app/backend && npm ci && npm test && npm start
# in another terminal
cd app/frontend && npm ci && npm run dev
```

## Security principles

- GitHub Actions authenticates to AWS via OIDC; do not create long-lived AWS access keys for CI.
- Use least-privilege IAM roles scoped to this repository and expected branch/environment.
- Keep RDS private; allow database ingress only from the backend workload security group.
- Put runtime credentials in AWS Secrets Manager and rotate them; never bake them into images, manifests, Terraform variables, or Git history.
- Use non-root containers, small base images, health checks, pinned GitHub Actions, dependency lockfiles, and read-only filesystems where possible.
- Run tests, static analysis, secret scanning, and Trivy vulnerability checks on pull requests and pushes. Treat scanner findings as blockers according to policy; do not suppress findings silently.
- Store Terraform state remotely with encryption, versioning, locking, and limited access before using shared environments.
- Do not deploy to a live AWS account until the plan, access rules, backup strategy, and cost are reviewed.

## Delivery milestones

1. **Foundation:** application starter, local Docker Compose, unit tests, CI checks, security documentation. (current branch)
2. **Quality gates:** configure SonarQube/SonarCloud and repository security settings; tighten scan thresholds.
3. **Infrastructure:** reusable Terraform modules for VPC, ECR, EKS, IAM/OIDC, RDS, logging and WAF/ingress; dev environment first.
4. **Delivery:** publish immutable container images to ECR and deploy to EKS using GitHub OIDC and protected environments.
5. **Hardening and operations:** network policy, Pod Security, autoscaling, metrics/logging/alerts, backups and disaster-recovery validation.

## GitHub configuration to complete

Set repository Actions permissions to **Read repository contents** by default and grant write permissions only to jobs that need them. Configure Sonar settings as repository/environment secrets if used. Set AWS role ARN, AWS region and ECR repository names as GitHub variables (not credentials). Create a GitHub Environment such as `dev` with required reviewers before adding deployment jobs. Configure AWS IAM OIDC trust to restrict `sub` to this repository and the intended environment/branch.

See [docs/architecture.md](docs/architecture.md), [docs/security.md](docs/security.md), and [docs/roadmap.md](docs/roadmap.md).

## Maintainer

Shaik Abzal Sharif — DevOps / DevSecOps learning project

## License

No license has been selected yet. All rights are reserved unless a license is added.
