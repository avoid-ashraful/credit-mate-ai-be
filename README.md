# Express.js Backend with Prisma

A modern Express.js backend server with Prisma ORM integration featuring Bank and Credit Card management APIs with full CRUD operations.

## Project Structure

```
├── src/
│   ├── config/
│   │   ├── database.js    # Prisma client configuration
│   │   └── env.js         # Environment configuration
│   └── routes/
│       ├── banks.js       # Bank CRUD API routes
│       └── creditCards.js # Credit Card CRUD API routes
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js           # Database seeding
├── .env.local            # Environment variables (not tracked by git)
├── server.js             # Main application entry point
└── package.json
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Update `.env.local` with your database connection string:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   NODE_ENV="development"
   PORT=3000
   ```

3. **Set up the database:**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database (for development)
   npm run db:push
   
   # Or run migrations (for production)
   npm run db:migrate
   
   # Seed the database with sample data
   npm run db:seed
   ```

## Running the Project

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### General
- `GET /health` - Health check with database connectivity status
- `GET /` - Returns hello world message
- `GET /hello` - Returns hello world message from /hello endpoint
- `GET /users` - Returns all users from the database

### Banks API (`/api/banks`)
- `GET /api/banks` - Get all banks with their credit cards
- `GET /api/banks/:id` - Get bank by ID with credit cards
- `POST /api/banks` - Create new bank (requires: name, optional: website)
- `PUT /api/banks/:id` - Update bank
- `DELETE /api/banks/:id` - Delete bank

### Credit Cards API (`/api/credit-cards`)
- `GET /api/credit-cards` - Get all credit cards with bank info
- `GET /api/credit-cards/:id` - Get credit card by ID with bank info
- `POST /api/credit-cards` - Create new credit card (requires: name, bankId)
- `PUT /api/credit-cards/:id` - Update credit card
- `DELETE /api/credit-cards/:id` - Delete credit card

## Database Management

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:seed` - Seed database with sample data

## Environment Variables

Create a `.env.local` file with your database credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
NODE_ENV="development"
PORT=3000
FRONTEND_URL="http://localhost:3000"  # Optional: specify frontend URL for CORS
```

This file is ignored by git to keep your credentials secure.

## Requirements

- Node.js (version 16 or higher)
- PostgreSQL database
- npm