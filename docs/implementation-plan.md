# Solus E-commerce — Implementation Plan

**Project:** Solus (Romanian Market E-commerce)
**Target:** Production-ready e-commerce platform with full Romanian localization
**Timeline:** 4-5 weeks
**Developer:** Claude Code (AI-assisted implementation)

---

## Table of Contents
1. [Technology Stack](#technology-stack)
2. [Architecture Overview](#architecture-overview)
3. [Database Schema](#database-schema)
4. [Implementation Phases](#implementation-phases)
5. [Romanian Localization Strategy](#romanian-localization-strategy)
6. [Payment Integration](#payment-integration)
7. [Hostinger Deployment](#hostinger-deployment)
8. [Testing Strategy](#testing-strategy)
9. [Success Criteria](#success-criteria)

---

## 1. Technology Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **UI Components:** Radix UI (existing)
- **Styling:** Tailwind CSS
- **State Management:** Zustand (cart) + React Context (user)
- **Forms:** React Hook Form + Zod validation
- **i18n:** next-intl
- **Image Optimization:** Next.js Image component

### Backend
- **API:** Next.js API Routes (App Router)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth.js v5 (Auth.js)
- **Email:** Resend
- **File Upload:** Uploadthing or local storage

### Payments & Services
- **Payment Processor:** Stripe (test mode)
- **Email Templates:** React Email
- **Analytics:** Vercel Analytics (or GA4)

### DevOps
- **Version Control:** Git / GitHub
- **CI/CD:** GitHub Actions
- **Hosting:** Hostinger (VPS or shared)
- **Environment:** Docker (optional for VPS)
- **Process Manager:** PM2 (for Node.js on Hostinger)

---

## 2. Architecture Overview

### Directory Structure (Next.js App Router)
```
solus-ecommerce/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth group (login, register)
│   │   ├── login/
│   │   └── register/
│   ├── (shop)/                   # Main shop pages
│   │   ├── page.tsx              # Home page
│   │   ├── collections/          # Product collections
│   │   ├── product/[slug]/       # Product detail
│   │   ├── cart/                 # Shopping cart
│   │   ├── checkout/             # Checkout flow
│   │   ├── stories/              # Solus Stories
│   │   └── custom-embroidery/   # Custom embroidery
│   ├── account/                  # User account area
│   │   ├── orders/
│   │   ├── profile/
│   │   └── addresses/
│   ├── admin/                    # Admin dashboard
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── customers/
│   │   └── settings/
│   ├── api/                      # API routes
│   │   ├── auth/[...nextauth]/   # NextAuth routes
│   │   ├── products/
│   │   ├── cart/
│   │   ├── orders/
│   │   ├── stripe/               # Stripe webhooks
│   │   └── admin/
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # Radix UI components (existing)
│   ├── shop/                     # Shop-specific components
│   ├── admin/                    # Admin components
│   └── layout/                   # Layout components
├── lib/                          # Utility functions
│   ├── prisma.ts                 # Prisma client
│   ├── auth.ts                   # Auth configuration
│   ├── stripe.ts                 # Stripe client
│   └── utils.ts                  # Helpers
├── locales/                      # Translations
│   ├── ro.json                   # Romanian (default)
│   └── en.json                   # English (optional)
├── prisma/                       # Database
│   ├── schema.prisma             # Database schema
│   ├── migrations/               # Migration files
│   └── seed.ts                   # Seed data
├── public/                       # Static assets
│   ├── images/
│   ├── uploads/                  # User uploads
│   └── favicon.ico
├── scripts/                      # Utility scripts
│   ├── seed.ts                   # Database seeding
│   └── migrate.ts                # Migration helpers
├── tests/                        # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/                         # Documentation
│   ├── repo-audit.md
│   ├── implementation-plan.md
│   ├── HOSTINGER.md
│   └── API.md
├── .env.example                  # Environment template
├── .env.local                    # Local environment (git-ignored)
├── ecosystem.config.js           # PM2 configuration
├── nginx.conf                    # Nginx config (for VPS)
├── Dockerfile                    # Docker configuration
├── docker-compose.yml            # Docker Compose
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

---

## 3. Database Schema

### Entity Relationship Diagram

```
User (1) ─────< (n) Order
  │                   │
  │                   │
  │                   └───< (n) OrderItem
  │                             │
  └─────< (n) CartItem          │
              │                 │
              │                 │
              └─────> (1) Product (1) <─────┘
                            │
                            ├───< (n) ProductImage
                            ├───< (n) ProductVariant
                            └───> (1) Category
```

### Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String?
  firstName     String?
  lastName      String?
  phone         String?
  role          Role      @default(CUSTOMER)
  emailVerified DateTime?
  image         String?

  // Relations
  orders        Order[]
  cartItems     CartItem[]
  addresses     Address[]

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Role {
  CUSTOMER
  ADMIN
}

model Category {
  id          String      @id @default(cuid())
  name        String
  nameRo      String      // Romanian name
  slug        String      @unique
  description String?
  descriptionRo String?   // Romanian description
  image       String?
  parentId    String?
  parent      Category?   @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[]  @relation("CategoryHierarchy")
  products    Product[]
  sortOrder   Int         @default(0)

  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model Product {
  id              String            @id @default(cuid())
  name            String
  nameRo          String            // Romanian name
  slug            String            @unique
  description     String?
  descriptionRo   String?           // Romanian description
  basePrice       Decimal           @db.Decimal(10, 2)
  categoryId      String
  category        Category          @relation(fields: [categoryId], references: [id])

  // Flags
  featured        Boolean           @default(false)
  limitedDrop     Boolean           @default(false)
  customEmbroidery Boolean          @default(false)
  inStock         Boolean           @default(true)

  // SEO
  metaTitle       String?
  metaTitleRo     String?
  metaDescription String?
  metaDescriptionRo String?

  // Relations
  images          ProductImage[]
  variants        ProductVariant[]
  cartItems       CartItem[]
  orderItems      OrderItem[]

  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt

  @@index([slug])
  @@index([categoryId])
}

model ProductImage {
  id         String   @id @default(cuid())
  productId  String
  product    Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  url        String
  altText    String?
  altTextRo  String?  // Romanian alt text
  sortOrder  Int      @default(0)

  createdAt  DateTime @default(now())
}

model ProductVariant {
  id         String   @id @default(cuid())
  productId  String
  product    Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  name       String   // e.g., "Small", "Large", "Black"
  nameRo     String   // Romanian name
  sku        String   @unique
  price      Decimal? @db.Decimal(10, 2) // Override base price if set
  stock      Int      @default(0)

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([productId])
  @@index([sku])
}

model CartItem {
  id         String   @id @default(cuid())
  userId     String?
  sessionId  String?  // For guest users
  productId  String
  product    Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  variantId  String?
  quantity   Int      @default(1)

  // Custom options (JSONB for flexibility)
  customization Json?  // { embroideryText, color, etc. }

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  user       User?    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([sessionId])
}

model Address {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  firstName  String
  lastName   String
  address    String
  city       String
  county     String   // Județ in Romanian
  postalCode String
  phone      String

  isDefault  Boolean  @default(false)

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([userId])
}

model Order {
  id              String        @id @default(cuid())
  orderNumber     String        @unique
  userId          String?
  user            User?         @relation(fields: [userId], references: [id])

  // Customer info (snapshot at order time)
  email           String
  firstName       String
  lastName        String
  phone           String

  // Shipping address
  shippingAddress String
  city            String
  county          String
  postalCode      String

  // Payment
  paymentMethod   PaymentMethod
  paymentStatus   PaymentStatus @default(PENDING)
  stripePaymentId String?

  // Order status
  status          OrderStatus   @default(PENDING)

  // Pricing
  subtotal        Decimal       @db.Decimal(10, 2)
  shippingCost    Decimal       @db.Decimal(10, 2)
  tax             Decimal       @db.Decimal(10, 2) @default(0)
  discount        Decimal       @db.Decimal(10, 2) @default(0)
  total           Decimal       @db.Decimal(10, 2)

  // Gift options
  giftWrapping    String?       // 'standard', 'premium', or null
  customLetter    Boolean       @default(false)
  letterDetails   Json?
  expressShipping Boolean       @default(false)

  // Relations
  items           OrderItem[]

  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  @@index([userId])
  @@index([orderNumber])
  @@index([email])
}

enum PaymentMethod {
  CARD
  COD  // Cash on delivery
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

model OrderItem {
  id            String   @id @default(cuid())
  orderId       String
  order         Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId     String
  product       Product  @relation(fields: [productId], references: [id])

  // Snapshot at order time
  productName   String
  productNameRo String
  variantName   String?
  variantNameRo String?
  price         Decimal  @db.Decimal(10, 2)
  quantity      Int

  customization Json?    // Custom options snapshot

  createdAt     DateTime @default(now())

  @@index([orderId])
}

model Story {
  id          String   @id @default(cuid())
  title       String
  titleRo     String   // Romanian title
  slug        String   @unique
  excerpt     String?
  excerptRo   String?  // Romanian excerpt
  content     String   // Markdown or HTML
  contentRo   String   // Romanian content
  coverImage  String
  author      String
  published   Boolean  @default(false)
  publishedAt DateTime?

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([slug])
  @@index([published])
}

model DiscountCode {
  id            String    @id @default(cuid())
  code          String    @unique
  description   String?
  descriptionRo String?   // Romanian description
  type          DiscountType
  amount        Decimal   @db.Decimal(10, 2)
  minPurchase   Decimal?  @db.Decimal(10, 2)
  maxUses       Int?
  usedCount     Int       @default(0)
  active        Boolean   @default(true)
  expiresAt     DateTime?

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@index([code])
}

enum DiscountType {
  PERCENTAGE
  FIXED
}
```

---

## 4. Implementation Phases

### Phase 1: Foundation & Migration (Days 1-3)

#### Tasks
1. **Create new Next.js project**
   ```bash
   npx create-next-app@latest solus-ecommerce --typescript --tailwind --app
   ```

2. **Migrate existing UI components**
   - Copy components from `Solus/src/components/` to `components/shop/`
   - Update imports and paths
   - Convert client-side routing to Next.js routing

3. **Set up Prisma**
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```
   - Create schema (as defined above)
   - Run initial migration

4. **Configure environment**
   - Create `.env.example` and `.env.local`
   - Set up database connection
   - Configure NextAuth secrets

5. **Set up i18n (next-intl)**
   ```bash
   npm install next-intl
   ```
   - Configure middleware
   - Create `locales/ro.json`
   - Extract strings from components

#### Deliverables
- ✅ Next.js project structure
- ✅ Database schema created
- ✅ Existing UI components migrated
- ✅ i18n system configured
- ✅ Local development environment working

---

### Phase 2: Core E-commerce (Days 4-7)

#### Tasks
1. **Product Catalog API**
   - `GET /api/products` - List products with filters
   - `GET /api/products/[slug]` - Single product
   - `GET /api/categories` - Categories list
   - Implement server components for product pages

2. **Shopping Cart**
   - Set up Zustand store for cart state
   - `POST /api/cart/add` - Add to cart
   - `PUT /api/cart/update` - Update quantity
   - `DELETE /api/cart/remove` - Remove item
   - `GET /api/cart` - Get cart contents
   - Persist cart in database (for logged-in users) and localStorage (guests)

3. **User Authentication (NextAuth.js)**
   - Email/password authentication
   - JWT sessions
   - Signup/login pages (Romanian UI)
   - Password reset flow
   - Protected routes middleware

4. **Product Pages**
   - `/collections` - Product listing with filters
   - `/product/[slug]` - Product detail page
   - `/custom-embroidery` - Custom embroidery catalog
   - Implement search and filters UI

5. **Romanian Translation (Phase 2 components)**
   - Translate all catalog-related strings
   - Product names and descriptions in database
   - Category names

#### Deliverables
- ✅ Working product catalog
- ✅ Functional shopping cart
- ✅ User authentication system
- ✅ Product pages with Romanian text
- ✅ Search and filter functionality

---

### Phase 3: Checkout & Payments (Days 8-11)

#### Tasks
1. **Stripe Integration**
   ```bash
   npm install stripe @stripe/stripe-js
   ```
   - Set up Stripe client
   - Create Payment Intent API route
   - Implement Stripe Checkout or Elements
   - Test mode configuration

2. **Checkout Flow**
   - `/checkout` - Multi-step checkout page
   - Shipping information form (Romanian labels)
   - Payment method selection (Card/COD)
   - Gift options (wrapping, letter, express shipping)
   - Order review and confirmation

3. **Order Processing**
   - `POST /api/orders/create` - Create order
   - `POST /api/stripe/webhook` - Handle Stripe webhooks
   - Order confirmation logic
   - Inventory deduction

4. **Email Notifications (Resend)**
   ```bash
   npm install resend react-email
   ```
   - Order confirmation email (Romanian)
   - Shipping notification email
   - Password reset email
   - Admin order notification

5. **Order Success Page**
   - `/order/success/[orderNumber]` - Thank you page
   - Order summary display
   - Download receipt option

#### Deliverables
- ✅ Stripe test mode payment working
- ✅ Complete checkout flow
- ✅ Order creation and processing
- ✅ Email notifications in Romanian
- ✅ COD option available

---

### Phase 4: User Account & Admin (Days 12-16)

#### Tasks
1. **User Account Pages**
   - `/account/profile` - Edit profile
   - `/account/orders` - Order history
   - `/account/orders/[id]` - Order detail
   - `/account/addresses` - Manage addresses

2. **Admin Dashboard Foundation**
   - `/admin/dashboard` - Overview (sales, orders, products)
   - Admin role check middleware
   - Basic analytics (total sales, orders, customers)

3. **Admin: Product Management**
   - `/admin/products` - Product list
   - `/admin/products/new` - Create product
   - `/admin/products/[id]/edit` - Edit product
   - Image upload functionality
   - Category management
   - Variant management

4. **Admin: Order Management**
   - `/admin/orders` - Order list with filters
   - `/admin/orders/[id]` - Order detail
   - Update order status
   - Mark as shipped/delivered
   - Export orders (CSV)

5. **Admin: Discount Codes**
   - `/admin/discounts` - Discount code management
   - Create/edit/delete discount codes
   - View usage statistics

6. **Admin: Stories Management**
   - `/admin/stories` - Manage Solus Stories
   - Create/edit stories
   - Rich text editor
   - Publish/unpublish

#### Deliverables
- ✅ User account pages functional
- ✅ Admin dashboard operational
- ✅ Product CRUD working
- ✅ Order management interface
- ✅ Discount code system

---

### Phase 5: SEO & Performance (Days 17-19)

#### Tasks
1. **SEO Optimization**
   - Add meta tags to all pages (Romanian)
   - Implement Open Graph tags
   - Create dynamic sitemap.xml
   - Add robots.txt
   - Implement structured data (JSON-LD)

2. **Image Optimization**
   - Migrate to Next.js Image component
   - Set up image CDN or optimization
   - Lazy loading for images
   - WebP format support

3. **Performance Optimization**
   - Code splitting
   - Lazy load non-critical components
   - Optimize bundle size
   - Implement caching strategies
   - Static generation for product pages (ISR)

4. **Accessibility Audit**
   - ARIA labels for all interactive elements
   - Keyboard navigation testing
   - Screen reader testing
   - Color contrast fixes
   - Focus management

5. **Analytics Integration**
   - Google Analytics 4 or Vercel Analytics
   - Track key e-commerce events
   - Conversion tracking
   - Privacy-compliant implementation

#### Deliverables
- ✅ SEO optimized pages
- ✅ Lighthouse score ≥90
- ✅ Accessibility score ≥90
- ✅ Analytics tracking implemented
- ✅ Fast page load times

---

### Phase 6: Testing & Deployment (Days 20-25)

#### Tasks
1. **Unit Tests**
   ```bash
   npm install -D vitest @testing-library/react
   ```
   - Test utility functions
   - Test cart logic
   - Test order calculations
   - Test discount code logic

2. **Integration Tests**
   - Test API routes
   - Test database operations
   - Test authentication flows

3. **E2E Tests (Playwright)**
   ```bash
   npm install -D @playwright/test
   ```
   - Test complete checkout flow
   - Test user registration/login
   - Test product browsing
   - Test admin operations

4. **Seed Data Script**
   - Create comprehensive seed data
   - Sample products (Romanian names)
   - Categories
   - Admin user
   - Test customer user
   - Sample orders

5. **Hostinger Deployment Setup**
   - Create `HOSTINGER.md` guide
   - Set up PM2 configuration (`ecosystem.config.js`)
   - Create Nginx configuration
   - Create Docker files (if using VPS)
   - GitHub Actions CI/CD workflow
   - Database migration strategy

6. **Documentation**
   - Update README.md
   - Create `.env.example`
   - API documentation
   - Setup guide
   - Deployment guide
   - Troubleshooting guide

#### Deliverables
- ✅ Test coverage ≥70%
- ✅ All tests passing
- ✅ Seed data script working
- ✅ Hostinger deployment ready
- ✅ Comprehensive documentation

---

## 5. Romanian Localization Strategy

### Implementation Approach

#### 1. Install next-intl
```bash
npm install next-intl
```

#### 2. Configure Middleware
```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ro', 'en'],
  defaultLocale: 'ro'
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
```

#### 3. Create Translation Files

**locales/ro.json** (Romanian - Default)
```json
{
  "common": {
    "addToCart": "Adaugă în coș",
    "outOfStock": "Stoc epuizat",
    "price": "Preț",
    "quantity": "Cantitate",
    "total": "Total",
    "currency": "RON"
  },
  "nav": {
    "collections": "Colecții",
    "customEmbroidery": "Broderie personalizată",
    "giftSets": "Seturi cadou",
    "stories": "Povestiri Solus"
  },
  "checkout": {
    "title": "Finalizare comandă",
    "shippingInfo": "Informații de livrare",
    "paymentMethod": "Metodă de plată",
    "orderSummary": "Sumar comandă",
    "placeOrder": "Plasează comanda",
    "email": "Email",
    "firstName": "Prenume",
    "lastName": "Nume",
    "address": "Adresă",
    "city": "Oraș",
    "county": "Județ",
    "postalCode": "Cod poștal",
    "phone": "Telefon"
  },
  "payment": {
    "card": "Card bancar",
    "cod": "Ramburs (plată la livrare)"
  },
  "order": {
    "confirmation": "Comanda ta a fost plasată cu succes!",
    "orderNumber": "Număr comandă",
    "thankYou": "Mulțumim pentru comandă!"
  }
}
```

#### 4. Usage in Components
```tsx
'use client';

import { useTranslations } from 'next-intl';

export function AddToCartButton() {
  const t = useTranslations('common');

  return (
    <button>{t('addToCart')}</button>
  );
}
```

#### 5. Server Components
```tsx
import { useTranslations } from 'next-intl';

export default function CheckoutPage() {
  const t = useTranslations('checkout');

  return (
    <h1>{t('title')}</h1>
  );
}
```

### Currency & Date Formatting

```typescript
// lib/formatting.ts

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency',
    currency: 'RON',
    minimumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ro-RO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

// Usage: formatCurrency(1250) => "1.250,00 RON"
// Usage: formatDate(new Date()) => "12.11.2025"
```

### Translation Coverage Checklist
- [ ] Navigation menu
- [ ] Product catalog
- [ ] Product detail pages
- [ ] Shopping cart
- [ ] Checkout flow (all steps)
- [ ] User account pages
- [ ] Order history
- [ ] Email templates
- [ ] Error messages
- [ ] Validation messages
- [ ] Success/confirmation messages
- [ ] Footer links
- [ ] Admin interface (optional - can remain English)

---

## 6. Payment Integration

### Stripe Setup (Test Mode)

#### 1. Install Stripe
```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

#### 2. Environment Variables
```bash
# .env.local
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### 3. Create Payment Intent
```typescript
// app/api/checkout/create-payment-intent/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@/lib/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  const session = await auth();
  const { amount, orderId } = await req.json();

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert RON to bani (cents)
      currency: 'ron',
      metadata: { orderId },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
```

#### 4. Checkout Component
```tsx
'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
```

#### 5. Webhook Handler
```typescript
// app/api/stripe/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const orderId = paymentIntent.metadata.orderId;

      // Update order status
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: 'PAID',
          stripePaymentId: paymentIntent.id
        },
      });

      // Send confirmation email
      // await sendOrderConfirmationEmail(orderId);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
```

### Cash on Delivery (COD)

For COD orders, skip Stripe and directly create the order with `paymentMethod: 'COD'` and `paymentStatus: 'PENDING'`. Admin will mark as paid when cash is received.

---

## 7. Hostinger Deployment

### Deployment Options

#### Option A: Hostinger VPS/Cloud (Recommended)

**Requirements:**
- Node.js 20+
- PM2 process manager
- Nginx reverse proxy
- PostgreSQL database

**Setup Steps:**

1. **SSH into VPS**
   ```bash
   ssh username@your-vps-ip
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Install PM2**
   ```bash
   sudo npm install -g pm2
   ```

4. **Clone repository**
   ```bash
   git clone <repo-url>
   cd solus-ecommerce
   ```

5. **Install dependencies & build**
   ```bash
   npm ci
   npm run build
   ```

6. **Set environment variables**
   ```bash
   cp .env.example .env
   nano .env  # Edit with production values
   ```

7. **Run migrations**
   ```bash
   npx prisma migrate deploy
   ```

8. **Start with PM2**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

9. **Configure Nginx**
   ```nginx
   # /etc/nginx/sites-available/solus
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/solus /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

10. **SSL with Let's Encrypt**
    ```bash
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d yourdomain.com
    ```

#### Option B: Hostinger Shared Hosting (Limited)

Hostinger shared hosting may have Node.js limitations. Static export is recommended:

```bash
# next.config.js
module.exports = {
  output: 'export',  // Static export
};
```

**Limitations:**
- No API routes (need external backend)
- No server-side rendering
- No ISR

**Not recommended for full e-commerce functionality.**

---

### PM2 Configuration

**ecosystem.config.js**
```javascript
module.exports = {
  apps: [
    {
      name: 'solus-ecommerce',
      script: 'npm',
      args: 'start',
      cwd: '/path/to/solus-ecommerce',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
    },
  ],
};
```

---

### GitHub Actions CI/CD

**.github/workflows/deploy.yml**
```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Run migrations
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}

      - name: Deploy to VPS via SFTP
        uses: SamKirkland/FTP-Deploy-Action@4.3.0
        with:
          server: ${{ secrets.HOSTINGER_HOST }}
          username: ${{ secrets.HOSTINGER_USER }}
          password: ${{ secrets.HOSTINGER_PASSWORD }}
          local-dir: .next/
          server-dir: /home/username/solus-ecommerce/.next/

      - name: Restart PM2
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOSTINGER_HOST }}
          username: ${{ secrets.HOSTINGER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /home/username/solus-ecommerce
            pm2 restart solus-ecommerce
```

---

## 8. Testing Strategy

### Unit Tests (Vitest)

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

**Example:**
```typescript
// tests/unit/cart.test.ts
import { describe, it, expect } from 'vitest';
import { calculateCartTotal } from '@/lib/cart';

describe('Cart calculations', () => {
  it('should calculate total correctly', () => {
    const items = [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 1 },
    ];
    const total = calculateCartTotal(items);
    expect(total).toBe(250);
  });
});
```

### Integration Tests

Test API routes with real database:

```typescript
// tests/integration/products.test.ts
import { describe, it, expect } from 'vitest';
import { GET } from '@/app/api/products/route';

describe('Products API', () => {
  it('should return products list', async () => {
    const response = await GET(new Request('http://localhost/api/products'));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('products');
  });
});
```

### E2E Tests (Playwright)

```bash
npm install -D @playwright/test
```

**Example:**
```typescript
// tests/e2e/checkout.spec.ts
import { test, expect } from '@playwright/test';

test('complete checkout flow', async ({ page }) => {
  // Navigate to product
  await page.goto('/product/heritage-signet-ring');

  // Add to cart
  await page.click('text=Adaugă în coș');

  // Go to checkout
  await page.click('text=Finalizare comandă');

  // Fill shipping form
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="firstName"]', 'Ion');
  await page.fill('[name="lastName"]', 'Popescu');
  // ... fill other fields

  // Select COD
  await page.click('text=Ramburs');

  // Place order
  await page.click('text=Plasează comanda');

  // Verify success
  await expect(page.locator('text=Comanda ta a fost plasată cu succes!')).toBeVisible();
});
```

---

## 9. Success Criteria

### Functional Requirements
- ✅ All pages render correctly with Romanian text
- ✅ User can browse products and categories
- ✅ User can add products to cart
- ✅ User can complete checkout (both Card and COD)
- ✅ Payment processing works in Stripe test mode
- ✅ Order confirmation email sent
- ✅ User can view order history
- ✅ Admin can manage products, orders, and customers
- ✅ Search and filters work correctly

### Performance Requirements
- ✅ Lighthouse Performance score ≥ 90
- ✅ First Contentful Paint (FCP) < 1.5s
- ✅ Largest Contentful Paint (LCP) < 2.5s
- ✅ Cumulative Layout Shift (CLS) < 0.1
- ✅ Time to Interactive (TTI) < 3.5s

### Accessibility Requirements
- ✅ Lighthouse Accessibility score ≥ 90
- ✅ WCAG 2.1 Level AA compliance
- ✅ Keyboard navigation works on all pages
- ✅ Screen reader compatibility

### SEO Requirements
- ✅ Lighthouse SEO score ≥ 90
- ✅ All pages have unique titles and meta descriptions
- ✅ Open Graph tags implemented
- ✅ Sitemap.xml generated
- ✅ Robots.txt configured

### Security Requirements
- ✅ Authentication implemented securely
- ✅ Passwords hashed with bcrypt
- ✅ CSRF protection enabled
- ✅ SQL injection protected (via Prisma)
- ✅ XSS protection (React auto-escaping)
- ✅ HTTPS enforced in production

### Testing Requirements
- ✅ Unit test coverage ≥ 70%
- ✅ Integration tests for all API routes
- ✅ E2E tests for critical user flows
- ✅ All tests passing

### Documentation Requirements
- ✅ README with setup instructions
- ✅ .env.example with all required variables
- ✅ API documentation
- ✅ Deployment guide (HOSTINGER.md)
- ✅ Architecture documentation

---

## 10. Risk Mitigation

### Technical Risks

1. **Stripe Webhooks Require Public URL**
   - **Solution:** Use Stripe CLI for local testing (`stripe listen --forward-to localhost:3000/api/stripe/webhook`)
   - **Solution:** Use ngrok for development testing with real webhooks

2. **Hostinger Node.js Support Uncertainty**
   - **Solution:** Verify Node.js version and capabilities before deployment
   - **Fallback:** Use Vercel for hosting (free tier available)

3. **Migration from Vite to Next.js Complexity**
   - **Solution:** Components are already well-structured, minimal changes needed
   - **Testing:** Thorough testing after migration

### Business Risks

1. **No Domain Yet**
   - **Solution:** Everything works on `localhost` for testing
   - **Solution:** Can deploy to temporary domain or IP address

2. **Romanian Translation Accuracy**
   - **Solution:** Use professional translation service or native speaker review
   - **Fallback:** Use Google Translate initially, refine later

---

## 11. Next Steps

1. **Approve this implementation plan**
2. **Begin Phase 1: Foundation & Migration**
3. **Set up development environment**
4. **Create initial database schema**
5. **Start migrating components to Next.js**

---

**Estimated Timeline:** 4-5 weeks (25 working days)
**Status:** Ready to begin implementation
**Last Updated:** 2025-11-12
