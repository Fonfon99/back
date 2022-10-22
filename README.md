## GROUPOMANIA BACKEND

This is the backend of the Groupomania project. It is a social network for employees of the company.

### Technologies

- Node.js, Express, JWT, Multer 
- MySQL hosted on PlanetScale
- Prisma for ORM

### Installation

1. Clone the repository with `git clone`
2. Install dependencies with `npm install`
3. Rename the `.env.development` file in the root directory into `.env` and fill the following variables with your own values:
  - `PORT` (default: 3000)
  - `SECRET_KEY` 
  - `DB_URL` 

4. This repo was tested with an online MySQL database hosted on PlanetScale. You can use your own database, but you will have to change the `datasource` property in the `prisma/schema.prisma` file.
5. Run the server with `npm run dev`

### Prisma's usage to interact with the database

You can find db schema in the `prisma/schema.prisma` file. You can use the following commands to interact with the database:

- `npx prisma generate` to generate the Prisma Client
- `npx prisma db push` to create the database and the tables
- `npx prisma studio` to open the Prisma Studio