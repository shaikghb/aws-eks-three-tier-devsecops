# Initial threat model

| Asset | Threat | Initial mitigation |
|---|---|---|
| Source and CI | Secret committed or malicious dependency | Gitleaks, dependency review, Dependabot, locked CI permissions |
| Container images | Vulnerable package or root process | Trivy scans, small runtime images, non-root execution |
| AWS identity | Long-lived key leak or overbroad role | OIDC federation, restricted subject, least privilege |
| API | Injection, noisy errors, oversized payload | Parameterized SQL, JSON size limit, Helmet, generic errors |
| Database | Public exposure or stolen credentials | Private RDS, narrow security groups, Secrets Manager, TLS |
| Cluster | Privileged pod or lateral movement | Pod hardening, workload IAM, resource limits, network policy |
| User traffic | Web attacks or abuse | HTTPS, WAF, rate limiting and security headers at edge |

This is a starting point, not a complete assessment. Revisit when topology, authentication, user data and threat assumptions are known.
