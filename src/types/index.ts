export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isAdmin: boolean;
  carbonFootprint: number;
  points: number;
  joinedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  carbonFootprint: number;
  materials: string[];
  sustainabilityScore: number;
  stock: number;
  createdAt: Date;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  totalCarbonFootprint: number;
  paymentId?: string;
  status: OrderStatus;
  shippingAddress: Address;
  createdAt: Date;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  photoURL?: string;
  points: number;
  carbonSaved: number;
}

export interface SustainabilityTip {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
}

export interface CarbonStat {
  date: Date;
  value: number;
}

export interface UserStats {
  totalOrders: number;
  totalSpent: number;
  totalCarbonFootprint: number;
  carbonOverTime: CarbonStat[];
}