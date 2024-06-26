// import { ProductTypes } from "@/types";
// import { Address, User } from "@prisma/client";
import {
  CategoryTypes,
  ProductTypes,
  UserAndProfileTypes,
  orderTypes,
} from "@/types";
import { User } from "@prisma/client";
import { StateCreator } from "zustand";
export interface EcommerceAppSliceTypes {
  // admin
  collapsSidbar?: boolean;
  setCollapsSidbar: (data: boolean) => void;
  productsData: ProductTypes[] | [];
  setProductsData: (data: ProductTypes[]) => void;
  toggleSheet?: boolean;
  setToggleSheet: (data: boolean) => void;
  openModal: boolean;
  setOpenModal: (data: boolean) => void;
  viewingProductId: string;
  setviewingProductId: (data: string) => void;
  categoriesData: CategoryTypes[] | [];
  setCategoriesData: (data: CategoryTypes[]) => void;
  editCategory: CategoryTypes | null;
  setEditCategory: (data: CategoryTypes) => void;
  viewingProduct: ProductTypes | undefined;
  setViewingProduct: (data: ProductTypes) => void;
  searchProducts: ProductTypes[] | [];
  setSearchProducts: (data: ProductTypes[]) => void;
  viewingOrderId: string;
  setViewingOrderId: (data: string) => void;
  orders: orderTypes[] | [];
  setOrders: (data: orderTypes[]) => void;
  viewingCategoryId: string;
  setViewingCategoryId: (data: string) => void;

  // user
  productCategory: string;
  setProductCategory: (data: string) => void;
  userProductsData: ProductTypes[] | [];
  setUserProductsData: (data: ProductTypes[]) => void;
  allCategories: CategoryTypes[] | [];
  setAllCategories: (data: CategoryTypes[]) => void;
  categoryProducts: ProductTypes[] | [];
  setCategoryProducts: (data: ProductTypes[]) => void;
  filterProducts: ProductTypes[] | [];
  setFilterProducts: (data: ProductTypes[]) => void;
  userAndProfile: UserAndProfileTypes | undefined;
  setUserAndProfile: (data: UserAndProfileTypes) => void;
  product: ProductTypes | undefined;
  setProduct: (data: ProductTypes) => void;
  sameCategoryProduct: ProductTypes[] | [];
  setSameCategoryProduct: (data: ProductTypes[]) => void;
}
const createEcommerceAppSlice: StateCreator<EcommerceAppSliceTypes> = (
  set,
  get
) => ({
  // admin
  collapsSidbar: false,
  setCollapsSidbar: (open: boolean) => {
    set({ collapsSidbar: open });
  },
  productsData: [],
  setProductsData: (data: ProductTypes[]) => {
    set({ productsData: data });
  },
  toggleSheet: false,
  setToggleSheet: (open: boolean) => {
    set({ toggleSheet: open });
  },
  openModal: false,
  setOpenModal: (open: boolean) => {
    set({ openModal: open });
  },
  viewingProductId: "",
  setviewingProductId: (data: string) => {
    set({ viewingProductId: data });
  },
  viewingProduct: undefined,
  setViewingProduct: (data: ProductTypes) => {
    set({ viewingProduct: data });
  },
  categoriesData: [],
  setCategoriesData: (data: CategoryTypes[]) => {
    set({ categoriesData: data });
  },
  editCategory: null,
  setEditCategory: (data: CategoryTypes) => {
    set({ editCategory: data });
  },
  viewingOrderId: "",
  setViewingOrderId: (data: string) => {
    set({ viewingOrderId: data });
  },
  orders: [],
  setOrders: (data: orderTypes[]) => {
    set({ orders: data });
  },
  viewingCategoryId: "",
  setViewingCategoryId: (data: string) => {
    set({ viewingCategoryId: data });
  },

  // user
  productCategory: "",
  setProductCategory: (data: string) => {
    set({ productCategory: data });
  },
  userProductsData: [],
  setUserProductsData: (data: ProductTypes[]) => {
    set({ userProductsData: data });
  },
  allCategories: [],
  setAllCategories: (data: CategoryTypes[]) => {
    set({ allCategories: data });
  },
  categoryProducts: [],
  setCategoryProducts: (data: ProductTypes[]) => {
    set({ categoryProducts: data });
  },
  filterProducts: [],
  setFilterProducts: (data: ProductTypes[]) => {
    set({ filterProducts: data });
  },
  userAndProfile: undefined,
  setUserAndProfile: (data: UserAndProfileTypes) => {
    set({ userAndProfile: data });
  },
  searchProducts: [],
  setSearchProducts: (data: ProductTypes[]) => {
    set({ searchProducts: data });
  },
  product: undefined,
  setProduct: (data: ProductTypes) => {
    set({ product: data });
  },
  sameCategoryProduct: [],
  setSameCategoryProduct: (data: ProductTypes[]) => {
    set({ sameCategoryProduct: data });
  },
});

export { createEcommerceAppSlice };
