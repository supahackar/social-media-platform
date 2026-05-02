# ClickChat

CMPS 350 Web Development — Phase 2
A social media platform built with Next.js, Prisma, and SQLite.

---

## Setup

```bash
npm install
npx prisma migrate deploy
node prisma/seed.mjs
npm run dev
```

App runs at `http://localhost:3000`

---

## Project Structure

```
app/
  api/           REST API routes (posts, users, comments, likes, follows, auth)
  stats/         Statistics page — React/Next.js (route: /stats)
  page.jsx       Home/landing page (route: /)
  layout.jsx     Root layout — loads fonts and global CSS

public/
  *.html / *.js  Phase 1 pages served as static files
  styles/        global.css — all styles for the whole app
  media/         icons and images

repos/           Data repository — all Prisma queries live here
prisma/
  schema.prisma
  seed.mjs       Populates the DB with fake data using faker.js
  migrations/
```

The static HTML/JS pages call the API with `fetch("/api/...")`.

---

## Data Model

| Model   | Fields |
|---------|--------|
| User    | id, username, email, password, bio, createdAt |
| Post    | id, content, createdAt, userId |
| Like    | id, userId, postId |
| Comment | id, content, createdAt, userId, postId |
| Follow  | id, followerId, followingId |

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| GET | `/api/posts?userId=` | Feed posts (or `?type=user` for profile posts) |
| POST | `/api/posts` | Create post |
| DELETE | `/api/posts/[id]` | Delete post |
| GET | `/api/users` | List all users |
| GET | `/api/users/[id]` | Get user by id |
| PUT | `/api/users/[id]` | Update profile |
| GET | `/api/comments?postId=` | Get comments for a post |
| POST | `/api/comments` | Add comment |
| DELETE | `/api/comments?id=&userId=` | Delete comment |
| POST | `/api/likes` | Toggle like |
| POST | `/api/follows` | Toggle follow |

---

## Statistics (repos/stats.js)

All stats are computed by the database using Prisma queries — no in-app filtering.

1. **Average posts per user** — `groupBy userId` on posts, divide total by number of active users
2. **Average followers per user** — `groupBy followingId` on follows, divide by total user count
3. **Most active user** — `groupBy userId` on posts, `orderBy count desc`, `take 1`
4. **Most liked post** — `groupBy postId` on likes, `orderBy count desc`, `take 1`
5. **Most followed user** — `groupBy followingId` on follows, `orderBy count desc`, `take 1`
6. **Platform overview** — `count()` on all five models in parallel
7. **Top 5 most commented posts** — `groupBy postId` on comments, `orderBy count desc`, `take 5`
