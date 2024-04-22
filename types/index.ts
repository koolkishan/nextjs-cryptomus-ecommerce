export interface ProductTypes {
    id: string;
    productName: string;
    price: number;
    discount: number;
    description: string;
    images?: (string)[] | null;
    tags?: (string)[] | null;
    categoryId: string;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
  }

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
