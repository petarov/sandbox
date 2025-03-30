import express, { Request, Response } from 'express';
import { UserService } from '../services/userService';

const router = express.Router();

// Login page route
router.get('/login', (req: Request, res: Response) => {
  // If already logged in, redirect to home
  if (req.session.user && req.session.user.isAuthenticated) {
    return res.redirect('/home');
  }
  
  res.render('login', { 
    title: 'Login',
    error: req.query.error 
  });
});

// Root route redirects to login
router.get('/', (req: Request, res: Response) => {
  res.redirect('/login');
});

// Privacy policy page route
router.get('/privacy-policy', (req: Request, res: Response) => {
  res.render('privacy-policy', { 
    title: 'Data Privacy Policy'
  });
});

// Login form submission
router.post('/login', async (req: Request, res: Response) => {
  const { username, password, 'privacy-policy': privacyPolicy } = req.body;
  
  // Validate input
  if (!username || !password) {
    return res.redirect('/login?error=Please provide both username and password');
  }
  
  // // Check if privacy policy is accepted
  // if (!privacyPolicy) {
  //   return res.redirect('/login?error=You must agree to the Data Privacy Policy');
  // }
  
  try {
    // Authenticate user against database
    const user = await UserService.authenticateUser({ username, password });
    
    if (user) {
      // Set user in session
      req.session.user = {
        username: user.username,
        isAuthenticated: true
      };
      
      // Redirect to home page
      res.redirect('/home');
    } else {
      // Invalid credentials
      res.redirect('/login?error=Invalid username or password');
    }
  } catch (error) {
    console.error('Login error:', error);
    res.redirect('/login?error=An error occurred during login. Please try again.');
  }
});

// Logout route
router.get('/logout', (req: Request, res: Response) => {
  // Destroy session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login');
  });
});

export const authRouter = router;
