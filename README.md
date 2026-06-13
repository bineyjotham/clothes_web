# MAISON ORÉ, Fashion E-Commerce Website

A modern, minimalist fashion e-commerce website built with TanStack Start, featuring the Autumn/Winter 2026 collection. This project showcases considered tailoring, raw textures, and warm tones through an elegant, responsive design.

## 🚀 Tech Stack

- **Framework**: TanStack Start (React 19)
- **Routing**: TanStack Router (file-based routing)
- **Data Fetching**: TanStack React Query
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Backend**: Supabase (auth, database, storage)
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React

## ✨ Features

- **Homepage**: Hero banner, product collection grid, lookbook gallery, brand story, newsletter signup
- **Authentication**: Admin sign in/sign up with Supabase Auth
- **Responsive Design**: Mobile-first approach with elegant typography and spacing
- **Dynamic Content**: Site content fetched from Supabase with fallback data
- **Admin Dashboard**: Protected route for content management
- **Modern UI**: Custom color palette (cream, ink, clay, rust) with smooth animations

## 📁 Project Structure

```
clothes_web/
├── src/
│   ├── components/       # UI components (shadcn/ui + custom)
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # Supabase client integration
│   ├── lib/            # Utilities, site content fetchers
│   ├── routes/         # File-based routing
│   │   ├── __root.tsx      # Root layout
│   │   ├── index.tsx       # Homepage
│   │   ├── auth.tsx        # Authentication page
│   │   └── _authenticated/ # Protected admin routes
│   ├── router.tsx      # Router configuration
│   ├── server.ts       # Server entry point
│   ├── start.ts        # TanStack Start entry
│   └── styles.css      # Global styles + Tailwind
├── supabase/
│   ├── config.toml     # Supabase configuration
│   └── migrations/     # Database migrations
├── .env                # Environment variables (gitignored)
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for backend)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd clothes_web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run database migrations:
```bash
# Using Supabase CLI
supabase db push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` — Start development server with hot reload
- `npm run build` — Build for production
- `npm run build:dev` — Build for development mode
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint
- `npm run format` — Format code with Prettier

## 🎨 Design System

### Color Palette
- **Cream**: Primary light background
- **Ink**: Primary dark background
- **Clay**: Accent warm tone
- **Rust**: Highlight color

### Typography
- **Display Font**: Fraunces (serif, for headlines)
- **Body Font**: Inter (sans-serif, for UI text)

### Components
The project uses shadcn/ui components with the "New York" style variant, customized with the brand's color palette and typography.

## 🔐 Authentication

The application uses Supabase Auth for admin access:
- First account created becomes the site admin
- Sign in/up flow at `/auth`
- Protected admin routes under `/admin`
- Session persistence via Supabase auth

## 📦 Database Schema

The Supabase database includes:
- `profiles` — User profile information
- `site_content` — Dynamic site content (banners, products, lookbook)
- Additional tables as defined in `supabase/migrations/`

## 🌐 Routing

TanStack Start uses file-based routing:
- `index.tsx` → `/`
- `auth.tsx` → `/auth`
- `admin/index.tsx` → `/admin`
- Dynamic routes use `$param` syntax (e.g., `products/$id.tsx`)
- Layout routes use `_layout.tsx`
- Root layout is `__root.tsx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private. All rights reserved.

## 📍 Contact

For questions or support, please contact the development team.
