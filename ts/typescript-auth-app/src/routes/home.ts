import express, { Request, Response } from 'express';
import { UserService } from '../services/userService';

const router = express.Router();

// Home page route (protected by auth middleware)
router.get('/', async (req: Request, res: Response) => {
  try {
    // We can safely access req.session.user here because the auth middleware
    // ensures that the user is authenticated before reaching this route
    const username = req.session.user?.username || 'User';
    
    // Get the full user details from the database
    const user = await UserService.findByUsername(username);
    
    res.render('home', { 
      title: 'Welcome',
      username: username,
      fullname: user?.fullname || username,
      email: user?.email
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.render('home', { 
      title: 'Welcome',
      username: req.session.user?.username || 'User',
      error: 'Could not fetch complete user details'
    });
  }
});

export const homeRouter = router;
