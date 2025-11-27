# NetGlobe - Network Monitoring Dashboard

## Overview

NetGlobe is a real-time global network monitoring and analytics platform featuring an interactive 3D globe visualization. The application provides enterprise-grade network infrastructure monitoring with KPI tracking, global server visualization, and submarine cable connection mapping. Built as a full-stack TypeScript application with a dark-themed, data-first interface optimized for extended monitoring sessions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Stack:**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and data fetching

**UI Component System:**
- Shadcn/ui component library (New York style preset) with Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Dark mode theme system with localStorage persistence
- Design system inspired by Linear and Vercel dashboards emphasizing data clarity

**State Management:**
- React Query for remote data caching and synchronization
- React Context for theme management
- Local component state with hooks for UI interactions

**3D Visualization:**
- globe.gl library for interactive 3D globe rendering
- Three.js as the underlying WebGL framework
- Real-time location point plotting and cable connection visualization

**Animation & Motion:**
- Framer Motion for component animations and page transitions
- Subtle, purposeful animations that enhance understanding without distraction

### Backend Architecture

**Server Framework:**
- Express.js HTTP server with TypeScript
- Node.js runtime environment
- HTTP server creation for potential WebSocket upgrade support

**API Design:**
- RESTful endpoints for KPI data (`/api/kpi`)
- RESTful endpoints for globe visualization data (`/api/globe`)
- Health check endpoint for monitoring (`/api/health`)
- JSON response format for all API endpoints

**Data Storage Strategy:**
- In-memory storage implementation for development/prototyping
- Schema-first design with TypeScript interfaces for type safety
- Drizzle ORM configured for PostgreSQL migration path
- Database schema defined in shared types for client-server consistency

**Build & Deployment:**
- Custom esbuild configuration for server bundling
- Dependency allowlisting to reduce syscall overhead and improve cold starts
- Separate client and server build processes
- Static file serving for production builds

### Data Models

**KPI Data Structure:**
- Metric tracking with value, unit, and trend indicators
- Badge system for status visualization (success, warning, danger, primary, info, neutral)
- Icon association for visual recognition
- Support for percentage changes and directional trends

**Globe Visualization Data:**
- Location points with geographic coordinates (lat/lng)
- Color-coded markers for different server types/statuses
- Submarine cable connections with path coordinates
- Support for both point-to-point arcs and multi-coordinate paths

**User Management:**
- PostgreSQL-backed user table with UUID primary keys
- Username/password authentication schema
- Drizzle-Zod integration for runtime validation

### Routing Architecture

**Client-Side Routing:**
- Dashboard (home) route at `/`
- Placeholder routes for future features: `/device`, `/tunnel`, `/service`, `/timeline`
- 404 handling for undefined routes
- Single-page application with client-side navigation

**Server-Side Routing:**
- API routes under `/api` namespace
- Static file fallback to `index.html` for SPA support
- Development-specific Vite middleware integration
- Request logging with timing information

### Development Experience

**Hot Module Replacement:**
- Vite HMR over custom `/vite-hmr` path
- Template reloading with cache-busting
- Replit-specific development plugins for enhanced DX

**Type Safety:**
- Shared schema types between client and server
- Path aliases for clean imports (`@/`, `@shared/`)
- Strict TypeScript configuration with ESNext modules

**Code Organization:**
- Monorepo structure with `client/`, `server/`, and `shared/` directories
- Component-driven architecture with UI primitives
- Separation of concerns between data fetching, state, and presentation

## External Dependencies

**Database:**
- Neon serverless PostgreSQL configured via `DATABASE_URL` environment variable
- Drizzle ORM for migrations and query building
- Connection pooling via `@neondatabase/serverless`
- `connect-pg-simple` for session store support (if implemented)

**UI Libraries:**
- Radix UI primitives for accessible, unstyled components
- Lucide React for icon system
- Globe.gl for 3D globe visualization
- Three.js for WebGL rendering
- Framer Motion for animations

**Development Tools:**
- Replit-specific plugins for cartographer mapping and dev banner
- Runtime error overlay for development
- ESBuild for server bundling
- PostCSS with Tailwind and Autoprefixer

**Form & Validation:**
- React Hook Form with Hookform Resolvers
- Zod for runtime schema validation
- Drizzle-Zod for ORM schema validation

**Utilities:**
- date-fns for date manipulation
- clsx and tailwind-merge for className management
- class-variance-authority for component variant management
- nanoid for unique ID generation

**Build Process:**
- Custom build script bundling allowlisted dependencies
- Vite for client bundling with code splitting
- Source map support via @jridgewell/trace-mapping