import { PrismaClient } from '@prisma/client'

// Helper function to construct proper database URL from Neon environment variables
function getDatabaseUrl(): string {
  // Priority 1: Use explicit DATABASE_URL if provided and properly formatted
  const databaseUrl = process.env.DATABASE_URL
  if (databaseUrl && (
    databaseUrl.startsWith('postgresql://') || 
    databaseUrl.startsWith('postgres://') ||
    databaseUrl.startsWith('file:')
  )) {
    return databaseUrl
  }
  
  // Priority 2: Check NEON__POSTGRES_URL_NON_POOLING (set by Vercel Neon integration)
  const databaseUrlNonPooling = process.env.NEON__POSTGRES_URL_NON_POOLING
  if (databaseUrlNonPooling && databaseUrlNonPooling.startsWith('postgresql://')) {
    return databaseUrlNonPooling
  }
  
  // Priority 3: Construct from individual Neon environment variables
  const password = process.env.NEON__POSTGRES_PASSWORD
  const host = process.env.NEON__PGHOST
  
  if (password && host) {
    const user = process.env.NEON__POSTGRES_USER || 'neondb_owner'
    const database = process.env.NEON__POSTGRES_DATABASE || 'neondb'
    return `postgresql://${user}:${password}@${host}:5432/${database}?sslmode=require`
  }
  
  // Priority 4: Check standard Vercel Postgres variables
  if (process.env.POSTGRES_URL_NON_POOLING) {
    return process.env.POSTGRES_URL_NON_POOLING
  }
  
  if (process.env.POSTGRES_PRISMA_URL) {
    return process.env.POSTGRES_PRISMA_URL
  }
  
  // Priority 5: Check NEON__DATABASE_URL if available
  const neonDatabaseUrl = process.env.NEON__DATABASE_URL
  if (neonDatabaseUrl && neonDatabaseUrl.startsWith('postgresql://')) {
    return neonDatabaseUrl
  }
  
  // Development fallback (SQLite for local development)
  if (process.env.NODE_ENV === 'development') {
    return 'file:./db/custom.db'
  }
  
  // No valid configuration found - throw a clear error
  const availableVars = []
  if (process.env.DATABASE_URL) availableVars.push('DATABASE_URL')
  if (process.env.NEON__POSTGRES_URL_NON_POOLING) availableVars.push('NEON__POSTGRES_URL_NON_POOLING')
  if (process.env.NEON__POSTGRES_PASSWORD && process.env.NEON__PGHOST) availableVars.push('NEON__POSTGRES_PASSWORD + NEON__PGHOST')
  if (process.env.POSTGRES_URL_NON_POOLING) availableVars.push('POSTGRES_URL_NON_POOLING')
  if (process.env.POSTGRES_PRISMA_URL) availableVars.push('POSTGRES_PRISMA_URL')
  
  throw new Error(
    `Database connection string not found. Please set one of the following environment variables:\n` +
    `1. DATABASE_URL (recommended) - e.g., postgresql://user:password@host:5432/database?sslmode=require\n` +
    `2. NEON__POSTGRES_URL_NON_POOLING (from Vercel Neon integration)\n` +
    `Currently available: ${availableVars.length > 0 ? availableVars.join(', ') : 'none'}`
  )
}

// Initialize Prisma client with proper database URL
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: getDatabaseUrl()
    }
  }
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}

// Database initialization function
export async function initializeDatabase() {
  try {
    // Test database connection
    await db.$connect()
    
    console.log('Database connected successfully')
    
    // Check if database has any data
    const tripCount = await db.trip.count().catch(() => 0)
    
    if (tripCount === 0) {
      console.log('Database is empty, ready for seeding...')
      return { initialized: true, needsSeed: true }
    }
    
    console.log('Database initialized and ready')
    return { initialized: true, needsSeed: false }
  } catch (error) {
    console.error('Database initialization error:', error)
    
    // Provide helpful error message for common issues
    if (error instanceof Error) {
      if (error.message.includes('must start with the protocol')) {
        console.error('💡 Solution: Make sure your DATABASE_URL starts with the correct protocol:')
        console.error('   - For SQLite: file:./path/to/database.db')
        console.error('   - For PostgreSQL: postgresql://user:password@host:5432/database')
      } else if (error.message.includes('connection')) {
        console.error('💡 Solution: Check your database credentials and ensure the database is active')
      }
    }
    
    return { initialized: false, needsSeed: false, error }
  }
}

// Function to check if database exists and is accessible
export async function checkDatabase() {
  try {
    await db.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    return false
  }
}

export default db