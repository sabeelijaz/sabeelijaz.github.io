# sabeelijaz.github.io

Personal portfolio website for [Sabeel Ijaz](https://sabeelijaz.me) — Full-Stack Software Engineer.

## Tech Stack

- **React 18** + **TypeScript** via **Vite**
- **Tailwind CSS** (utility layer on top of existing custom CSS)
- **react-helmet-async** for per-page SEO meta tags
- **EmailJS** for contact form and visitor gate emails
- **Google reCAPTCHA v2** for spam protection
- **Google Tag Manager** for analytics
- Deployed via **GitHub Actions** → **GitHub Pages**

## Project Structure

```
sabeelijaz.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deploy to GitHub Pages on push to main
├── public/
│   └── CNAME                   # Custom domain — sabeelijaz.me
├── src/
│   ├── components/
│   │   ├── VisitorGate.tsx     # Email capture modal on first visit
│   │   ├── Navbar.tsx          # Fixed nav with mobile menu
│   │   ├── Hero.tsx            # Hero section
│   │   ├── Stats.tsx           # Animated counters
│   │   ├── Experience.tsx      # Work history timeline
│   │   ├── Projects.tsx        # Project cards grid
│   │   ├── TechStack.tsx       # Skills / tech icons
│   │   ├── Services.tsx        # Services + Upwork CTA
│   │   ├── Testimonials.tsx    # Colleague testimonials
│   │   ├── Contact.tsx         # Contact form with validation
│   │   └── Footer.tsx
│   ├── data/
│   │   └── index.ts            # All content data (experience, projects, etc.)
│   ├── hooks/
│   │   └── useFadeUp.ts        # Intersection observer scroll animation
│   ├── utils/
│   │   └── security.ts         # Input validation, sanitization, rate limiting
│   ├── styles/
│   │   ├── style.css           # Core portfolio styles
│   │   ├── timeline.css        # Timeline component styles
│   │   └── techstack.css       # Tech stack grid styles
│   ├── index.css               # Tailwind directives + style imports
│   ├── App.tsx                 # Root component with Helmet SEO tags
│   └── main.tsx                # React entry point
├── index.html                  # Vite HTML entry (GTM, EmailJS, reCAPTCHA)
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output goes to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Deployment

Deployment is fully automated. Push to `main` and GitHub Actions will:

1. Install dependencies
2. Run `npm run build`
3. Push the `dist/` folder to the `gh-pages` branch
4. GitHub Pages serves it at [sabeelijaz.me](https://sabeelijaz.me)

The `CNAME` file in `public/` ensures the custom domain persists across every deploy.

## Adding a New Page

1. Create a new component in `src/components/` or `src/pages/`
2. Add `<Helmet>` inside it with page-specific title and meta tags:

```tsx
import { Helmet } from 'react-helmet-async'

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Blog — Sabeel Ijaz</title>
        <meta name="description" content="..." />
      </Helmet>
      {/* page content */}
    </>
  )
}
```

3. Wire it up with React Router when you're ready for multi-page routing.

## Environment & Secrets

No `.env` file is needed — all keys used here are public-facing (EmailJS public key, reCAPTCHA site key, GTM ID). They are safe to commit.

If you ever add server-side secrets, use [GitHub Actions secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) and inject them at build time via Vite's `import.meta.env`.
