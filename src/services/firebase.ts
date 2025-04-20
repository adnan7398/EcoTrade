// This is a mock Firebase service for demo purposes
// In a real app, you would integrate with actual Firebase services

import { User, Product, Order, LeaderboardEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

// Simulate authentication
let currentUser: User | null = null;

export const auth = {
  currentUser: () => currentUser,
  
  signIn: async (email: string, password: string): Promise<User> => {
    // Mock user authentication
    if (email && password) {
      const user: User = {
        id: uuidv4(),
        email,
        displayName: email.split('@')[0],
        isAdmin: email === 'admin@ecotrade.com',
        carbonFootprint: 0,
        points: 0,
        joinedAt: new Date()
      };
      
      currentUser = user;
      localStorage.setItem('ecotrade_user', JSON.stringify(user));
      return user;
    }
    
    throw new Error('Invalid credentials');
  },
  
  signUp: async (email: string, password: string): Promise<User> => {
    // Mock user registration
    if (email && password) {
      const user: User = {
        id: uuidv4(),
        email,
        displayName: email.split('@')[0],
        isAdmin: false,
        carbonFootprint: 0,
        points: 0,
        joinedAt: new Date()
      };
      
      currentUser = user;
      localStorage.setItem('ecotrade_user', JSON.stringify(user));
      return user;
    }
    
    throw new Error('Invalid credentials');
  },
  
  signOut: async (): Promise<void> => {
    currentUser = null;
    localStorage.removeItem('ecotrade_user');
  },
  
  checkAuth: (): User | null => {
    const storedUser = localStorage.getItem('ecotrade_user');
    if (storedUser) {
      currentUser = JSON.parse(storedUser);
      return currentUser;
    }
    return null;
  }
};

// Generate mock products
const generateMockProducts = (): Product[] => {
  const categories = ['Furniture', 'Fashion', 'Home Decor', 'Electronics', 'Accessories'];
  const materials = ['Recycled Plastic', 'Upcycled Wood', 'Reclaimed Metal', 'Organic Cotton', 'Recycled Paper'];
  
  return Array(24).fill(null).map((_, index) => ({
    id: uuidv4(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    images: [
      `https://images.pexels.com/photos/${1000000 + index * 1111}/pexels-photo-${1000000 + index * 1111}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
      `https://images.pexels.com/photos/${2000000 + index * 1111}/pexels-photo-${2000000 + index * 1111}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`,
    ],
    category: categories[Math.floor(Math.random() * categories.length)],
    carbonFootprint: parseFloat((Math.random() * 50).toFixed(2)),
    materials: [
      materials[Math.floor(Math.random() * materials.length)],
      materials[Math.floor(Math.random() * materials.length)],
    ],
    sustainabilityScore: Math.floor(Math.random() * 100),
    stock: Math.floor(Math.random() * 100) + 1,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    featured: index < 6
  }));
};

const mockProducts = generateMockProducts();

// Generate mock orders
const mockOrders: Order[] = [];

// Generate mock leaderboard
const generateMockLeaderboard = (): LeaderboardEntry[] => {
  return Array(10).fill(null).map((_, index) => ({
    userId: uuidv4(),
    displayName: faker.person.fullName(),
    photoURL: index % 3 === 0 ? `https://i.pravatar.cc/150?img=${index + 10}` : undefined,
    points: Math.floor(Math.random() * 1000) + 100,
    carbonSaved: parseFloat((Math.random() * 500).toFixed(2))
  }));
};

const mockLeaderboard = generateMockLeaderboard();

// Firestore mock
export const firestore = {
  products: {
    getAll: async (): Promise<Product[]> => {
      return mockProducts;
    },
    
    getById: async (id: string): Promise<Product | null> => {
      const product = mockProducts.find(p => p.id === id);
      return product || null;
    },
    
    getByCategory: async (category: string): Promise<Product[]> => {
      return mockProducts.filter(p => p.category === category);
    },
    
    getFeatured: async (): Promise<Product[]> => {
      return mockProducts.filter(p => p.featured);
    },
    
    add: async (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
      const newProduct: Product = {
        ...product,
        id: uuidv4(),
        createdAt: new Date()
      };
      mockProducts.push(newProduct);
      return newProduct;
    },
    
    update: async (id: string, data: Partial<Product>): Promise<Product> => {
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Product not found');
      
      mockProducts[index] = { ...mockProducts[index], ...data };
      return mockProducts[index];
    },
    
    delete: async (id: string): Promise<void> => {
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Product not found');
      
      mockProducts.splice(index, 1);
    }
  },
  
  orders: {
    getByUserId: async (userId: string): Promise<Order[]> => {
      return mockOrders.filter(o => o.userId === userId);
    },
    
    getById: async (id: string): Promise<Order | null> => {
      const order = mockOrders.find(o => o.id === id);
      return order || null;
    },
    
    create: async (order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
      const newOrder: Order = {
        ...order,
        id: uuidv4(),
        createdAt: new Date()
      };
      mockOrders.push(newOrder);
      
      // Update user's carbon footprint
      if (currentUser) {
        currentUser.carbonFootprint += newOrder.totalCarbonFootprint;
        currentUser.points += Math.floor(newOrder.totalAmount / 10);
        localStorage.setItem('ecotrade_user', JSON.stringify(currentUser));
      }
      
      return newOrder;
    },
    
    updateStatus: async (id: string, status: string): Promise<Order> => {
      const index = mockOrders.findIndex(o => o.id === id);
      if (index === -1) throw new Error('Order not found');
      
      mockOrders[index].status = status as any;
      return mockOrders[index];
    }
  },
  
  leaderboard: {
    getEntries: async (): Promise<LeaderboardEntry[]> => {
      return mockLeaderboard.sort((a, b) => b.points - a.points);
    },
    
    updateUserScore: async (userId: string, points: number, carbonSaved: number): Promise<void> => {
      const index = mockLeaderboard.findIndex(entry => entry.userId === userId);
      if (index !== -1) {
        mockLeaderboard[index].points += points;
        mockLeaderboard[index].carbonSaved += carbonSaved;
      }
    }
  }
};

// Mock Razorpay integration
export const payment = {
  createOrder: async (amount: number): Promise<{ id: string, amount: number }> => {
    return {
      id: `order_${uuidv4().substring(0, 8)}`,
      amount
    };
  },
  
  verifyPayment: async (
    paymentId: string, 
    orderId: string, 
    signature: string
  ): Promise<boolean> => {
    // In a real implementation, this would verify the signature with Razorpay
    return true;
  }
};