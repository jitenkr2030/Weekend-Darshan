import { PrismaClient } from '@prisma/client'
import { getDatabaseUrl } from '../src/lib/db'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...')
    console.log('Database URL:', getDatabaseUrl().replace(/:([^:@]+)@/, ':***@')) // Hide password
    
    // Test basic connection
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Test query
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Database query successful!')
    
    // Check if tables exist
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `
    
    console.log('📊 Tables found:', tables.length)
    if (tables.length > 0) {
      console.log('Tables:', tables.map((t: any) => t.table_name).join(', '))
    } else {
      console.log('⚠️ No tables found. Run: bun run db:push')
    }
    
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('must start with the protocol')) {
        console.log('💡 Solution: Check DATABASE_URL format in .env.local')
      } else if (error.message.includes('authentication failed')) {
        console.log('💡 Solution: Check NEON__POSTGRES_PASSWORD and NEON__PGHOST')
      } else if (error.message.includes('does not exist')) {
        console.log('💡 Solution: Check database name in DATABASE_URL')
      }
    }
    
    return false
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()