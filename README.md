# Cerberus UI
The UI of our dashboard and analytics platform.

## Tech Stack

- **Framework**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4  
- **UI Components**: Shadcn UI  
- **Validation**: Zod  
- **Forms & State Management**: React Hook Form, Zustand  
- **Tables & Data Handling**: TanStack Table  
- **Tooling & DX**: ESLint, Prettier, Husky  

## Colocation File System Architecture

This project follows a **colocation-based architecture** each feature keeps its own pages, components, and logic inside its route folder.  
Shared UI, hooks, and configuration live at the top level, making the codebase modular, scalable, and easier to maintain as the app grows.

For a full breakdown of the structure with examples, see the [Next Colocation Template](https://github.com/arhamkhnz/next-colocation-template).

## Run locally

**Install dependencies**
```bash
make install
```

**Start the development server**
```bash
make dev
```

### Enabling Next.js MCP Server for Coding Agents
- [docs](https://nextjs.org/docs/app/guides/mcp)
