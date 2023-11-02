<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://github.com/dammy001/express-ts-starter">
   Express TS Starter
  </a>
</p>

## About the Project

### Built With

- [ExpressJS](https://nextjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma.io](https://prisma.io)

## Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

Here is what you need to be able to run the project.

- Node.js (Version: >=18.x)
- PostgreSQL
- pnpm _(recommended)_

> If you want to enable any of the available integrations, you may want to obtain additional credentials for each one. More details on this can be found below under the [integrations section](#integrations).

## Development

### Setup

1. Clone the repo into a public GitHub repository (or fork https://github.com/dammy001/express-ts-starter/fork).

   ```sh
   git clone https://github.com/dammy001/express-ts-starter.git
   ```

   > If you are on windows, run the following command on `gitbash` with admin privileges: <br> > `git clone -c core.symlinks=true https://github.com/dammy001/express-ts-starter.git` <br>

1. Go to the project folder

   ```sh
   cd express-ts-starter
   ```

1. Install packages with pnpm

   ```sh
   pnpm i
   ```

1. Set up your `.env` file
   - Duplicate `.env.example` to `.env`
   - Use `openssl rand -base64 32` to generate a key and add it under `SECRET_KEY` in the `.env` file.

#### Quick start with `pnpm docker:compose`

> - **Requires Docker and Docker Compose to be installed**
> - Will start a local Postgres and Redis instance with a few test users.

```sh
pnpm docker:compose
```

#### Manual setup

1. Configure environment variables in the `.env` file. Replace `<user>`, `<pass>`, `<db-host>`, and `<db-port>` with their applicable values

   ```
   DATABASE_URL='postgresql://<user>:<pass>@<db-host>:<db-port>'
   ```

   <details>
   <summary>If you don't know how to configure the DATABASE_URL, then follow the steps here to create a quick local DB</summary>

   1. [Download](https://www.postgresql.org/download/) and install postgres in your local (if you don't have it already).

   2. Create your own local db by executing `createDB <DB name>`

   3. Now open your psql shell with the DB you created: `psql -h localhost -U postgres -d <DB name>`

   4. Now extract all the info and add it to your DATABASE_URL. The url would look something like this
   `postgresql://postgres:postgres@localhost:5432/Your-DB-Name`.
   </details>

1. Set up the database using the Prisma schema (found in `packages/prisma/schema.prisma`)

   In a development environment, run:

   ```sh
   pnpm db:migrate
   ```

   In a production environment, run:

   ```sh
   pnpm db:deploy
   ```

1. Run (in development mode)

   ```sh
   pnpm run dev
   ```

#### Setting up your first user

1. Open [Prisma Studio](https://prisma.io/studio) to look at or modify the database content:

   ```sh
   pnpm run db:studio
   ```

1. Click on the `User` model to add a new user record.
1. Fill out the fields `email`, `userName`, `firstName`, `lastName` and click `Save 1 Record` to create your first user.
   > You might want to adjust this behavior to your needs in the `prisma/schema.prisma` file.

### E2E-Testing

```sh
# In a terminal just run:
pnpm test
```
