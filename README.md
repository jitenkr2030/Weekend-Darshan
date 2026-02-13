# 🚌 WeekendDarshan

### *Complete Weekend Travel & Temple Darshan Booking Platform*

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

A comprehensive weekend travel and temple darshan booking platform with **complete customer experience features** including loyalty rewards, referral system, premium packages, and more. Making spiritual journeys accessible, comfortable, and rewarding for everyone.

---

## 🎯 Core Purpose

To allow users to **easily discover, book, and travel** on **weekend religious trips** with **premium packages, loyalty rewards, referral benefits, and a complete customer experience system** while maintaining the spiritual essence of the journey.

---

## ✨ Features Implemented

### 👥 User-Side Features
- ✅ **User Authentication**: Mobile/OTP-based login system
- ✅ **Trip Discovery**: Browse upcoming weekend trips with detailed information
- ✅ **Premium Packages**: 3-tier package system (Standard, Premium, VIP)
- ✅ **Loyalty Rewards**: Bronze, Silver, Gold levels with progressive benefits
- ✅ **Referral System**: Earn rewards by referring friends and family
- ✅ **T-Shirt Orders**: Branded "WeekendDarshan Yatri" T-shirts for confirmed bookings
- ✅ **Travel Insurance**: Yatra Suraksha Kavach coverage with trusted partners
- ✅ **Trip Details**: Comprehensive trip information with inclusions, exclusions, and policies
- ✅ **Seat Booking**: Multi-passenger booking with detailed passenger information
- ✅ **Payment System**: Secure payment integration with UPI/Card support
- ✅ **Digital Tickets**: QR code-based booking confirmation and tickets
- ✅ **My Bookings**: View and manage all bookings with search functionality
- ✅ **WhatsApp Support**: 24/7 customer support via WhatsApp
- ✅ **Notifications**: Real-time updates and alerts
- ✅ **Responsive Design**: Mobile-first design that works on all devices

### 🧑‍💼 Admin Panel Features
- ✅ **Admin Authentication**: Secure admin login system
- ✅ **Dashboard**: Overview of trips, bookings, and revenue
- ✅ **Trip Management**: Full CRUD operations for trips
- ✅ **Booking Management**: View, manage, and cancel bookings
- ✅ **Customer Management**: View customer details and booking history
- ✅ **Loyalty Management**: Track and manage customer loyalty levels
- ✅ **Referral Management**: Monitor and process referral rewards
- ✅ **Package Management**: Create and manage premium packages
- ✅ **Reports & Analytics**: Comprehensive reports with CSV export
- ✅ **Real-time Statistics**: Track revenue, occupancy, and performance
- ✅ **Payment Management**: Confirm payments and process refunds

### 🎁 Customer Experience Features
- ✅ **Package Selection**: Choose from Standard, Premium, or VIP packages
- ✅ **All-Inclusive Pricing**: Transparent pricing with clear value proposition
- ✅ **Loyalty Points**: Earn points on every trip and redeem rewards
- ✅ **Referral Codes**: Personal referral codes for sharing with friends
- ✅ **Group Benefits**: Special pricing and benefits for groups
- ✅ **Emergency Support**: 24/7 support during journeys
- ✅ **Community Building**: Join a community of fellow devotees

---

## 🛠️ Technology Stack

### Core Framework
- **⚡ Next.js 16** - React framework with App Router
- **📘 TypeScript 5** - Type-safe development
- **🎨 Tailwind CSS 4** - Utility-first styling
- **🧩 shadcn/ui** - High-quality UI components

### Database & Backend
- **🗄️ Prisma** - Modern TypeScript ORM
- **💾 PostgreSQL** - Production database
- **🔐 JWT Authentication** - Secure token-based authentication

### UI/UX
- **🎯 Lucide React** - Beautiful icons
- **🌈 Framer Motion** - Smooth animations
- **📱 Responsive Design** - Mobile-first approach

### Integrations
- **💳 Razorpay** - Payment gateway integration
- **📱 WhatsApp** - Customer support integration
- **🛡️ Insurance Partners** - HDFC ERGO, ICICI Lombard

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn/bun
- Git
- PostgreSQL (for production)

### Installation

```bash
# Clone the repository
git clone https://github.com/jitenkr2030/Weekend-Darshan.git
cd Weekend-Darshan

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up database
bun run db:push

# Seed sample data (optional but recommended)
bun run db:seed-simple

# Start development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/weekenddarshan"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-at-least-32-characters"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Payment Gateway (for production)
RAZORPAY_KEY_ID="your-razorpay-key"
RAZORPAY_KEY_SECRET="your-razorpay-secret"
```

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── admin/                   # Admin panel
│   │   ├── login/              # Admin login
│   │   └── dashboard/          # Admin dashboard
│   ├── api/                    # API routes
│   │   ├── trips/              # Trip management APIs
│   │   ├── bookings/           # Booking APIs
│   │   ├── payments/           # Payment APIs
│   │   ├── auth/               # Authentication APIs
│   │   ├── migrate-db/         # Database migration
│   │   └── seed/               # Database seeding
│   ├── book/[tripId]/          # Booking flow
│   ├── my-bookings/            # User bookings
│   ├── payment/[bookingId]/    # Payment processing
│   ├── ticket/[bookingId]/     # Digital tickets
│   ├── trip/[id]/              # Trip details
│   └── page.tsx                # Homepage
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── customer-package.tsx    # Package selection
│   ├── loyalty-rewards.tsx     # Loyalty system
│   ├── referral-system.tsx     # Referral system
│   └── whatsapp-button.tsx     # WhatsApp support
├── types/
│   └── index.ts                # TypeScript type definitions
└── lib/
    ├── db.ts                   # Prisma client
    └── utils.ts                # Utility functions
```

---

## 🗄️ Database Schema

The application uses a comprehensive database schema with the following models:

### Core Models
- **Users** - User accounts, authentication, loyalty, and referral data
- **Temples** - Temple destinations and information
- **Routes** - Bus routes between cities
- **Trips** - Scheduled trips with dates, pricing, and package info
- **Bookings** - User bookings with package and referral details
- **Payments** - Payment records and transactions
- **Notifications** - User notifications and alerts
- **Settings** - Admin configuration settings

### Customer Experience Models
- **LoyaltyRewards** - Loyalty program rewards and redemptions
- **ReferralRewards** - Referral program rewards and tracking
- **CustomerPackages** - Premium package definitions
- **TShirtOrders** - Branded T-shirt orders
- **InsuranceCoverage** - Travel insurance coverage details

### Database Diagram

```mermaid
erDiagram
    User ||--o{ Booking : makes
    User ||--o{ Notification : receives
    User ||--o{ LoyaltyReward : earns
    User ||--o{ ReferralReward : gets
    User ||--o{ TShirtOrder : receives
    Trip ||--o{ Booking : contains
    Trip }o--|| Route : uses
    Trip }o--|| Temple : visits
    Trip ||--o{ LoyaltyReward : triggers
    Booking ||--o{ Payment : has
    Booking ||--o{ ReferralReward : generates
    Booking ||--o{ TShirtOrder : includes
    Booking ||--o{ InsuranceCoverage : has
```

---

## 🎯 Key Features

### Trip Discovery & Booking
- Browse upcoming weekend trips with real-time availability
- Filter by destination, date, and package type
- Multi-passenger booking with detailed passenger information
- Secure payment processing with multiple options
- Digital tickets with QR code verification

### Customer Experience System
- **Premium Packages**: Standard, Premium, and VIP tiers with progressive benefits
- **Loyalty Program**: 3-tier system (Bronze, Silver, Gold) with rewards
- **Referral System**: Earn rewards by referring friends and family
- **T-Shirt Program**: Free branded T-shirts for confirmed bookings
- **Travel Insurance**: Comprehensive coverage with trusted partners

### Admin Dashboard
- Real-time statistics and analytics
- Complete trip and booking management
- Customer relationship management
- Loyalty and referral program administration
- Revenue tracking and reporting

---

## 🔐 Admin Access

For demonstration purposes, use these credentials:
- **Mobile**: 8700189551 (use OTP-based login)
- **Admin Panel**: Available at `/admin/login`

---

## 🌟 Sample Data

The application includes sample data for:
- **Temples**: Khatu Shyam Ji, Salasar Balaji, Krishna Janmabhoomi, Har Ki Pauri, Vaishno Devi
- **Routes**: Delhi to various temple destinations
- **Trips**: Weekend trips with realistic schedules and pricing
- **Packages**: Standard, Premium, and VIP packages
- **Bookings**: Sample booking data for testing

Run `bun run db:seed-simple` to populate the database with sample data.

---

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- 📱 Mobile phones (320px+)
- 📟 Tablets (768px+)
- 💻 Desktops (1024px+)

---

## 🚀 Production Features

- **SEO Optimized**: Meta tags and structured data
- **Performance**: Optimized images and lazy loading
- **Accessibility**: WCAG compliant components
- **Security**: Input validation and XSS protection
- **Error Handling**: Comprehensive error boundaries
- **PWA Support**: Progressive Web App features

---

## 📸 Screenshots

### Homepage with Premium Features
![Homepage](https://via.placeholder.com/800x400/FF6B35/FFFFFF?text=WeekendDarshan+Premium+Homepage)

### Package Selection
![Package Selection](https://via.placeholder.com/800x400/4ECDC4/FFFFFF?text=Package+Selection)

### Loyalty Rewards
![Loyalty Rewards](https://via.placeholder.com/800x400/45B7D1/FFFFFF?text=Loyalty+Rewards)

### Referral System
![Referral System](https://via.placeholder.com/800x400/96CEB4/FFFFFF?text=Referral+System)

### Admin Dashboard
![Admin Dashboard](https://via.placeholder.com/800x400/96CEB4/FFFFFF?text=Admin+Dashboard)

---

## 🤝 Future Enhancements

### Planned Features
- 📱 **Mobile App**: React Native companion app
- 🔔 **Advanced WhatsApp**: Automated notifications and booking
- 📊 **Advanced Analytics**: Google Analytics integration
- 🎟️ **QR Code Scanning**: Mobile boarding passes
- 📍 **Live Tracking**: Real-time bus location
- 💳 **Multiple Payment Gateways**: PhonePe, GPay, Paytm
- 🌍 **Multi-language**: Hindi and regional languages
- ⭐ **Reviews & Ratings**: User feedback system
- 🎪 **Group Tours**: Special group booking features
- 🏨 **Hotel Integration**: Partner hotel bookings

### Advanced Admin Features
- 📈 **Advanced Reports**: Excel/CSV exports with custom filters
- 👥 **Agent Management**: Multi-agent support system
- 🎫 **Dynamic Pricing**: Automated pricing based on demand
- 📢 **Campaign Management**: Marketing campaign tools
- 🔧 **Settings Management**: Dynamic configuration system

---

## 🛠️ Development

### Available Scripts

```bash
# Development
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint

# Database
bun run db:push      # Push database schema
bun run db:generate  # Generate Prisma client
bun run db:migrate   # Run database migrations
bun run db:reset     # Reset database

# Data Management
bun run db:seed-simple    # Seed with simple sample data
bun run db:seed            # Seed with comprehensive data
```

### Code Quality

- **ESLint**: Code linting and formatting
- **TypeScript**: Type safety
- **Prettier**: Code formatting (configured)
- **Husky**: Git hooks (to be added)

---

## 📊 API Documentation

### Core APIs
- `GET /api/trips` - Get all trips
- `GET /api/trips/[id]` - Get specific trip
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/[id]` - Get specific booking
- `GET /api/bookings/search` - Search bookings

### Authentication APIs
- `POST /api/auth/login` - User login
- `POST /api/auth/verify` - OTP verification
- `GET /api/auth/me` - Get current user

### Customer Experience APIs
- `GET /api/loyalty/rewards` - Get loyalty rewards
- `POST /api/referral/claim` - Claim referral reward
- `POST /api/packages/` - Get available packages

### Admin APIs
- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard` - Admin dashboard data
- `GET /api/admin/reports` - Generate reports

---

## 🚀 Deployment

### 🌐 Vercel (Recommended for Production)

The application is optimized for Vercel deployment with proper environment variable handling.

#### Quick Deploy with Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

#### Environment Variables Required

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@host:5432/db` |
| `JWT_SECRET` | JWT signing secret | `your-super-secret-jwt-key` |
| `NEXT_PUBLIC_APP_URL` | Your deployed app URL | `https://your-domain.vercel.app` |
| `RAZORPAY_KEY_ID` | Razorpay test/live key | `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | Razorpay secret | `your-razorpay-secret` |

### 🐳 Docker Deployment
```bash
# Build Docker image
docker build -t weekend-darshan .

# Run container
docker run -p 3000:3000 weekend-darshan
```

### 📊 Health Check

After deployment, test your application:
```bash
# Check application health
curl https://your-domain.vercel.app/api/health

# Check trips API
curl https://your-domain.vercel.app/api/trips

# Run database migration (if needed)
curl -X POST https://your-domain.vercel.app/api/migrate-db
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write TypeScript for all new code
- Add comments for complex logic
- Update documentation for new features
- Test your changes thoroughly

---

## 📞 Support & Contact

- **Phone**: +91-8700189551
- **WhatsApp**: +91-8700189551
- **Email**: info@weekenddarshan.com
- **GitHub Issues**: [Create an issue](https://github.com/jitenkr2030/Weekend-Darshan/issues)
- **24/7 Support**: Available for all passengers

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with devotion for the spiritual community. Making temple darshan accessible, comfortable, and rewarding for everyone.

### Special Thanks
- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Prisma](https://www.prisma.io/) - Modern database toolkit
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Razorpay](https://razorpay.com/) - Payment gateway

---

## 📈 Project Stats

![GitHub stars](https://img.shields.io/github/stars/jitenkr2030/Weekend-Darshan?style=social)
![GitHub forks](https://img.shields.io/github/forks/jitenkr2030/Weekend-Darshan?style=social)
![GitHub issues](https://img.shields.io/github/issues/jitenkr2030/Weekend-Darshan)
![GitHub pull requests](https://img.shields.io/github/issues-pr/jitenkr2030/Weekend-Darshan)

---

*🚌 WeekendDarshan - Your Complete Spiritual Journey, Simplified*
