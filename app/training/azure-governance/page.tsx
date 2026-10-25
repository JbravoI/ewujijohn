import { PageHero } from "@/components/page-hero";

const sections = [
  ["What you will build", "A governed Azure foundation: a resource group with consistent tags, least-privilege role assignments, and a policy baseline. The Terraform workflow will use variables, outputs, validation, and a remote-state discussion."],
  ["Prerequisites", "An Azure subscription you control, Contributor access for the target scope, Terraform, Azure CLI, Git, and a separate test resource group. Use your own budget and never share credentials or state files."],
  ["Architecture", "Terraform authenticates through Azure identity, creates the resource group and tags, applies scoped RBAC, and assigns policy only at the intended scope. State is private operational data and must never be committed."],
  ["Threat model", "Protect subscription access, credentials, state, and role assignments. Prefer least privilege, review policy effects before enforcement, and test all changes in an isolated environment."],
  ["Cost guidance", "Resource groups, tags, RBAC assignments, and policy assignments do not normally create direct resource charges. Costs arise from resources deployed inside groups and from supporting state/storage services. Set a budget alert before labs."],
  ["Deployment and teardown", "Run terraform fmt and validate, review terraform plan carefully, apply only to the intended subscription, verify tags/RBAC/policy in Azure, then destroy test resources when finished. Confirm no shared resources are in the target group before teardown."],
  ["Troubleshooting", "For authorization errors, verify your Azure role and target scope. For policy denials, inspect the assignment and its effect. For state conflicts, stop concurrent applies and use the approved remote backend workflow."],
] as const;

export default function AzureGovernanceTrainingPage() {
  return <><PageHero eyebrow="Month 1 · Azure governance" title="Resource groups, tags, RBAC, and Azure Policy basics."><p>A practical foundation for learners moving from portal-first Azure work to safe, repeatable Infrastructure as Code.</p></PageHero><section className="shell section"><p className="eyebrow">Topic guide</p><div className="card-grid">{sections.map(([title, body]) => <article className="card" key={title}><h2>{title}</h2><p>{body}</p></article>)}</div></section><section className="shell section"><p className="eyebrow">Next steps</p><p className="lede">The Terraform sample, exercises, slides, recording, and registration details will be published here before the live class. This is independent community education; it does not promise certification, employment, or Microsoft endorsement.</p></section></>;
}
