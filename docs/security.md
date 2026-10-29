# Security policy and control checklist

## Secrets
- Never commit real tokens, passwords, private keys, AWS credentials, Terraform state or unredacted logs.
- Keep .env local; commit only .env.example with dummy values.
- Production secrets belong in AWS Secrets Manager behind narrowly scoped IAM roles and a rotation plan.
- Do not print secrets in CI logs or pass them as Docker build arguments.

## CI/CD
- Run tests and vulnerability scanning on pull requests and pushes.
- Run Gitleaks and Trivy filesystem scans; scan built images before publishing/deploying.
- Add SonarQube/SonarCloud when project key and token are configured; do not pretend analysis ran when credentials are absent.
- Set minimal workflow token permissions and require review before production deployment.
- Fail on critical vulnerabilities and document exceptions with owner, justification and expiry.

## Container and Kubernetes
- Use non-root runtime images, no bundled secrets, health checks and dependency lockfiles.
- Kubernetes containers should run non-root, drop Linux capabilities, disallow privilege escalation and use read-only filesystems where compatible.
- Set CPU/memory requests and limits; use startup, readiness and liveness probes.
- Use specific service accounts and Pod Identity/IRSA with least privilege.
- Validate NetworkPolicy against the selected CNI.

## AWS data/network
- RDS private-only, encrypted at rest, TLS required, backups enabled and access from backend only.
- WAF/ALB allow HTTPS and required routes; security group rules are narrow and source-restricted.
- Enable CloudTrail, EKS control-plane logs, CloudWatch alarms and ECR image scanning.
- Use encrypted/versioned remote Terraform state with restricted access and locking.

Report secret exposure privately. Revoke and rotate exposed credentials immediately; removing a file from the latest commit does not invalidate an exposed secret.
