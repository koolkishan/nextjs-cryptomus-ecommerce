"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAppStore } from "@/store";
import Image from "next/image";
import { Button } from "../ui/button";
import { IoHeartOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ProductTypes } from "@/types";
const ITEMS_PER_PAGE = 5;

const VerticalProductList = () => {
  const { categoryProducts, filterProducts } = useAppStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [displayProductList, setDisplayProductList] = useState<
    ProductTypes[] | []
  >([]);

  useEffect(() => {
    if (filterProducts.length > 0) {
      setDisplayProductList(filterProducts);
    } else {
      setDisplayProductList(categoryProducts);
    }
  }, [categoryProducts, filterProducts]);

  const totalPages = Math.ceil(categoryProducts.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(
    startIndex + ITEMS_PER_PAGE,
    categoryProducts.length
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const router = useRouter();

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
                <Image
                  src={product?.images[0]}
                  alt={product.productName}
                  width={150}
                  height={150}
                  onClick={() => router.push(`/products/${product.id}`)}
                />
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
                <Button className="px-6 bg-secondary-blue hover:bg-secondary-blue font-bold">
                  Buy now
                </Button>
                <p className="text-secondary-blue">
                  <IoHeartOutline size={22} />
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
          {/* Generate pagination links */}
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
