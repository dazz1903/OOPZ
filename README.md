# OOPZ Alliance Command

Independent member portal for the OOPZ alliance. The project reuses selected static game datasets from AMP but does not depend on AMP infrastructure.

## Included

- Public homepage
- Discord OAuth with guild and optional role verification
- Personal and alliance dashboards
- Friendly account comparison
- AI battle-report analysis
- Purchase recommendation engine
- Guides and alliance roadmap surfaces
- D1 schema for members, snapshots, guides, roadmap items and report history
- R2 binding reserved for battle-report files

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Create a Discord application at the Discord Developer Portal.
3. Add `http://localhost:3001/auth/discord/callback` as a redirect URL.
4. Set the Discord client ID, client secret and guild ID in `.env.local`.
5. Generate a long random `AUTH_SECRET`.
6. Optionally set `OPENAI_API_KEY` to enable battle-report analysis.
7. Run `npm run dev`.

Production uses the same callback path on the deployed origin. Secrets belong in the hosting provider, never in Git.

## Data boundary

Reusable Last War datasets are copied into `lib/game-data`. `OOPZExisting` is not imported as a package, deployed, modified or required at runtime.
