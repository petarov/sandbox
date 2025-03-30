import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import session from 'express-session';
import { authRouter } from './routes/auth';
import { homeRouter } from './routes/home';
import { authMiddleware } from './middleware/auth';
import { initializeDatabase } from './config/database';
import { UserService } from './services/userService';

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Configure session
app.use(session({
  secret: 'GNDIQ6KPLGbm4Q9zCMuBtX5ydrQrXjteAIDyWwjbDmP6ZU',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Configure handlebars
app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, '../src/views/layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../src/views'));

// Routes
app.use('/', authRouter);
app.use('/home', authMiddleware, homeRouter);

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize database connection
    await initializeDatabase();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
