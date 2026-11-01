import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "Terms and Disclaimer", description: "Terms and educational-material disclaimer for Ewuji John's Azure and DevOps learning platform.", path: "/terms" });
export default function Terms(){return <PageHero eyebrow="Terms and disclaimer" title="Educational material, used responsibly."><p>Resources are provided for independent learning and must be reviewed before production use. Cloud costs, configurations, and security requirements vary by environment. The programme does not promise certification, employment, or Microsoft endorsement.</p></PageHero>}
