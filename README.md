# Nepali Youth of America Website

Professional nonprofit/youth organization website for Nepali Youth of America (NYA), supported by the Nepalese Association of Michigan (NeAM).

## Tech Stack

- Next.js App Router
- React
- Tailwind CSS
- Framer Motion
- Lucide React icons

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm run start
```

The project is structured for deployment on Vercel.

## Environment Variables

Create a local `.env.local` file for secrets. Do not commit real values.

```bash
ADMIN_KEY=replace-with-a-long-random-admin-key
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

On Vercel, add the same variables in Project Settings → Environment Variables.

## Contact Form Submissions

The student and parent information form posts to `/api/contact` and saves
responses locally in:

```bash
data/submissions.json
```

The support interest form posts to `/api/support` and saves responses locally in:

```bash
data/supporters.json
```

View saved responses at:

```bash
http://localhost:3000/admin/submissions
```

Enter your `ADMIN_KEY` on the admin login page to view responses. The login
uses an HTTP-only cookie so the key is not kept in the URL.

Important: local JSON storage is only a development fallback. For public Vercel
deployment, set `DATABASE_URL` from a persistent Postgres database such as Neon.
