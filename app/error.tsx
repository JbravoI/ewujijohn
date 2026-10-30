"use client";
export default function ErrorPage({ reset }: { reset: () => void }) { return <main className="shell section"><p className="eyebrow">Something went wrong</p><h1>We couldn’t load this page.</h1><p>Please try again. If the issue continues, use the contact page to let me know.</p><button className="button primary" onClick={reset}>Try again</button></main>; }
