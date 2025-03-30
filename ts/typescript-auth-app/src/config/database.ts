import { DataSource } from 'typeorm';
import { User } from '../models/User';
import path from 'path';

// Create a new DataSource instance for MariaDB
export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: '127.0.0.1',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // Automatically creates database schema (use only in development)
  logging: false,
  entities: [User],
  migrations: [path.join(__dirname, '../migrations/*.js')],
  subscribers: [],
});

// Initialize the database connection
export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};
