# TypeScript Authentication App

(This shit is generated with Sonnet 3.7)

A Node.js web application built with TypeScript, Express, and Handlebars that demonstrates user authentication and session management with MariaDB database integration.

## Features

- User authentication with MariaDB database
- Password encryption using bcrypt
- Session management
- TypeORM for database operations
- Handlebars templating engine
- TypeScript throughout the application

## Prerequisites

- Node.js (v14 or higher)
- MariaDB (running on port 3306)

## Database Setup

The application expects a MariaDB database named `auth_app` with a `users` table. The application will automatically create the table structure when it first runs with `synchronize: true` in the TypeORM configuration.

## Configuration

Database connection settings can be modified in `src/config/database.ts`:

```typescript
export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'root',  // Replace with your MariaDB username
  password: '',      // Replace with your MariaDB password
  database: 'auth_app',
  synchronize: true, // Automatically creates database schema (use only in development)
  logging: false,
  entities: [User],
  migrations: [path.join(__dirname, '../migrations/*.js')],
  subscribers: [],
});
```

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Build the application:

```bash
npm run build
```

4. Start the application:

```bash
npm start
```

For development:

```bash
npm run dev
```

For development with live-reload (automatically restarts when files change):

```bash
npm run dev:watch
```

## Usage

1. Access the application at http://localhost:3000
2. Log in with the default credentials:
   - Username: user1
   - Password: password1

## Project Structure

```
typescript-auth-app/
├── dist/                  # Compiled JavaScript files
├── public/                # Static assets
│   └── css/               # CSS stylesheets
├── src/                   # TypeScript source code
│   ├── config/            # Configuration files
│   ├── middleware/        # Express middleware
│   ├── models/            # TypeORM entity models
│   ├── routes/            # Express routes
│   ├── services/          # Business logic
│   ├── views/             # Handlebars templates
│   │   └── layouts/       # Layout templates
│   └── index.ts           # Application entry point
├── nodemon.json           # Nodemon configuration for live-reload
├── package.json           # Project dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## License

MIT
