# Ewuji John

The personal platform for Ewuji John: practical Azure, DevOps, Kubernetes, and Infrastructure-as-Code learning through training, technical writing, labs, and community resources.

## Planned stack

- Next.js with TypeScript and the App Router
- Tailwind CSS
- MDX for public articles and learning material
- MongoDB Atlas for registrations, contact messages, and other private dynamic records
- Zod for server-side validation
- Vercel for preview and production deployments

## Project status

The project is currently in the planning and repository-foundation stage. Application setup, local commands, and deployment instructions will be added when the Next.js application is created.

## Environment variables

Create `.env.local` locally when the application is ready. Do not commit it.

```text
MONGODB_URI=
NEXT_PUBLIC_SITE_URL=
```

`MONGODB_URI` is server-only and must never use the `NEXT_PUBLIC_` prefix.

## Deployment flow

1. Create a feature branch.
2. Open a pull request and review the Vercel preview deployment.
3. Merge to protected `main` after checks, accessibility review, and content review pass.
4. Vercel deploys the production site from `main`.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request. Security vulnerabilities must follow [SECURITY.md](SECURITY.md) and should not be reported in public issues.

## Community

Participation is governed by [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
