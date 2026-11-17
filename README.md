# 🍕 PizzaHub — Client Application

The modern Next.js client for **PizzaHub**, a full-stack multi-vendor pizza ordering and delivery platform.

## 🚀 Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, Lucide React, ShadCN UI
- **Animations:** Motion (Framer Motion)
- **Notifications:** Sonner Toaster
- **Theme:** Next-Themes (Light/Dark Mode support)
- **Authentication:** Better Auth with Google OAuth & Credentials

## ⚙️ Environment Variables Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in the following variables:
- `NEXT_PUBLIC_API_URL`: Backend API base URL (e.g. `http://localhost:5000/api`)
- `BETTER_AUTH_SECRET`: Secret token for Better Auth
- `BETTER_AUTH_URL`: Base client URL (e.g. `http://localhost:3000`)
- `NEXT_PUBLIC_IMGBB_API_KEY`: ImgBB API key for uploading pizza pictures

## 💻 Running Locally
```bash
npm install
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the application.
