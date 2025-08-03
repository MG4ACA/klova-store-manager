# Copilot Instructions for Klova Store Manager

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a Nuxt.js full-stack POS (Point of Sale) system for a clothing business with the following specifications:

## Project Overview
- **Framework**: Nuxt 3 with JavaScript
- **Backend**: Nitro (built-in server engine)
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI and Heroicons

## Business Requirements
- Online clothing store with bulk sales to physical stores
- Simple ecommerce showcase (no payment gateways)
- Inventory management with variants (sizes: S, M, L, XL, XXL, XXXL, colors, styles)
- Stock tracking with low stock alerts
- Customer management with order history
- Staff roles: Admin, Manager, Cashier
- WhatsApp Business API integration
- Sales reporting and analytics
- Mobile/tablet responsive design

## Core Modules
1. **Dashboard** - Real-time overview and analytics
2. **Inventory** - Product management with variants and stock tracking
3. **Orders** - Bulk sales and order management
4. **Customers** - Customer database and history
5. **Staff** - Employee management and role-based access
6. **Reports** - Sales, inventory, and performance analytics
7. **Showcase** - Public product catalog (ecommerce frontend)
8. **WhatsApp** - Business API integration for order notifications

## Technical Guidelines
- Use Vue 3 composition API
- Implement proper authentication and authorization
- Follow RESTful API design patterns
- Use TypeScript for API routes when beneficial
- Implement responsive design with Tailwind CSS
- Use Prisma for database operations
- Follow Nuxt.js best practices for SSR/SPA
- Implement proper error handling and validation
- Use proper state management with Pinia if needed

## File Structure
- `/pages` - Application routes and views
- `/components` - Reusable Vue components
- `/server/api` - Backend API endpoints (Nitro)
- `/prisma` - Database schema and migrations
- `/assets` - Static assets and styles
- `/layouts` - Application layouts
- `/middleware` - Route middleware
- `/composables` - Vue composables
- `/utils` - Utility functions

## Code Style
- Use consistent naming conventions
- Implement proper error handling
- Add appropriate comments for complex logic
- Follow Vue.js style guide
- Use semantic HTML elements
- Implement accessibility best practices
