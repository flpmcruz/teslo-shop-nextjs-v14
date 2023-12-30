## Getting Started

```bash
# Rename .env.example to .env and fill in the values

# Install dependencies
npm install
# Start the database
docker compose up -d
# Correr migraciones
npx prisma migrate dev
# Run SEED
npm run seed
# Start the server
npm run dev
```
