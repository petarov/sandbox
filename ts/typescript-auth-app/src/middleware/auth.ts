import { Request, Response, NextFunction } from 'express';

// Extend the Express Request interface to include session properties
declare module 'express-session' {
  interface SessionData {
    user?: {
      username: string;
      isAuthenticated: boolean;
    };
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Check if user is authenticated
  if (req.session.user && req.session.user.isAuthenticated) {
    next();
  } else {
    // Redirect to login page if not authenticated
    res.redirect('/login');
  }
};
