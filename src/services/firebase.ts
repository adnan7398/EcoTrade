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
  // Predefined sustainable products with matching details
  const sustainableProducts: Omit<Product, 'id' | 'createdAt'>[] = [
    {
      name: "Recycled Plastic Tote Bag",
      description: "A stylish, durable tote bag made from 100% recycled plastic bottles, perfect for everyday use, grocery shopping, or as a sustainable fashion statement. Available in earthy tones like sage green and navy blue.",
      price: 25.00,
      images: [
        "https://images.pexels.com/photos/5717826/pexels-photo-5717826.jpeg?auto=compress&cs=tinysrgb&w=800", // Woman with tote bag in park
        "https://images.pexels.com/photos/5717829/pexels-photo-5717829.jpeg?auto=compress&cs=tinysrgb&w=800", // Close-up of tote bag with 100% recycled tag
      ],
      category: "Fashion",
      carbonFootprint: 2.5,
      materials: ["Recycled Plastic Bottles", "Eco-friendly Dyes"],
      sustainabilityScore: 90,
      stock: 45,
      featured: true
    },
    {
      name: "Upcycled Denim Jacket",
      description: "A trendy denim jacket crafted from repurposed vintage jeans, featuring unique patchwork designs. Each piece is one-of-a-kind, promoting circular fashion.",
      price: 65.00,
      images: [
        "https://images.pexels.com/photos/2119935/pexels-photo-2119935.jpeg?auto=compress&cs=tinysrgb&w=800", // Person in denim jacket in urban setting
        "https://images.pexels.com/photos/6843278/pexels-photo-6843278.jpeg?auto=compress&cs=tinysrgb&w=800", // Close-up of denim jacket detail
      ],
      category: "Fashion",
      carbonFootprint: 15.0,
      materials: ["Upcycled Denim", "Recycled Thread"],
      sustainabilityScore: 85,
      stock: 25,
      featured: true
    },
    {
      name: "Recycled Glass Candle Holder",
      description: "A handcrafted candle holder made from recycled glass, ideal for home decor. Its translucent green hue adds a touch of elegance while promoting sustainability.",
      price: 18.00,
      images: [
        "https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg?auto=compress&cs=tinysrgb&w=800", // Green glass candle holder on wooden table
        "https://images.pexels.com/photos/7955268/pexels-photo-7955268.jpeg?auto=compress&cs=tinysrgb&w=800", // Recycled glass texture close-up
      ],
      category: "Home Decor",
      carbonFootprint: 0.8,
      materials: ["Recycled Glass", "Natural Wax"],
      sustainabilityScore: 92,
      stock: 60,
      featured: true
    },
    {
      name: "Reclaimed Wood Coffee Table",
      description: "A minimalist coffee table made from reclaimed wood sourced from old furniture and construction waste. Its natural grain and rustic finish make it a statement piece.",
      price: 150.00,
      images: [
        "https://images.pexels.com/photos/4857775/pexels-photo-4857775.jpeg?auto=compress&cs=tinysrgb&w=800", // Coffee table in modern living room setting
        "https://images.pexels.com/photos/4846461/pexels-photo-4846461.jpeg?auto=compress&cs=tinysrgb&w=800", // Wood grain detail close-up
      ],
      category: "Furniture",
      carbonFootprint: 50.0,
      materials: ["Reclaimed Wood", "Non-toxic Sealant"],
      sustainabilityScore: 88,
      stock: 15,
      featured: true
    },
    {
      name: "Recycled Paper Notebook",
      description: "A compact notebook made from 100% recycled paper, with a cover crafted from upcycled fabric scraps. Perfect for journaling or note-taking with a sustainable twist.",
      price: 12.00,
      images: [
        "https://images.pexels.com/photos/6157229/pexels-photo-6157229.jpeg?auto=compress&cs=tinysrgb&w=800", // Student writing in notebook at cafe
        "https://images.pexels.com/photos/8241135/pexels-photo-8241135.jpeg?auto=compress&cs=tinysrgb&w=800", // Close-up of recycled paper notebook
      ],
      category: "Accessories",
      carbonFootprint: 0.5,
      materials: ["Recycled Paper", "Upcycled Fabric"],
      sustainabilityScore: 95,
      stock: 100,
      featured: true
    },
    {
      name: "Organic Cotton Bedding Set",
      description: "Sleep sustainably with this GOTS-certified organic cotton bedding set. Free from harmful chemicals and pesticides, providing healthier sleep and better for the planet.",
      price: 129.95,
      images: [
        "https://images.pexels.com/photos/1267438/pexels-photo-1267438.jpeg?auto=compress&cs=tinysrgb&w=800", // Bedding set
        "https://images.pexels.com/photos/6316065/pexels-photo-6316065.jpeg?auto=compress&cs=tinysrgb&w=800", // Bedroom with cotton sheets
      ],
      category: "Home Decor",
      carbonFootprint: 2.5,
      materials: ["Organic Cotton"],
      sustainabilityScore: 88,
      stock: 30,
      featured: false
    },
    {
      name: "Cork Yoga Mat",
      description: "Naturally antimicrobial cork yoga mat with rubber base. Provides excellent grip that actually improves with moisture. Eco-friendly, biodegradable, and PVC-free.",
      price: 85.00,
      images: [
        "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800", // Cork yoga mat
        "https://images.pexels.com/photos/4498515/pexels-photo-4498515.jpeg?auto=compress&cs=tinysrgb&w=800", // Person using yoga mat
      ],
      category: "Accessories",
      carbonFootprint: 1.8,
      materials: ["Cork", "Natural Rubber"],
      sustainabilityScore: 85,
      stock: 25,
      featured: false
    }
  ];
  
  // Add these predefined products
  const products: Product[] = sustainableProducts.map(product => ({
    ...product,
    id: uuidv4(),
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
  }));
  
  // Categories and materials for additional random products
  const categories = ['Furniture', 'Fashion', 'Home Decor', 'Electronics', 'Accessories'];
  const materials = ['Recycled Plastic', 'Upcycled Wood', 'Reclaimed Metal', 'Organic Cotton', 'Recycled Paper'];
  
  // Real Pexels image IDs that actually exist
  const validPexelsIds = [
    1108572, 1470168, 4068314, 2249063, 4050334, 793759, 
    1266302, 276583, 1148955, 325153, 982865, 1342529,
    1454806, 1279813, 6044266, 3014856, 925415, 1020016, 
    2850487, 3672770, 4050290, 2365572, 2383010, 2962144
  ];
  
  // Generate additional random products to reach a total of 24
  const additionalProducts = Array(24 - products.length).fill(null).map((_, index) => {
    // Create themed product categories with matching images
    const ecoProducts = [
      {
        category: "Fashion",
        namePrefix: "Sustainable",
        item: "Hemp Backpack",
        description: "Durable hemp backpack with organic cotton lining, perfect for everyday use. Features multiple pockets and adjustable straps.",
        imageUrl: "https://images.pexels.com/photos/1546003/pexels-photo-1546003.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        category: "Home Decor",
        namePrefix: "Eco-friendly",
        item: "Recycled Glass Vase",
        description: "Handcrafted vase made from recycled glass bottles. Each piece is unique and helps reduce glass waste.",
        imageUrl: "https://images.pexels.com/photos/1838551/pexels-photo-1838551.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        category: "Accessories",
        namePrefix: "Upcycled",
        item: "Wooden Watch",
        description: "Elegant timepiece crafted from reclaimed wood. Features Japanese movement and a soft vegan leather strap.",
        imageUrl: "https://images.pexels.com/photos/9978694/pexels-photo-9978694.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        category: "Furniture",
        namePrefix: "Reclaimed",
        item: "Bamboo Side Table",
        description: "Minimalist side table made from sustainable bamboo. Perfect for small spaces and eco-conscious homes.",
        imageUrl: "https://images.pexels.com/photos/4112600/pexels-photo-4112600.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        category: "Electronics",
        namePrefix: "Energy-efficient",
        item: "Bamboo Bluetooth Speaker",
        description: "Wireless speaker with bamboo casing that produces rich, natural sound while using less plastic than conventional speakers.",
        imageUrl: "https://images.pexels.com/photos/6778216/pexels-photo-6778216.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        category: "Home Decor",
        namePrefix: "Natural",
        item: "Coconut Bowl Set",
        description: "Set of 4 handcrafted bowls made from reclaimed coconut shells. Food-safe and perfect for açaí bowls, smoothies, or decor.",
        imageUrl: "https://images.pexels.com/photos/7195014/pexels-photo-7195014.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        category: "Fashion",
        namePrefix: "Organic",
        item: "Cotton T-shirt",
        description: "Ultra-soft t-shirt made from 100% GOTS-certified organic cotton. Ethically manufactured with natural dyes.",
        imageUrl: "https://images.pexels.com/photos/5698853/pexels-photo-5698853.jpeg?auto=compress&cs=tinysrgb&w=800"
      },
      {
        category: "Accessories",
        namePrefix: "Biodegradable",
        item: "Phone Case",
        description: "Protective phone case made from plant-based materials that will naturally biodegrade at end-of-life.",
        imageUrl: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
    ];
    
    const productTemplate = ecoProducts[index % ecoProducts.length];
    
    return {
      id: uuidv4(),
      name: `${productTemplate.namePrefix} ${productTemplate.item}`,
      description: productTemplate.description,
      price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
      images: [
        productTemplate.imageUrl,
        `https://images.pexels.com/photos/${validPexelsIds[(index + 10) % validPexelsIds.length]}/pexels-photo-${validPexelsIds[(index + 10) % validPexelsIds.length]}.jpeg?auto=compress&cs=tinysrgb&w=800`,
      ],
      category: productTemplate.category,
      carbonFootprint: parseFloat((Math.random() * 10).toFixed(2)),
      materials: [
        materials[Math.floor(Math.random() * materials.length)],
        materials[Math.floor(Math.random() * materials.length)],
      ],
      sustainabilityScore: 60 + Math.floor(Math.random() * 35), // Higher sustainability scores
      stock: Math.floor(Math.random() * 100) + 1,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
      featured: false
    };
  });
  
  return [...products, ...additionalProducts];
};

const mockProducts = generateMockProducts();

// Generate mock orders
const mockOrders: Order[] = [];
interface LeaderboardEntry {
  userId: string;
  displayName: string;
  photoURL?: string;
  points: number;
  carbonSaved: number;
}

const collegeStudents = [
  { name: "Ankit Sharma", photoURL: "https://randomuser.me/api/portraits/men/11.jpg" },
  { name: "Riya Verma", photoURL: "https://randomuser.me/api/portraits/women/12.jpg" },
  { name: "Vikas Mehta", photoURL: "https://randomuser.me/api/portraits/men/13.jpg" },
  { name: "Pooja Gupta", photoURL: "https://randomuser.me/api/portraits/women/14.jpg" },
  { name: "Neeraj Kumar", photoURL: "https://randomuser.me/api/portraits/men/15.jpg" },
  { name: "Sonal Tiwari", photoURL: "https://randomuser.me/api/portraits/women/16.jpg" },
  { name: "Aman Joshi", photoURL: "https://randomuser.me/api/portraits/men/17.jpg" },
  { name: "Kriti Singh", photoURL: "https://randomuser.me/api/portraits/women/18.jpg" },
  { name: "Rohit Yadav", photoURL: "https://randomuser.me/api/portraits/men/19.jpg" },
  { name: "Waqas Anwar", photoURL: "https://randomuser.me/api/portraits/women/20.jpg" }
];

const generateMockLeaderboard = (): LeaderboardEntry[] => {
  return collegeStudents.map((student) => ({
    userId: uuidv4(),
    displayName: student.name,
    photoURL: student.photoURL,
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