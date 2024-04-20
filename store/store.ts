import { create } from "zustand";
import { createEcommerceAppSlice } from "./slices";
import { EcommerceAppSliceTypes } from "./slices/ecommerce-app-slice";

export const useAppStore = create<EcommerceAppSliceTypes>()((...a) => ({
  ...createEcommerceAppSlice(...a),
}));
