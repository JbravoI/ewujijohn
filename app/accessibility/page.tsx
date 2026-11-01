import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "Accessibility", description: "Accessibility statement for Ewuji John's Azure and DevOps learning platform.", path: "/accessibility" });
export default function Accessibility(){return <PageHero eyebrow="Accessibility" title="Accessible learning is a requirement."><p>This site is designed for keyboard use, visible focus states, readable contrast, and responsive layouts. If you encounter a barrier, please report it through the contact form with the page and issue.</p></PageHero>}
