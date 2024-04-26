// export interface ProductTypes {
//     id: string;
//     productName: string;
//     price: number;
//     discount: number;
//     description: string;
//     images?: (string)[] | null;
//     tags?: (string)[] | null;
//     categoryId: string;
//     quantity: number;
//     createdAt?: Date;
//     updatedAt?: Date;
//   }

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
  category: {
    id: string;
    categoryName: string;
  };
  carts: any[]; // Assuming this will contain cart data, you can define a type for carts if needed
  wishlist?: {
    id: string;
    userId: string;
    createdAt: Date;
  }[];
};


export interface CategoryTypes {
  id:string;
  categoryName: string;
}
  
export interface CategoryWithProductCount {
  id: string;
  categoryName: string;
  products?: (ProductsEntity)[] | null;
}
export interface ProductsEntity {
  id: string;
}


export interface UserAndProfileTypes {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  profile?: (ProfileEntity)[] | null;
}
export interface ProfileEntity {
  id: string;
  userId: string;
  addresses?: (null)[] | null;
  mobileNo?: null;
}
