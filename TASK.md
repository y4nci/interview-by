# Take-Home Interview Task

**Stack**: [Hono](https://hono.dev/docs/) + [oRPC](https://orpc.dev/docs) + [Kysely](https://kysely.dev/docs/intro) + PostgreSQL · [Next.js 15](https://nextjs.org/docs) (App Router) + [Supabase Auth](https://supabase.com/docs/guides/auth) + [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview) — see [README](./README.md) for a short description of each.

**Time estimate**: 60 minutes. Depth over breadth — do fewer things well rather than rushing to finish everything.

---

## Task

The `/protected` page currently shows no courses. Make it show the actual courses the logged-in user is enrolled in.

Treat this as a production codebase. We care about correctness, type safety, and readable code. If you get stuck, leave a comment explaining your approach and move on — we'll continue from there in the in-person session.

---

## What exists

**API** (`apps/api/`):
- Hono server with an oRPC handler mounted at `/rpc`. See `app.ts`.
- oRPC is already installed.
- Database connection and full Kysely type definitions: `apps/api/src/infrastructure/config/`

**Frontend** (`apps/web/`):
- Next.js 15 App Router with Supabase SSR auth
- oRPC client and server utilities: `apps/web/utils/orpc/`
- TanStack Query is configured and the provider is in the root layout

**Database**: The schema and seed data are in `supabase/`. Relevant tables: `courses`, `course_members`.

---

## Setup

**Prerequisites**: Node.js 18+, Docker, pnpm

```bash
# 1. Install dependencies
pnpm install

# 2. Start Supabase (note the publishable key and secret key from the output)
supabase start

# 3. Apply migrations and seed data
supabase db reset

# 4. Seed test users
cd supabase && npm install
SUPABASE_URL=http://127.0.0.1:54321 \
SUPABASE_SECRET_KEY=<secret key> \
npm run seed
cd ..

# 5. Start the apps (two terminals)
pnpm --filter @workspace/api dev   # API  → http://localhost:3001
pnpm --filter @workspace/web dev   # Web  → http://localhost:3000
```

**Supabase Studio**: http://127.0.0.1:54323

### Environment variables

Create `.env.local` in the project root:

```env
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=<publishable key>
SUPABASE_SECRET_KEY=<secret key>
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## Test credentials

All passwords are `password123`.

| Email | Role | Enrolled in |
|-------|------|-------------|
| alice.student@university.edu | Student | CS Fundamentals, Web Development |
| bob.student@university.edu | Student | CS Fundamentals, Database Systems |
| charlie.student@university.edu | Student | All three courses |
| diana.student@university.edu | Student | Web Development only |
| prof.smith@university.edu | Instructor | Teaches CS Fundamentals, Database Systems |
| dr.johnson@university.edu | Instructor | Teaches Web Development |

To verify your implementation, log in as `alice.student@university.edu` — she should see **CS Fundamentals** and **Web Development**.
