import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

// Get the repository for the User entity
const userRepository = AppDataSource.getRepository(User);

export interface UserCreateDTO {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

export interface UserLoginDTO {
  username: string;
  password: string;
}

export class UserService {
  /**
   * Create a new user
   */
  static async createUser(userData: UserCreateDTO): Promise<User> {
    try {
      const user = new User();
      user.username = userData.username;
      user.fullname = userData.fullname;
      user.email = userData.email;
      
      // Hash the password before saving
      user.password = await bcrypt.hash(userData.password, 10);
      
      return await userRepository.save(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Find a user by username
   */
  static async findByUsername(username: string): Promise<User | null> {
    try {
      return await userRepository.findOne({ where: { username } });
    } catch (error) {
      console.error('Error finding user by username:', error);
      throw error;
    }
  }

  /**
   * Authenticate a user
   */
  static async authenticateUser(loginData: UserLoginDTO): Promise<User | null> {
    try {
      const user = await this.findByUsername(loginData.username);
      console.log('User found:', user);
      console.log('Login data:', loginData);
      if (!user) {
        return null;
      }
      
      // Compare the provided password with the stored hash
      const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
      
      return isPasswordValid ? user : null;
    } catch (error) {
      console.error('Error authenticating user:', error);
      throw error;
    }
  }

  /**
   * Seed initial users (for development purposes)
   */
  static async seedInitialUsers(): Promise<void> {
    try {
      const existingUser = await this.findByUsername('user1');
      
      if (!existingUser) {
        await this.createUser({
          username: 'user1',
          fullname: 'Test User',
          email: 'user1@example.com',
          password: 'password1'
        });
        
        console.log('Initial user seeded successfully');
      }
    } catch (error) {
      console.error('Error seeding initial users:', error);
    }
  }
}
