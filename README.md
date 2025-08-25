# Overview

This is an Ikigai journal application that helps users discover their life purpose through guided self-reflection prompts. The app implements the Japanese concept of Ikigai - finding the intersection between what you love, what you're good at, what the world needs, and what you can be paid for. Users progress through a multi-step journaling process with prompts designed to explore each aspect of their Ikigai, culminating in a personalized life purpose statement.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React with TypeScript**: Main UI framework using functional components and hooks
- **Vite**: Build tool and development server for fast compilation and hot module replacement
- **Wouter**: Lightweight client-side routing library for navigation
- **shadcn/ui Components**: Pre-built, accessible UI component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom color scheme for warm, journal-like aesthetics
- **TanStack Query**: Data fetching and state management for API interactions

## Backend Architecture  
- **Express.js**: RESTful API server handling journal data operations
- **TypeScript**: Type safety across the entire backend codebase
- **Memory Storage**: In-memory data storage for demo purposes (production-ready for database integration)
- **Structured API Routes**: Clean separation of concerns with dedicated route handlers

## Data Storage Solutions
- **Development**: In-memory storage using JavaScript Maps for rapid prototyping
- **Production Ready**: Configured for PostgreSQL with Drizzle ORM
- **Schema Design**: Relational data model with users and journal entries tables
- **Local Persistence**: Browser localStorage for offline data retention

## Authentication and Authorization
- **Demo Mode**: Simplified authentication using static user identifiers
- **Session Management**: Configured for connect-pg-simple for production PostgreSQL sessions
- **Extensible Design**: Architecture supports full authentication system integration

## External Dependencies
- **Neon Database**: PostgreSQL hosting service for production data storage
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect
- **Radix UI**: Accessible component primitives for complex UI interactions
- **React Hook Form**: Form state management with validation support
- **Date Functions**: date-fns library for date manipulation and formatting
- **Development Tools**: ESBuild for production bundling, TSX for TypeScript execution

The application follows a clean separation between client and server code, with shared TypeScript schemas ensuring type safety across the full stack. The architecture prioritizes user experience with offline capabilities, responsive design, and accessibility standards.