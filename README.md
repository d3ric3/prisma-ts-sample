# Steps to create Typescript project connecting Planetscale db with Prisma
1. npm init -y
2. npm i -D prisma typescript ts-node @types/node
3. npx tsc --init
    1. Edit tsconfig.json

        ```
        {
          "compilerOptions": {
            "sourceMap": true,
            "outDir": "dist",
            "strict": true,
            "lib": ["ESNext"],
            "esModuleInterop": true
          }
        }

        ```
4. npx prisma init
    1. Login PlanetScale.com
    2. Create database (main), shadow database (branch)
    3. Copy database (main) connection url to enviroment variable `DATABASE_URL`
    4. Copy shadow database (branch) connection url to environment variable `SHADOW_DATABASE_URL`
    5. Append ` &sslaccept=strict ` to the end of both database URL
    6. Navigate to ***database (main) > Settings > General > Automatically copy migration data***. Then select 
        1. Migration framework: `Prisma`
        2. Migration table name: `_prisma_migrations`
    7. Edit schema.prisma to work with PlanetScale db. [Refer resource here](https://github.com/prisma/prisma/issues/7292). Then add new User model
      ```diff
      generator client {
        provider = "prisma-client-js"
      +  previewFeatures = ["referentialIntegrity"]
      }

      datasource db {
        provider = "mysql"
        url      = env("DATABASE_URL")
      +  shadowDatabaseUrl    = env("SHADOW_DATABASE_URL")
      +  referentialIntegrity = "prisma"
      }

      +model User {
      +  is String @id @default(cuid())
      +  name String
      +  age Int
      +}
      ```
5. npx prisma migrate dev --name init
6. Create `index.ts` and edit the content
7. Edit `package.json` to include 
    ```
    "script": { "dev": "ts-node index.ts" }
    ```
8. npm run dev
