## Getting Started

### Minimal setup

```bash
npm install
npm run db:migrate:latest
npm run dev
```

### Commands

Install node modules

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Database management

SQLite database resides in [`db.sqlite`](db.sqlite) file.

Run DB migrations to create DB objects

```bash
npm run db:migrate:latest
```

Create new migrations file in [`migrations`](migrations) directory

```bash
npm run db:migrate:make
```

Generate DB typescript definitions models for Kysely query builder
```bash
npm run db:codegen
```
