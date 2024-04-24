// import { ProductTypes } from "@/types";
// import { Address, User } from "@prisma/client";
import { CategoryTypes, ProductTypes } from "@/types";
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
  categoriesData: [],
  setCategoriesData: (data: CategoryTypes[]) => {
    set({ categoriesData: data });
  },
  editCategory: null,
  setEditCategory: (data: CategoryTypes) => {
    set({ editCategory: data });
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
  setFilterProducts:(data: ProductTypes[]) => { 
    set({ filterProducts: data });
  }
});

export { createEcommerceAppSlice };
