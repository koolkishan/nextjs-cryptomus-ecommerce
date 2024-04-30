import { getUserByEmailAction } from "@/actions/get-user-by-email-action";
import { wishListAction } from "@/actions/add-wishlist-action";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  CategoryWithProductCount,
  CtegoryWithProduct,
  ProductTypes,
  orderTypes,
} from "@/types";
import { Slide } from "react-toastify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function addProductToWishList(user: any, productId: string) {
  const dbUser = await getUserByEmailAction(user.email);
  if (dbUser) {
    const response = await wishListAction(dbUser?.id, productId);
    return response;
  }
}

export function makePieChartOptions(orders: orderTypes[]) {
  let pendingOrders = 0;
  let canceledOrders = 0;
  let deliveredOrders = 0;

  orders.forEach((order) => {
    switch (order.orderStatus.toLowerCase()) {
      case "pending":
        pendingOrders++;
        break;
      case "cancel":
        canceledOrders++;
        break;
      case "delivered":
        deliveredOrders++;
        break;
      default:
        break;
    }
  });
  const totalOrders = pendingOrders + canceledOrders + deliveredOrders;
  const pendingPercentage = (pendingOrders / totalOrders) * 100;
  const canceledPercentage = (canceledOrders / totalOrders) * 100;
  const deliveredPercentage = (deliveredOrders / totalOrders) * 100;

  return {
    pendingPercentage,
    canceledPercentage,
    deliveredPercentage,
  };
}

export const makeBarchartOptions = (
  allCategoryWithProduct: CtegoryWithProduct[]
) => {
  const makeBarchartOptions = allCategoryWithProduct.map((category) => {
    if (category?.products) {
      const totalProducts = category?.products.length;
      const avgPrice = calculateAvgPrice(category.products);
      const avgDiscountInpercentage = calculateAvgDiscount(category.products);
      const avgDiscountRupees = (avgDiscountInpercentage / 100) * avgPrice;

      return {
        categoryName: category.categoryName,
        totalProducts,
        avgPrice,
        avgDiscountRupees,
      };
    }
    return;
  });
  const categories: string[] = [];
  const totalProducts: number[] = [];
  const avgPrices: number[] = [];
  const avgDiscounts: number[] = [];

  makeBarchartOptions.forEach((item) => {
    if (item) {
      categories.push(item.categoryName);
      totalProducts.push(item.totalProducts);
      avgPrices.push(item.avgPrice);
      avgDiscounts.push(item.avgDiscountRupees);
    }
  });

  return {
    categories,
    totalProducts,
    avgPrices,
    avgDiscounts,
  };
};
const calculateAvgPrice = (arr: ProductTypes[]) => {
  const sum = arr.reduce((total, item) => total + item[`price`], 0);
  return sum / arr.length;
};
const calculateAvgDiscount = (arr: ProductTypes[]) => {
  const sum = arr.reduce((total, item) => total + item[`discount`], 0);
  return sum / arr.length;
};

export const getTotalIncomeAndDeliveredOrder = (orders: orderTypes[] | []) => {
  let income = 0;
  let deliveredOrder = 0;
  let uniqueCustomers: string[] | [] = [];
  for (let order of orders) {
    if (order.user) {
      const userId = order.userId;
      // @ts-ignore
      if (!uniqueCustomers.includes(userId)) {
        // @ts-ignore
        uniqueCustomers.push(userId);
      }
    }
    if (order.orderStatus.toLocaleLowerCase() === "delivered".toLowerCase()) {
      for (let p of order.products) {
        const calculatedDiscountedPrice =
          p.product.price - (p.product.price * p.product.discount) / 100;
        deliveredOrder += 1;
        income += Math.round(calculatedDiscountedPrice);
      }
    }
  }
  return { income, deliveredOrder, uniqueCustomers };
};
