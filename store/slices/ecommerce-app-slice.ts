// import { ProductTypes } from "@/types";
// import { Address, User } from "@prisma/client";
import { ProductTypes } from "@/types";
import { StateCreator } from "zustand";
export interface EcommerceAppSliceTypes {
  collapsSidbar?:boolean;
  setCollapsSidbar: (data: boolean) => void;
  productsData: ProductTypes[] | [];
  setProductsData: (data: ProductTypes[]) => void;
  toggleSheet?: boolean;
  setToggleSheet: (data: boolean) => void;
  openModal: boolean;
  setOpenModal: (data: boolean) => void;
  viewingProductId: string;
  setviewingProductId: (data: string) => void;

}
const createEcommerceAppSlice: StateCreator<EcommerceAppSliceTypes> = (set, get) => ({
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
  viewingProductId:'',
  setviewingProductId: (data: string) => {
    set({ viewingProductId: data });
  },
});

export { createEcommerceAppSlice };
