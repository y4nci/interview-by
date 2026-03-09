# Interview Task

See [TASK.md](./TASK.md) for the task description and setup instructions.

## 🎯 System Overview

This mocked application allows educators to create courses and exams, while students can take exams and receive AI-powered feedback on their answers.
### Features

- **User Management**: Role-based access (Educators & Students)
- **Course Management**: Create and manage courses with multiple exams
- **AI Evaluation**: Automatic scoring and feedback using AI
- **Answer Review**: Students see their answers, educators see all submissions

### Tech Stack

- **[Hono](https://hono.dev/docs/)** — Lightweight, edge-first web framework for the API server. Similar to Express but built for modern runtimes.
- **[oRPC](https://orpc.dev/docs)** — Type-safe RPC layer, similar to tRPC. Procedures are defined with an `os` builder; the client infers types directly from the server router.
- **[Kysely](https://kysely.dev/docs/intro)** — Type-safe SQL query builder for TypeScript. Schema types live in `apps/api/src/infrastructure/config/database-types.ts`.
- **[Supabase Auth](https://supabase.com/docs/guides/auth)** — Handles authentication. The frontend uses Supabase SSR helpers; the API receives JWTs and can verify them using the Supabase admin client.
- **[TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)** — Server-state management on the frontend. oRPC's TanStack Query integration exposes `.queryOptions()` on each procedure.
- **[Next.js 15](https://nextjs.org/docs)** (App Router) — Frontend framework. Supports both Server and Client Components; the distinction matters when using hooks like `useQuery`.


### Project Structure

```
├── apps/
│   ├── api/          # Backend API (Hono + oRPC)
│   └── web/          # Frontend (Next.js)
├── packages/
│   └── ui/           # Shared UI components
├── supabase/
│   ├── migrations/   # Database schema
│   ├── seed-users.js # Auth user creation
│   └── config.toml   # Supabase configuration
├── package.json      # Root package.json
├── biome.json        # Root biome configuration
├── .env.example      # Environment variables example
├── TASK.md           # Task description
└── README.md
```
