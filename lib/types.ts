export type Role = "customer" | "vendor" | "admin"
export type MenuCategory =
  | "classic"
  | "vegetarian"
  | "meat-lovers"
  | "specialty"
  | "sides"
  | "beverages"
export type MenuStatus = "pending" | "approved" | "rejected" | "inactive"
export type OrderStatus = "pending" | "accepted" | "rejected" | "cancelled"

export interface User {
  id: string
  name: string
  email: string
  image: string
  role: Role
  authProvider?: "local" | "google"
  businessName: string
  isBlocked: boolean
  subscriptionPlan: "free" | "premium"
  subscriptionExpiresAt: string | null
  isPremium?: boolean
  createdAt: string
}

export interface MenuItem {
  id: string
  name: string
  itemName?: string
  category: MenuCategory
  categoryLabel: string
  description: string
  longDescription: string
  price: number
  location?: string
  images: string[]
  status: MenuStatus
  isAvailable: boolean
  isFeatured: boolean
  rating: number
  reviewCount: number
  deliveryTime: string
  deliveryFee: number
  isVegetarian: boolean
  isSpicy: boolean
  isGlutenFree: boolean
  doughFermentation: string
  ovenTemperature: string
  ingredients: string[]
  nutritionalInfo: {
    calories: number
    protein: string
    carbs: string
    fat: string
  }
  vendorId: string
  vendorName: string
  vendorIsPremium?: boolean
  vendorLocation: string
  vendorAddress: string
}

export interface Order {
  id: string
  status: OrderStatus
  quantity: number
  unitPrice: number
  totalPrice: number
  deliveryDate: string
  deliveryAddress: string
  message: string
  createdAt: string
  updatedAt: string
  item: {
    id: string
    name: string
    images: string[]
    price: number
    location: string
    category: MenuCategory
  } | null
  vendor: { id: string; name: string; image: string; email: string } | null
  customer: { id: string; name: string; email: string; image: string } | null
}

export interface Review {
  id: string
  rating: number
  comment: string
  createdAt: string
  updatedAt: string
  customer: { id: string; name: string; image: string | null } | null
}

export interface ApiList<T> {
  success: boolean
  count: number
  items?: T[]
  orders?: T[]
  reviews?: T[]
}

export interface Transaction {
  id: string
  vendor: { id: string; name: string; email: string; image: string } | null
  plan: string
  amount: number
  currency: string
  status: "succeeded" | "pending" | "failed"
  stripeSessionId: string
  stripeSubscriptionId: string
  createdAt: string
}

export interface DashboardSummary {
  stats?: Record<string, number>
  recentOrders?: Order[]
  [key: string]: unknown
}
