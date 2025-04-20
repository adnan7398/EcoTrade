import { create } from 'zustand';
import { Product, User, CartItem } from '../types';

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalAmount: () => number;
  getTotalCarbonFootprint: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addToCart: (product: Product, quantity = 1) => {
    set((state) => {
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return {
          items: state.items.map(item => 
            item.product.id === product.id 
              ? { ...item, quantity: item.quantity + quantity } 
              : item
          ),
        };
      }
      
      return {
        items: [...state.items, { product, quantity }],
      };
    });
  },
  
  removeFromCart: (productId: string) => {
    set((state) => ({
      items: state.items.filter(item => item.product.id !== productId),
    }));
  },
  
  updateQuantity: (productId: string, quantity: number) => {
    set((state) => ({
      items: state.items.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: Math.max(1, quantity) } 
          : item
      ),
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  
  getTotalAmount: () => {
    return get().items.reduce(
      (total, item) => total + (item.product.price * item.quantity), 
      0
    );
  },
  
  getTotalCarbonFootprint: () => {
    return get().items.reduce(
      (total, item) => total + (item.product.carbonFootprint * item.quantity), 
      0
    );
  },
}));

interface AuthStore {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));