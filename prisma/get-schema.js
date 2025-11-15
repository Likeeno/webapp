// Helper script to get the correct schema file based on DATABASE_PROVIDER
const provider = process.env.DATABASE_PROVIDER || 'sqlite';
const schema = provider === 'postgresql' ? 'schema.postgres.prisma' : 'schema.prisma';
console.log(`prisma/${schema}`);
