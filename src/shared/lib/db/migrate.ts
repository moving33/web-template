import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const runMigrations = async () => {
  const connection = postgres(process.env.DATABASE_URL!, { max: 1 })
  const db = drizzle(connection)

  console.log('Running migrations...')
  await migrate(db, { migrationsFolder: './drizzle/migrations' })
  console.log('Migrations complete!')

  await connection.end()
}

runMigrations().catch(console.error)
