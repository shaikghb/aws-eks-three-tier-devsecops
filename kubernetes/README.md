# Kubernetes deployment manifests

Manifests will be added after application images and health contracts are tested. Workloads should use non-root security contexts, dropped capabilities, resource requests/limits, explicit probes, non-secret ConfigMaps and Secrets Manager integration through the selected AWS workload identity pattern.

Do not commit plaintext production Secret objects. Keep the public edge at the load balancer and use network policies that permit only required traffic.
