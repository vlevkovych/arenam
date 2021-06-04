## Starting in a development environment

1. Clone the repo from git:

   `git@github.com:vlevkovych/Learning-NodeJS.git`

2. `cd` to the folder you cloned the repo in (by default `arenam`):

   `cd arenam`

3. Install the dependencies:

   `npm install`

4. Build docker container:

   `npm run docker:build`

5. Start server:

   `npm run docker:up`

6. Temporary replace the `DB_HOST` `postgres` with `localhost` in `.env` to perform Prisma migrations

   `npm run migrate:dev`

7. Open `http://localhost:3000/graphql` in browser

<p align="center">Copyright 2021 &copy; Vadym Levkovych</p>
