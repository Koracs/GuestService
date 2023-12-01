# GuestService
Basic Service for managing Guests using Next.js, Keycloak and Prisma

## Setup

 1. Run npm install
 2. Run Docker Compose
 3. Setup Keycloak via Realm Export
 4. Change Client Secret of NextJS-Frontend
 5. Fill .env.local (example below)
 6. run prisma

## Example .env.local

    KEYCLOAK_ID=nextjs-frontend
    KEYCLOAK_SECRET=YOURSECRETHERE(From installation step 4)
    KEYCLOAK_ISSUER=http://localhost:8081/auth/realms/kgolap
    KEYCLOAK_REFRESH_TOKEN_URL=http://localhost:8081/auth/realms/kgolap/protocol/openid-connect/token
    END_SESSION_URL=http://localhost:8081/auth/realms/kgolap/protocol/openid-connect/logout
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=YOURSECRETHERE(Random String)



