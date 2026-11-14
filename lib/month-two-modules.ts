import type { TrainingModule } from "@/lib/month-one-modules";

export const monthTwoModules: TrainingModule[] = [
  {
    title: "Docker, container images, and Azure Container Registry (ACR)",
    overview: "Learn how container images package an application and its dependencies, then use Azure Container Registry as the private image registry for an Azure workload.",
    technicality: "Students will work with Dockerfiles, image layers, tags, local image builds, registry authentication, and the image-pull flow between ACR and Azure services.",
    task: "Containerise a small web application, build and tag its image, create an Azure Container Registry, and push the image to ACR.",
    links: [
      { label: "Introduction to Azure Container Registry", href: "https://learn.microsoft.com/en-us/azure/container-registry/container-registry-intro" },
      { label: "Push and pull images with the Docker CLI", href: "https://learn.microsoft.com/en-us/azure/container-registry/container-registry-get-started-docker-cli" },
    ],
  },
  {
    title: "Deploying, managing, and troubleshooting Azure Kubernetes Service (AKS)",
    overview: "Understand AKS as Azure's managed Kubernetes platform and deploy a first workload that can be operated through Kubernetes tooling.",
    technicality: "Students will cover cluster components, kubectl contexts, namespaces, deployments, services, pods, replicas, logs, and the basic workflow for diagnosing a failed workload.",
    task: "Create an AKS cluster, connect with kubectl, deploy a container image, expose it with a service, and use logs and events to diagnose an intentional deployment error.",
    links: [
      { label: "What is Azure Kubernetes Service?", href: "https://learn.microsoft.com/en-us/azure/aks/what-is-aks" },
      { label: "Deploy an application with the Azure CLI", href: "https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli" },
    ],
  },
  {
    title: "Helm charts and repeatable application delivery on AKS",
    overview: "Use Helm to package, configure, install, upgrade, and roll back Kubernetes applications in a repeatable way.",
    technicality: "Students will read chart structure, values files, releases, repositories, templates, versioning, and safe upgrade and rollback practices.",
    task: "Install a chart into a dedicated namespace, customise its values, inspect the generated resources, perform an upgrade, and roll it back.",
    links: [
      { label: "Use Helm with Azure Kubernetes Service", href: "https://learn.microsoft.com/en-us/azure/aks/kubernetes-helm" },
      { label: "Kubernetes application management with Helm", href: "https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-helm" },
    ],
  },
  {
    title: "AKS networking: CNI, ingress, Azure Load Balancer, and internal load balancing",
    overview: "Learn how traffic reaches AKS workloads and how cluster networking choices affect IP planning, exposure, security, and application connectivity.",
    technicality: "Students will compare Kubernetes services, Azure CNI concepts, ingress, external and internal load balancers, DNS, and private application entry points.",
    task: "Expose one application externally, expose another internally, then document the traffic flow and security controls for each service.",
    links: [
      { label: "AKS networking concepts", href: "https://learn.microsoft.com/en-us/azure/aks/concepts-network" },
      { label: "AKS load balancer concepts", href: "https://learn.microsoft.com/en-us/azure/aks/concepts-network-azure-load-balancer" },
      { label: "Ingress in AKS", href: "https://learn.microsoft.com/en-us/azure/aks/concepts-network-ingress" },
    ],
  },
  {
    title: "High availability, node pools, cluster upgrades, and day-2 operations",
    overview: "Operate an AKS platform beyond its first deployment by planning capacity, workload placement, upgrades, resilience, and routine maintenance.",
    technicality: "Students will work with system and user node pools, autoscaling, availability considerations, surge upgrades, disruption planning, and operational runbooks.",
    task: "Create a user node pool, schedule a workload to it, configure autoscaling, and prepare an upgrade checklist with a rollback decision point.",
    links: [
      { label: "AKS cluster and workload concepts", href: "https://learn.microsoft.com/en-us/azure/aks/concepts-clusters-workloads" },
      { label: "Upgrade an AKS cluster", href: "https://learn.microsoft.com/en-us/azure/aks/upgrade-cluster" },
      { label: "Use multiple node pools in AKS", href: "https://learn.microsoft.com/en-us/azure/aks/use-multiple-node-pools" },
    ],
  },
  {
    title: "Troubleshooting AKS workloads, networking, and cluster operations",
    overview: "Build a disciplined troubleshooting approach for common AKS failures across workloads, networking, identity, capacity, and observability.",
    technicality: "Students will interpret pod status, Kubernetes events, container logs, resource requests, networking symptoms, Azure diagnostics, and escalation evidence.",
    task: "Work through a troubleshooting scenario containing a failing pod, image-pull issue, and unavailable service; record the evidence, hypothesis, fix, and prevention action.",
    links: [
      { label: "Troubleshoot Azure Kubernetes Service", href: "https://learn.microsoft.com/en-us/azure/aks/troubleshooting" },
      { label: "Monitor Azure Kubernetes Service", href: "https://learn.microsoft.com/en-us/azure/aks/monitor-aks" },
    ],
  },
];

export const monthTwoModuleTitles = monthTwoModules.map((module) => module.title);
