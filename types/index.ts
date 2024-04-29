export interface ProductTypes {
  id: string;
  productName: string;
  price: number;
  discount: number;
  description: string;
  images: string[];
  tags: string[];
  categoryId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  category?: {
    id: string;
    categoryName: string;
  };
  carts?: any[];
  wishlist?: {
    id: string;
    userId: string;
    createdAt: Date;
  }[];
}

export interface CartTypes {
  id: string;
  userId: string;
  createdAt: Date;
  products?: CartProductTypes[] | [];
}
export interface CartProductTypes {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: ProductTypes;
}
export interface CategoryTypes {
  id: string;
  categoryName: string;
}

export interface orderTypes {
  id: string;
  userId: string;
  createdAt: Date;
  totalPrice: number;
  totalDiscount: number;
  orderStatus: string;
  paymentStatus: string;
  products: OrderProductsType[];
  user?: UserAndProfileTypes;
}
export interface OrderProductsType {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  product: ProductTypes;
}

export interface CtegoryWithProduct {
  id: string;
  categoryName: string;
  products?: ProductTypes[] | [];
}
export interface CategoryWithProductCount {
  id: string;
  categoryName: string;
  products?: ProductsEntity[] | null;
}
export interface ProductsEntity {
  id: string;
}
export interface UserAndProfileTypes {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
  profile?: ProfileEntity[] | null;
}
export interface ProfileEntity {
  id: string;
  userId: string;
  addresses?: string[] | null;
  mobileNo?: string | null;
}

export interface AdminTypes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: boolean;
  roles?: string[] | null;
}
