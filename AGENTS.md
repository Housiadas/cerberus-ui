<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

### Plan Mode Default
- Enter plan mode for ANY not-trivial task (3+ steps or architectural decisions)
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### Self-Improvement Loop
- After ANY correction from the user: update `.claude/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until the mistake rate drops
- Review lessons at session start for a project

### Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes. Don't overengineer
- Challenge your own work before presenting it

### Skills usage
- Use skills for any task that requires a capability
- Load skills from `.claude/skills/`
- Invoke skills with natural language
- Each skill is one independent capability

### Subagents usage
- Use subagents liberally to keep the main context window clean
- Load subagents from `.claude/agents/`
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution on a given tech stack

## Core Principles
- **Simplicity First**: Make every change as simple as possible. Impact minimal code
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards

## 🛠️ Development Environment

- **Framework**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **UI Components**: Shadcn UI
- **Validation**: Zod
- **Forms & State Management**: React Hook Form, Zustand
- **Tables & Data Handling**: TanStack Table
- **Tooling & DX**: ESLint, Prettier, Husky
- **Package Manager**: `pnpm` (preferred)

## Project General Instructions

- Always use the latest versions of dependencies.
- Always create test cases for the generated code both positive and negative.
- Minimize the amount of code generated.

We use a **colocation-based file system**. 
Each feature keeps its own pages, components, and logic.

```
src
├── app               # Next.js routes (App Router)
│   ├── (auth)        # Auth layouts & screens
│   ├── (main)        # Main dashboard routes
│   │   └── (dashboard)
│   │       ├── crm
│   │       ├── finance
│   │       ├── default
│   │       └── ...
│   └── layout.tsx
├── components        # Shared UI components
├── hooks             # Reusable hooks
├── lib               # Config & utilities
├── styles            # Tailwind / theme setup
└── types             # TypeScript definitions
```

If you’d like a more detailed example of this setup, 
check out the [Next Colocation Template](https://github.com/arhamkhnz/next-colocation-template), where the full structure is explained with examples.

---

## Component Guidelines

- Use `shadcn/ui` components by default for form elements, cards, dialogs, etc.
- Style components with Tailwind utility classes
- Co-locate CSS modules or component-specific styling in the same directory

##  Code Style Standards

- Prefer arrow functions
- Annotate return types
- Always destructure props
- Avoid `any` type, use `unknown` or strict generics
- Group imports: react → next → libraries → local

##  React Query Patterns

- Set up `QueryClient` in `app/layout.tsx`
- Use `useQuery`, `useMutation`, `useInfiniteQuery` from `@tanstack/react-query`
- Place API logic in `/lib/api/` and call via hooks
- Use query keys prefixed by domain: `['user', id]`

## Testing Practices

- **Testing Library**: `@testing-library/react`
- **Mocking**: `msw`, `vi.mock()`
- **Test command**: `pnpm test`
- Organize tests in `/tests` or co-located with components

##  Security

- Validate all server-side inputs (API routes)
- Use HTTPS-only cookies and CSRF tokens when applicable
- Protect sensitive routes with middleware or session logic

##  Documentation & Onboarding

- Each component and hook should include a short comment on usage
- Document top-level files (like `app/layout.tsx`) and configs
- Keep `README.md` up to date with getting started, design tokens, and component usage notes

##  Verification 

- **Dev server**: `pnpm dev`
- **Build**: `pnpm build`
- **Start**: `pnpm start`
- **Lint**: `pnpm run lint`
- **Format**: `pnpm format`
- **Fix**: `pnpm run check:fix`
- **Test**: `pnpm test`
- Always create tests for new components and hooks
