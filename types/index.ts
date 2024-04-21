export interface ProductTypes {
    id: string;
    productName: string;
    price: number;
    discount: number;
    description: string;
    images?: (string)[] | null;
    tags?: (string)[] | null;
    category: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
  }
  