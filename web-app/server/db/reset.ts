import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('❌ DATABASE_URL is not defined in environment variables.');
    process.exit(1);
}

const sql = postgres(connectionString);

async function resetDatabase() {
    try {
        // Drop all tables, types, and relations in the public schema
        await sql`DROP SCHEMA public CASCADE;`;
        // Recreate the empty public schema
        await sql`CREATE SCHEMA public;`;
    } 
    catch (err) {
        console.error('❌ Error resetting database:', err);
    } 
    finally {
        await sql.end();
        process.exit(0);
    }
}

resetDatabase();
