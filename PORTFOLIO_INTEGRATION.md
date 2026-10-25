# Portfolio link (when ready)

Add a **planned** or **live** card in `my-website/src/lib/projects.ts`:

```ts
{
  id: 'conways-game-of-life',
  title: "Conway's Game of Life",
  description: '...',
  technologies: ['TypeScript', 'React', 'Next.js'],
  status: 'planned', // or 'completed'
  category: 'web',
  demoUrl: process.env.NEXT_PUBLIC_CONWAYS_LIFE_DEMO_URL ?? 'http://localhost:3004',
  github: 'https://github.com/emmarthur/conways-game-of-life',
}
```

Deploy this repo separately; the portfolio only links out.
