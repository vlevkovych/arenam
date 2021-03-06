## Starting in a development environment

1. Clone the repo from git:

   `git@github.com:vlevkovych/arenam.git`

2. `cd` to the folder you cloned the repo in (by default `arenam`):

   `cd arenam`

3. Install the dependencies:

   `npm install`

4. Build docker container:

   `sudo docker-compose build`

5. Start server:

   `sudo docker-compose up`

6. Perform Prisma migrations

   `npm run migrate:dev`

7. Open `http://localhost:3000/graphql` in browser

<p align="center">Copyright 2021 &copy; Vadym Levkovych</p>
