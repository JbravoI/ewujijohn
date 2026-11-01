import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata({ title: "Privacy", description: "Privacy information for Ewuji John's contact and training-registration services.", path: "/privacy" });
export default function Privacy(){return <PageHero eyebrow="Privacy" title="Your information, handled carefully."><p>Contact and registration details are collected only to respond to an enquiry or administer the requested class. They are not published, sold, or added to marketing without separate consent. You may request deletion through the contact form.</p></PageHero>}
