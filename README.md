# PizzaHub — Client

The Next.js frontend for **PizzaHub**, a multi-vendor pizza ordering and delivery platform. Customers browse artisan pizzas, place orders, and manage their accounts; vendors publish menus and manage orders; admins moderate users, menu items, and subscription transactions.

- **Live site:** https://pizzahub-client-two.vercel.app
- **Client repository:** https://github.com/Asaduzzaman8088/pizzahub-client
- **Server repository:** https://github.com/Asaduzzaman8088/pizzahub-server

## Features

### Public
- Marketing home page with a dynamic **Featured Pizzas** section (approved + available items only), the six required category sections, Why Choose PizzaHub, How It Works, testimonials and FAQ.
- **Browse Menu** with search, category filter, location filter, dietary filters, and sorting.
- **Item Details** (`/menu/[id]`) with multiple images, vendor info, reviews, and ordering (login required).
- Hot Deals, About, Contact, and a custom **404** page.
- Motion (Framer Motion) animations on homepage sections.

### Authentication
- Email/password sign up and sign in (customer or vendor role).
- Password rule: at least 6 characters with at least one uppercase and one lowercase letter.
- Google sign-in (live OAuth when `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is configured, with a dev-only demo fallback).
- Navbar updates immediately after auth state changes; dashboard routes are protected by role.
- Blocked users are rejected by the API and cannot use protected features.

### Customer dashboard
- Overview cards + order-status charts.
- My Orders with cancel-pending-order support.
- Wishlist (favorites).
- Profile settings (name, image, password).

### Vendor dashboard
- Overview cards + order/item charts.
- My Menu with edit, delete, and availability toggle.
- Add Item with **ImgBB file upload** (required image).
- Customer Orders page with accept/reject for pending orders.
- Subscription page with Stripe Checkout (demo activation is server-side and development-only).
- Profile settings incl. business name.

### Admin dashboard
- Overview with users/orders/revenue/transactions charts.
- Manage Users (search, role filter, block/unblock, delete).
- Manage Menu Items (search, status filter, approve/reject/feature/inactive/delete).
- Read-only Transactions page.
- Profile settings.

## Tech Stack

| Area | Packages |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| UI | Tailwind CSS v4, shadcn/base-nova primitives, `@base-ui/react`, `lucide-react`, `class-variance-authority`, `cn`, `clsx`, `tailwind-merge` |
| Animation | `motion` (Framer Motion) |
| Notifications | `sonner` |
| Theme | `next-themes` |
| Images | Next Image + ImgBB uploads |
| Auth transport | Server-issued JWT stored in an httpOnly cookie |
| Tooling | ESLint, Prettier, `prettier-plugin-tailwindcss` |

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Yes | Express API base URL, e.g. `http://localhost:5000/api` |
| `NEXT_PUBLIC_IMGBB_API_KEY` | Yes (vendor uploads) | ImgBB API key used to upload menu item images |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Optional | Google OAuth Web Client ID (must match the server's `GOOGLE_CLIENT_ID`) |

Never commit `.env` / `.env.local` files. Only `.env.example` is tracked.

### Scripts

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

## Challenge implementation notes

### 1. Advanced menu search and sorting
The Browse Menu page builds query state (search text, category, location, sort) and the API supports:
`GET /api/menu?search=&category=&location=&sort=price-asc|price-desc|rating|oldest&featured=true&page=&limit=`
- `search` matches item name and description via case-insensitive regex.
- `category` and `location` filter server-side.
- `sort=price-asc` / `price-desc` sorts by price; `rating`, `oldest`, and default newest are also supported.
- The UI additionally applies instant client-side filtering over the fetched page for a snappy experience.

### 2. JWT verification flow
- The server signs a JWT on sign-in/sign-up and returns it in the response and as an httpOnly cookie.
- `lib/api.ts` always sends `credentials: "include"`, so the cookie authenticates requests.
- Every protected API route runs `verifyToken` (verify signature, load the user, reject blocked/missing users) and `requireRole(...)` for role checks. Invalid/expired tokens return `401`; wrong roles return `403`.

## Deployment (Vercel)

1. Import the client repository into Vercel (framework is auto-detected as Next.js).
2. Set `NEXT_PUBLIC_API_URL=https://pizzahub-server-eight.vercel.app/api`.
3. Set `NEXT_PUBLIC_IMGBB_API_KEY` to a live ImgBB key.
4. Set `NEXT_PUBLIC_GOOGLE_CLIENT_ID` and add the deployed client origin to the Google OAuth client's authorized JavaScript origins.
5. Add the deployed client origin to the server's `CLIENT_URL` (and `ALLOWED_ORIGINS` for previews) so CORS and cookies work.

## Demo credentials

Seeded by the server (`npm run seed`):

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@pizzahub.com` | `#Admin@2026` (live password; seed default is `Admin@123`) |
| Vendor | `vendor@pizzahub.com` | `Vendor@123` |
| Customer | `customer@pizzahub.com` | `Customer@123` |

## Manual testing instructions

1. **Live site:** https://pizzahub-client-two.vercel.app. The API is https://pizzahub-server-eight.vercel.app.
2. **Stripe test mode:** use card `4242 4242 4242 4242`, any future expiry (e.g. `12/34`), any 3-digit CVC (e.g. `123`), and any ZIP/postal code. The Premium plan is `$5.00/month`.
3. **Admin:** `admin@pizzahub.com` / `#Admin@2026`.
4. **Vendor:** `vendor@pizzahub.com` / `Vendor@123`; additional vendors `vendor2@pizzahub.com` through `vendor6@pizzahub.com` also use `Vendor@123`.
5. **Customer:** `customer@pizzahub.com` / `Customer@123`; additional customer `customer2@pizzahub.com` / `Customer@123`.
6. **Premium flow:** sign in as a vendor → **Subscription** → **Upgrade with Stripe** → pay with the test card → **Payment Success**. The webhook activates Premium, features the vendor's listings, and shows the Premium badge. Cancel the subscription in the Stripe Dashboard to test the downgrade.
7. **Menu approval flow:** vendor adds an item (uploads an image) → item is Pending → admin approves it in **Menu Moderation** → it appears on the public menu.
8. **Order flow:** customer places an order with a delivery date/address/message → vendor accepts or rejects it in **Customer Orders** → customer can cancel only while it is pending.
9. Customer orders do not use Stripe; only the vendor Premium subscription does.
10. Google sign-in is enabled for the live domain.
11. Image uploads use ImgBB; use any JPG/PNG for menu items or profile photos.
12. Use a second browser or an incognito window to test vendor and customer flows at the same time.
