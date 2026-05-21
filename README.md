# grok-build-website

Landing page for [grok-build-web](https://github.com/AppleLamps/grok-build-web) — the browser chat UI for the `grok` CLI.

**Live site:** [grokbuildweb.com](https://grokbuildweb.com)

## About

Grok Build Web lets you run `grok --web` and drive the Grok Build agent from a local browser instead of the terminal UI. This site explains what it does, how the bridge works, and links to the source on GitHub.

## Project structure

```
grok-build-website/
├── index.html              # Page shell
├── css/
│   ├── reset.css           # Minimal reset
│   ├── variables.css       # Design tokens
│   ├── base.css            # Typography & utilities
│   ├── layout.css          # Header, footer, grid
│   ├── components.css      # Buttons, nav, tables, code blocks
│   └── sections.css        # Hero, features, CTA, UI mockup
├── js/
│   ├── main.js             # Entry point
│   └── nav.js              # Mobile nav & scroll reveal
├── assets/
│   └── favicon.svg
├── vercel.json             # Security & cache headers
└── README.md
```

Static site — no build step, no npm dependencies.

## Local preview

Any static file server works. Examples:

```powershell
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Open `http://localhost:8080`.

## Deploy to Vercel

1. Push this repo to GitHub (`AppleLamps/grok-build-website`).
2. Import the project in [Vercel](https://vercel.com/new).
3. Leave build command empty and output directory as `.` (root).
4. Deploy.
5. Add custom domain **grokbuildweb.com** in Vercel → Project → Settings → Domains (and `www` if desired).

Vercel serves `index.html` at `/` automatically. `vercel.json` adds security headers and long-lived cache for CSS/JS assets.

## Related

- **grok-build-web** — [github.com/AppleLamps/grok-build-web](https://github.com/AppleLamps/grok-build-web)
- **Agent Client Protocol** — [agentclientprotocol.com](https://agentclientprotocol.com/)
## License

Same as the grok-build-web project it promotes.
