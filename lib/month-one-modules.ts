export type TrainingModule = {
  title: string;
  overview: string;
  technicality: string;
  task: string;
  links: { label: string; href: string }[];
  videos?: { title: string; description: string; href: string }[];
};

export const monthOneModules: TrainingModule[] = [
  {
    title: "Azure subscriptions, resources, and resource groups",
    overview: "Learn the Azure Resource Manager hierarchy and how subscriptions and resource groups provide ownership, billing, deployment, and lifecycle boundaries.",
    technicality: "Work with Azure portal scopes, resource providers, naming conventions, and resource-group lifecycle decisions.",
    task: "Create a resource group for a sample workload, deploy two resources, then identify the right scope for access and policy.",
    links: [{ label: "Azure Resource Manager overview", href: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/overview" }],
    videos: [
      { title: "Azure Regions and Global Infrastructure", description: "Understand Azure regions and how Microsoft's global cloud infrastructure is organised.", href: "https://youtu.be/x93O4hUzsO8?si=WQ9jlzujOqBNGOkS" },
      { title: "Understanding Cloud Costs", description: "Learn about cloud pricing, cost management, and the factors that influence cloud infrastructure expenses.", href: "https://youtu.be/dalPCDhDTKs?si=eD_ZQUtaoHamyZqw" },
    ],
  },
  {
    title: "Management groups, tags, and consistent resource organisation",
    overview: "Organise subscriptions at scale and make resources easier to find, allocate, and govern.",
    technicality: "Examine inheritance, management-group scopes, tag keys and values, and tag limitations.",
    task: "Sketch a management-group hierarchy and apply environment, owner, and cost-centre tags.",
    links: [{ label: "Management groups overview", href: "https://learn.microsoft.com/en-us/azure/governance/management-groups/overview" }, { label: "Use tags to organise Azure resources", href: "https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources" }],
    videos: [{ title: "Azure Management Groups, Subscriptions, Resource Groups, and Resources", description: "Understand how Azure resources are organised and managed using Azure's resource hierarchy.", href: "https://youtu.be/zfh0yIuWHew?si=M82G_SHDwrALPygA" }],
  },
  { title: "Role-based access control (RBAC) and least-privilege access", overview: "Control who can perform which actions at management-group, subscription, resource-group, and resource scope.", technicality: "Work with security principals, built-in roles, role assignments, scope inheritance, and least privilege.", task: "Give a test group Reader access to one resource group and Contributor access to a separate development group.", links: [{ label: "What is Azure RBAC?", href: "https://learn.microsoft.com/en-us/azure/role-based-access-control/overview" }] },
  { title: "Azure Policy basics and governance guardrails", overview: "Use Azure Policy to audit, deny, modify, or deploy configuration that keeps Azure workloads aligned with organisational rules.", technicality: "Review definitions, initiatives, assignments, effects, compliance results, exemptions, and policy scope.", task: "Assign a built-in policy that audits missing tags, inspect compliance, then design a development initiative.", links: [{ label: "Azure Policy documentation", href: "https://learn.microsoft.com/en-us/azure/governance/policy/" }] },
  { title: "Platform capacity, performance, availability, and cost monitoring", overview: "Establish an operational baseline by collecting health signals and using them to respond to reliability and cost concerns.", technicality: "Explore Azure Monitor metrics, activity logs, alerts, Log Analytics, and Cost Management analysis.", task: "Create a metric alert, then review Cost Management and identify one cost-control action.", links: [{ label: "Azure Monitor documentation", href: "https://learn.microsoft.com/en-us/azure/azure-monitor/" }, { label: "Microsoft Cost Management documentation", href: "https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/" }] },
  { title: "An introduction to hybrid connectivity with Azure Arc, ExpressRoute, and VPN Gateway", overview: "Understand Azure services that connect or manage on-premises and multicloud environments alongside Azure.", technicality: "Compare management-plane and connectivity use cases, private connectivity trade-offs, and site-to-site VPN.", task: "Choose Azure Arc, VPN Gateway, or ExpressRoute for three hybrid scenarios and explain the trade-off.", links: [{ label: "Azure Arc overview", href: "https://learn.microsoft.com/en-us/azure/azure-arc/overview" }, { label: "What is Azure ExpressRoute?", href: "https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction" }, { label: "About Azure VPN Gateway", href: "https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpngateways" }] },
];

export const monthOneModuleTitles = monthOneModules.map((module) => module.title);
