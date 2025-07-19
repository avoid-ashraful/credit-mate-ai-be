# Express.js Backend with Prisma

A modern Express.js backend server with Prisma ORM integration and environment-based configuration.
TODO: Need to update this.

## Project Structure

```
├── src/
│   └── config/
│       ├── database.js    # Prisma client configuration
│       └── env.js         # Environment configuration
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js           # Database seeding
├── .env.local            # Local environment variables
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

- `GET /health` - Health check with database connectivity status
- `GET /` - Returns hello world message
- `GET /hello` - Returns hello world message from /hello endpoint
- `GET /users` - Returns all users from the database

## Database Management

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:seed` - Seed database with sample data

## Environment Variables

Create a `.env.local` file with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
NODE_ENV="development"
PORT=3000
```

## Requirements

- Node.js (version 16 or higher)
- PostgreSQL database
- npm