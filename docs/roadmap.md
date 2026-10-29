# Delivery roadmap

## Milestone 1 — bootstrap
- [x] Repo layout and architecture/security documentation
- [x] React and Node starter services
- [x] Local Docker Compose and PostgreSQL
- [x] Unit tests and baseline CI workflow
- [x] Trivy filesystem/image and secret scan jobs
- [ ] Run CI and resolve findings before merging

## Milestone 2 — quality gates
- [ ] Configure SonarQube/SonarCloud and enforce quality gate
- [ ] Add coverage upload
- [ ] Pin third-party Actions to reviewed immutable SHAs
- [ ] Enable branch protection, required reviews and checks
- [ ] Define owner/expiry for accepted vulnerability exceptions

## Milestone 3 — AWS foundation (dev first)
- [ ] Decide region, budget, CIDR plan, RDS settings and expected traffic
- [ ] Configure remote Terraform state, encryption, versioning and locking
- [ ] Build reusable VPC, IAM/OIDC, ECR, EKS, RDS, CloudWatch and WAF modules
- [ ] Validate IAM policies and Terraform plan; review cost before apply
- [ ] Apply only after reviewing plan and confirming budget

## Milestone 4 — delivery
- [ ] Build and scan images, push by commit SHA/digest to ECR
- [ ] Configure AWS OIDC trust scoped to repo and environment
- [ ] Deploy using a dedicated least-privilege role
- [ ] Use GitHub Environment approvals for protected environments
- [ ] Verify health checks and test rollback

## Milestone 5 — production hardening
- [ ] TLS, WAF rules, rate limiting and ingress restrictions
- [ ] Pod Security, network policies, workload IAM and policy validation
- [ ] Autoscaling, dashboards, alarms and log retention
- [ ] RDS backup/restore rehearsal and DR exercise
- [ ] Document SLOs, incident process and operating runbooks
