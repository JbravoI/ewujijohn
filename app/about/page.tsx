import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "About", description: "Learn about Ewuji John, a Senior DevOps Engineer and cloud infrastructure specialist sharing practical Azure and DevOps learning.", path: "/about" });
export default function AboutPage(){return <PageHero eyebrow="About" title="Cloud engineering with a practical focus."><p>Ewuji John is a Senior DevOps Engineer and cloud infrastructure specialist based in Lagos, Nigeria. His work spans Azure, AWS, Kubernetes, Terraform, CI/CD automation, and production reliability.</p><p>Through Bravo Digitals, he shares hands-on learning resources for aspiring cloud learners and working DevOps engineers.</p></PageHero>}
