"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAppStore } from "@/store";
import Image from "next/image";
import { Button } from "../ui/button";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addProductToWishList, cn } from "@/lib/utils";
import { ProductTypes } from "@/types";
import { Products } from "@prisma/client";
import { useAuthUser } from "@/hooks/useAuthUser";
import { getProductsFormCategoryId } from "@/data/product";
import { searchProductsByTagAction } from "@/actions/search-product-by-tag-action";
import { removeWishListAction } from "@/actions/remove-wishlist-action";
import { createOrderAndOrderProducts } from "@/actions/create-order";
import { toast } from "sonner";
const ITEMS_PER_PAGE = 5;

interface VerticalProductListProps {
  searchProducts?: ProductTypes[];
  categoryFilter: boolean;
  searchFilter: boolean;
  tag?: string;
}
const VerticalProductList = ({
  categoryFilter,
  searchFilter,
  tag,
}: VerticalProductListProps) => {
  const user = useAuthUser();
  const {
    categoryProducts,
    filterProducts,
    setCategoryProducts,
    setSearchProducts,
    searchProducts,
  } = useAppStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [displayProductList, setDisplayProductList] = useState<
    ProductTypes[] | []
  >([]);

  useEffect(() => {
    if (filterProducts.length > 0 && categoryFilter) {
      setDisplayProductList(filterProducts);
    } else {
      if (categoryProducts.length) {
        setDisplayProductList(categoryProducts);
      }
    }
  }, [categoryProducts, filterProducts, categoryFilter, displayProductList]);

  useEffect(() => {
    if (filterProducts.length > 0 && searchFilter) {
      setDisplayProductList(filterProducts);
    } else {
      if (searchProducts) {
        setDisplayProductList(searchProducts);
      }
    }
  }, [searchProducts, searchFilter, filterProducts]);

  const handleWishList = async (productId: string, categoryId: string) => {
    if (user && user.email) {
      if (categoryFilter) {
        const response = await addProductToWishList(user.email, productId);
        if (response?.success) {
          const productResponse = (await getProductsFormCategoryId(
            categoryId
          )) as ProductTypes[];
          if (productResponse && productResponse.length > 0) {
            setCategoryProducts(productResponse);
          }
        }
        toast.success("Product added to wishlist.");
      } else {
        const response = await addProductToWishList(user.email, productId);
        if (response?.success) {
          if (tag) {
            const productResponse = (await searchProductsByTagAction(
              tag
            )) as ProductTypes[];
            if (productResponse && productResponse.length > 0) {
              setSearchProducts(productResponse);
            }
          }
        }
        toast.success("Product added to wishlist.");
      }
    } else {
      router.push("/auth");
      toast.error("Please sign in to proceed.");
    }
  };

  const handleRemoveWishList = async (
    productId: string,
    categoryId: string
  ) => {
    if (user && user.email) {
      if (categoryFilter) {
        const response = await removeWishListAction(user.email, productId);
        if (response?.success) {
          const productResponse = (await getProductsFormCategoryId(
            categoryId
          )) as ProductTypes[];
          if (productResponse && productResponse.length > 0) {
            setCategoryProducts(productResponse);
          }
        }
        toast.success("Product removed from wishlist.");

      } else {
        const response = await removeWishListAction(user.email, productId);
        if (response?.success) {
          if (tag) {
            const productResponse = (await searchProductsByTagAction(
              tag
            )) as ProductTypes[];
            if (productResponse && productResponse.length > 0) {
              setSearchProducts(productResponse);
            }
            
          }
        }
        toast.success("Product removed from wishlist.");
      }
    } else {
      router.push("/auth");
      toast.error("Please sign in to proceed.");
    }
  };
  const totalPages = Math.ceil(displayProductList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(
    startIndex + ITEMS_PER_PAGE,
    displayProductList.length
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const router = useRouter();

  const handleBuy = async (product: ProductTypes) => {
    if (product && user && user.email && product?.price) {
      const products = [
        {
          productId: product.id,
          quantity: 1,
        },
      ];
      const totalPrice =
        product?.price - (product?.price * product.discount) / 100;
      const totalDiscount = (product?.price * product.discount) / 100;
      const paymentUrl = await createOrderAndOrderProducts(
        user.email,
        products,
        totalPrice,
        totalDiscount
      );
      if (!paymentUrl) {
        return;
      }
      if (paymentUrl && window && window.location) {
        window.location.href = paymentUrl;
      }
    } else {
      router.push("/auth");
      toast.error("Please sign in to proceed.");
    }
  };
  return (
    <div className="">
      {displayProductList &&
        displayProductList.length > 0 &&
        displayProductList.slice(startIndex, endIndex).map((product) => (
          <div
            key={product.id}
            className="cursor-pointer grid grid-cols-5 bg-secondary-white m-4 rounded-2xl shadow-[2px_2px_2px_2px_rgba(0,0,0,0.03)]"
          >
            <div key={product.id} className="m-4 ">
              {product && product.images && (
                <div className=" relative  h-[200px]">
                  <Image
                    src={product?.images[0]}
                    alt={product.productName}
                    className="bg-secondary-white rounded-md py-2"
                    layout="fill"
                    loading="lazy"
                    objectFit="contain"
                  />
                </div>
              )}
            </div>
            <div
              className="col-span-3 my-4 mr-4"
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <p className="mb-4 font-bold ">{product?.productName}</p>
              <p className="line-clamp-3 text-custom-font text-justify">
                {product?.description}
              </p>
            </div>
            <div className="m-4">
              <div
                className="flex items-center gap-2"
                onClick={() => router.push(`/products/${product.id}`)}
              >
                <p>
                  $
                  {Math.round(
                    product.price - (product?.price * product?.discount) / 100
                  )}
                </p>
                <p className="text-custom-font line-through text-sm">
                  ${product?.price}
                </p>
              </div>
              <div className="mb-4 inline-block text-xs font-bold py-1  text-emerald-500">
                <p>{product?.discount}% Off</p>
              </div>
              <div className="flex gap-2 items-center ">
                <Button
                  className="px-6 bg-secondary-blue hover:bg-secondary-blue font-bold"
                  onClick={() => handleBuy(product)}
                >
                  Buy now
                </Button>

                <p
                  className="text-secondary-blue"
                  // onClick={() => handleWishList(product.id, product.categoryId)}
                >
                  {product.wishlist && product.wishlist?.length > 0 && user ? (
                    <IoHeart
                      size={22}
                      className="text-secondary-blue"
                      onClick={() =>
                        handleRemoveWishList(product.id, product.categoryId)
                      }
                    />
                  ) : (
                    <IoHeartOutline
                      size={22}
                      className="text-secondary-blue"
                      onClick={() =>
                        handleWishList(product.id, product.categoryId)
                      }
                    />
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      <Pagination className="flex justify-end my-4 mr-4">
        <PaginationContent className="text-secondary-blue">
          <PaginationItem>
            <PaginationPrevious
              className="hover:bg-secondary-blue hover:text-primary-text"
              href="#"
              onClick={() =>
                handlePageChange(
                  currentPage > 1 ? currentPage - 1 : currentPage
                )
              }
            />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                className={cn(
                  "hover:bg-secondary-blue hover:text-primary-text",
                  currentPage === index + 1
                    ? "bg-secondary-blue text-white"
                    : ""
                )}
                href="#"
                onClick={() => handlePageChange(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className="hover:bg-secondary-blue hover:text-primary-text"
              href="#"
              onClick={() =>
                handlePageChange(
                  currentPage < totalPages ? currentPage + 1 : currentPage
                )
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default VerticalProductList;
