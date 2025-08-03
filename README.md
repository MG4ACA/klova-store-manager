# Klova Store Manager

A comprehensive POS (Point of Sale) and inventory management system for clothing businesses, built with Nuxt.js and featuring both internal management tools and a public ecommerce showcase.

## Features

### 🏪 **POS System (Internal)**
- **Dashboard** - Real-time sales overview and analytics
- **Inventory Management** - Products, variants (sizes, colors, styles), stock tracking
- **Order Management** - Bulk sales, retail orders, order tracking
- **Customer Management** - Customer database with purchase history
- **Staff Management** - Role-based access (Admin, Manager, Cashier)
- **Sales Reporting** - Daily sales, inventory reports, performance analytics
- **Low Stock Alerts** - Automatic notifications for reorder points

### 🌐 **Ecommerce Showcase (Public)**
- **Product Catalog** - Simple product display without payment gateway
- **Categories** - Organized product browsing
- **Contact Forms** - Inquiry and bulk order requests
- **WhatsApp Integration** - Direct contact for orders
- **Responsive Design** - Mobile and tablet optimized

### 🔧 **Technical Features**
- **Full-Stack** - Nuxt 3 with Nitro backend
- **Database** - SQLite with Prisma ORM
- **Authentication** - JWT-based user authentication
- **Real-time Updates** - Live inventory and sales data
- **API Integration** - WhatsApp Business API support
- **Modern UI** - Tailwind CSS with responsive design

## Tech Stack

- **Frontend**: Nuxt 3, Vue 3, Tailwind CSS
- **Backend**: Nitro (built-in server)
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT
- **UI Components**: Headless UI, Heroicons
- **Deployment**: AWS Amplify ready

## Project Structure

```
├── assets/              # CSS and static assets
├── components/          # Reusable Vue components
├── layouts/            # Application layouts
│   ├── default.vue     # POS system layout
│   └── showcase.vue    # Public ecommerce layout
├── pages/              # Application routes
│   ├── dashboard.vue   # Main dashboard
│   ├── inventory/      # Inventory management
│   ├── orders/         # Order management
│   ├── customers/      # Customer management
│   ├── reports/        # Analytics and reports
│   └── showcase/       # Public product showcase
├── prisma/             # Database schema and migrations
├── server/api/         # Backend API endpoints
├── middleware/         # Route middleware
└── utils/              # Utility functions
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd klova-store-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration.

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - POS System: http://localhost:3000/dashboard
   - Public Showcase: http://localhost:3000/showcase
   - API: http://localhost:3000/api

## Database Schema

The system includes comprehensive models for:
- **Users** - Staff authentication and role management
- **Products** - Product catalog with variants (size, color, style)
- **Categories** - Product categorization
- **Customers** - Customer database with history
- **Orders** - Order management with items and status tracking
- **Sales** - Transaction records and payment tracking
- **Stock Movements** - Inventory tracking and adjustments
- **Settings** - System configuration

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - List orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order
- `GET /api/orders/:id` - Get order details

### Customers
- `GET /api/customers` - List customers
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer

### Reports
- `GET /api/reports/sales` - Sales reports
- `GET /api/reports/inventory` - Inventory reports
- `GET /api/reports/dashboard` - Dashboard statistics

## Business Logic

### Product Variants
Products support multiple variants:
- **Sizes**: S, M, L, XL, XXL, XXXL
- **Colors**: Multiple color options
- **Styles**: Different style variations
- **Individual SKUs**: Each variant has unique SKU
- **Stock Tracking**: Per-variant inventory management

### Order Types
- **RETAIL** - Individual customer orders
- **BULK** - Large quantity orders for businesses
- **WHOLESALE** - Special pricing for bulk buyers

### Stock Management
- **Automatic Updates** - Stock adjusted on sales
- **Low Stock Alerts** - Configurable minimum thresholds
- **Stock Movements** - Full audit trail of inventory changes
- **Adjustment Support** - Manual stock corrections

### Reporting
- **Real-time Dashboard** - Live sales and inventory data
- **Sales Reports** - Daily, weekly, monthly summaries
- **Inventory Reports** - Stock levels, movement history
- **Customer Reports** - Purchase history, top customers

## WhatsApp Integration

The system supports WhatsApp Business API integration for:
- **Order Notifications** - Automatic order confirmations
- **Stock Alerts** - Low inventory notifications
- **Customer Communication** - Direct messaging for orders
- **Bulk Order Inquiries** - Public showcase integration

## Deployment

### AWS Amplify Deployment

The application is ready for AWS Amplify deployment:

1. **Connect Repository** - Link your Git repository to Amplify
2. **Build Settings** - Amplify auto-detects Nuxt.js configuration
3. **Environment Variables** - Set production environment variables
4. **Deploy** - Automatic deployment on Git push

### Build Commands
```bash
npm run build    # Production build
npm run preview  # Preview production build
npm run dev      # Development server
```

## Development

### Adding New Features

1. **Database Changes** - Update Prisma schema and migrate
2. **API Endpoints** - Add new routes in `/server/api`
3. **Frontend Pages** - Create new pages and components
4. **Authentication** - Use middleware for protected routes

### Code Style
- **ESLint** - Code linting and formatting
- **Vue 3 Composition API** - Modern Vue.js patterns
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Optional type safety for complex logic

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software for Klova Store.

## Support

For support and questions:
- Email: support@klovastore.com
- WhatsApp: +94 123 456 789

---

**Klova Store Manager** - Complete POS and Inventory Management Solution
