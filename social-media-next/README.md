# ClickChat — Social Media Platform (Phase 2)

CMPS 350 Web Development — Phase 2

## Project Structure

The Phase 1 HTML/CSS/JS files live in `public/` and are served statically by Next.js.  
The **only** new Next.js React page built from scratch is the stats page.

```
social-media-next/
  public/
    feed.html        ← Phase 1 (served at /feed.html)
    feed.js
    login.html
    login.js
    register.html
    register.js
    profile.html
    profile.js
    users.html
    users.js
    styles/
    media/
  app/               ← Next.js app router
    api/             ← REST API routes
    stats/           ← Statistics page (React/Next.js)
  repos/             ← Data repository (Prisma queries)
  prisma/            ← Schema, migrations, seed
```

The HTML/JS files call the Next.js APIs with `fetch("/api/...")` instead of localStorage.  
APIs live at `http://localhost:3000/api/...`  
Stats page lives at `http://localhost:3000/stats`

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Screenshots needed for report

Take these screenshots as you go and add them to the Word report:

1. Terminal — seed ran successfully (users/posts/likes/comments created)
2. Terminal — dev server running (`npm run dev` showing `Ready on http://localhost:3000`)
3. Browser — `http://localhost:3000/feed.html` loading (app is served)
4. Register page — form submitted successfully
5. Login page — logged in with a seeded user
6. Feed page — posts loaded from the database
7. Feed page — new post created and appearing in feed
8. Feed page — liking a post (like count updates)
9. Feed page — commenting on a post
10. Profile page — user info, post count, followers/following count
11. Users page — list of all users
12. Users page — following a user (button changes state)
13. Stats page (`/stats`) — all 6+ statistics with real data
14. (Optional) Browser DevTools Network tab — successful `fetch` call to an API

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
