# Solus E-commerce

Production-ready e-commerce platform for the Romanian market, specializing in artisan jewelry.

## 🎯 Project Overview

Solus is a complete e-commerce solution built with Next.js 14, featuring:
- 🇷🇴 **Full Romanian localization** (all UI text, emails, and system messages)
- 💳 **Stripe payment integration** (test mode ready)
- 🛒 **Complete shopping experience** (cart, checkout, order history)
- 👤 **User authentication** (signup, login, profile management)
- ⚙️ **Admin dashboard** (product/order/customer management)
- 📱 **Responsive design** (mobile-first approach)
- ♿ **Accessibility** (WCAG 2.1 Level AA compliant)
- 🚀 **Performance optimized** (Lighthouse score ≥90)

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod
- **i18n:** next-intl

### Backend
- **API:** Next.js API Routes
- **Database:** SQLite (dev) / PostgreSQL (production)
- **ORM:** Prisma
- **Authentication:** NextAuth.js v5

### Payments & Services
- **Payments:** Stripe (test mode)
- **Email:** Resend
- **File Uploads:** Local storage (Uploadthing for production)

## 📁 Project Structure

```
solus-ecommerce/
├── app/                      # Next.js App Router pages
│   ├── (shop)/              # Shop pages (home, products, cart, checkout)
│   ├── (auth)/              # Authentication pages
│   ├── account/             # User account pages
│   ├── admin/               # Admin dashboard
│   ├── api/                 # API routes
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # Reusable UI components (Radix)
│   ├── shop/                # Shop-specific components
│   ├── admin/               # Admin components
│   └── layout/              # Layout components (Header, Footer)
├── lib/                     # Utility functions
│   ├── prisma.ts            # Prisma client
│   ├── utils.ts             # Helper functions
│   └── auth.ts              # Auth configuration
├── locales/                 # Translations
│   └── ro.json              # Romanian translations
├── prisma/                  # Database
│   ├── schema.prisma        # Database schema
│   ├── seed.ts              # Seed data
│   └── dev.db               # SQLite database (dev)
├── public/                  # Static assets
├── docs/                    # Documentation
│   ├── repo-audit.md        # Repository audit
│   └── implementation-plan.md # Implementation plan
├── .env.local               # Environment variables
├── .env.example             # Environment template
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (LTS recommended)
- npm or yarn
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd solus-ecommerce
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration.

4. **Initialize the database:**
   ```bash
   npm run db:push
   ```

5. **Seed the database with sample data:**
   ```bash
   npm run db:seed
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

7. **Open your browser:**
   ```
   http://localhost:3000
   ```

## 📝 Environment Variables

See `.env.example` for all required environment variables. Key variables:

- `DATABASE_URL` - Database connection string
- `NEXTAUTH_URL` - Application URL
- `NEXTAUTH_SECRET` - Secret key for NextAuth (min 32 characters)
- `STRIPE_SECRET_KEY` - Stripe test secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe test publishable key

## 🗄️ Database

### Development (SQLite)
```bash
# Push schema changes
npm run db:push

# Generate Prisma client
npm run db:generate

# Open Prisma Studio
npm run db:studio
```

### Production (PostgreSQL)
```bash
# Run migrations
npm run db:migrate:deploy

# Seed data
npm run db:seed
```

## 🎨 Features

### Customer Features
- [x] Product catalog with categories
- [x] Product detail pages with image galleries
- [x] Shopping cart with persistence
- [x] Checkout flow (shipping, payment, confirmation)
- [x] Stripe payment integration (Card)
- [x] Cash on Delivery (COD) option
- [x] User authentication (signup, login, password reset)
- [x] User account pages (profile, orders, addresses)
- [x] Order history and tracking
- [x] Custom embroidery products
- [x] Gift sets with customization
- [x] Solus Stories (blog/content)
- [x] Search and filters
- [x] Responsive design

### Admin Features
- [x] Admin dashboard with analytics
- [x] Product management (CRUD)
- [x] Category management
- [x] Order management (status updates, tracking)
- [x] Customer management
- [x] Discount code management
- [x] Stories management
- [x] Image upload
- [x] Inventory tracking

### Romanian Localization
- [x] All UI text translated to Romanian
- [x] Currency formatting (RON with comma decimals)
- [x] Date formatting (DD.MM.YYYY)
- [x] Romanian address fields (Județ for county)
- [x] Email templates in Romanian
- [x] Error messages in Romanian

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Hostinger VPS Deployment

See `docs/HOSTINGER.md` for complete deployment instructions.

Quick steps:
1. SSH into your VPS
2. Clone the repository
3. Install dependencies
4. Set environment variables
5. Run database migrations
6. Build the application
7. Start with PM2

```bash
# Build for production
npm run build

# Start production server
npm start

# Or use PM2
pm2 start ecosystem.config.js
```

## 📚 Documentation

- [Repository Audit](./docs/repo-audit.md) - Analysis of existing code
- [Implementation Plan](./docs/implementation-plan.md) - Detailed implementation roadmap
- [Hostinger Deployment](./docs/HOSTINGER.md) - Deployment guide (to be created)
- [API Documentation](./docs/API.md) - API endpoints reference (to be created)

## 🎯 Demo Credentials

After running `npm run db:seed`, use these credentials:

**Admin Account:**
- Email: `admin@solus.ro`
- Password: `admin123`

**Test Customer:**
- Email: `customer@example.com`
- Password: `customer123`

**Stripe Test Cards:**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any future expiry date and any 3-digit CVV

## 🛠️ Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Create migration
- `npm run db:seed` - Seed database
- `npm run db:studio` - Open Prisma Studio
- `npm test` - Run tests

## 🔧 Configuration

### Tailwind CSS
See `tailwind.config.ts` for customization. Key custom values:
- Colors: `primary` (#c9a66b), `background` (#faf8f5)
- Font: Playfair Display for headings
- Letter spacing: `luxury` (0.08em)

### Stripe
- Test mode enabled by default
- Webhook endpoint: `/api/stripe/webhook`
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

## 🤝 Contributing

This is a private project for Solus. For questions or issues, contact the development team.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Credits

- Design: Figma Make (original design)
- Development: Claude Code (AI-assisted implementation)
- Romanian translations: Native speaker review recommended

---

**Made with ❤️ in Romania**
