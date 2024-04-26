"use client";
import { getProducts } from "@/actions/get-products";
import { getProductFromCategoryId } from "@/actions/get-products-from-category-id";
import { removeWishListAction } from "@/actions/remove-wishlist-action";
import { useAuthUser } from "@/hooks/useAuthUser";
import { addProductToWishList } from "@/lib/utils";
import { useAppStore } from "@/store";
import { ProductTypes } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

interface SameCateGoryProductsProps {
  categoryId: string;
}
const SameCateGoryProducts = ({ categoryId }: SameCateGoryProductsProps) => {
  const user = useAuthUser();
  const router = useRouter();
  const { setUserProductsData } = useAppStore();
  const [categoryProduct, setCategoryProduct] = useState<ProductTypes[]>([]);

  useEffect(() => {
    async function fetchCategoryProducts() {
      if (categoryId) {
        try {
          const response = await getProductFromCategoryId(categoryId);
          setCategoryProduct(response);
        } catch (error) {
          console.error("Error fetching category products:", error);
        }
      }
    }

    fetchCategoryProducts();
  }, [categoryId, setCategoryProduct]);

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  const handleWishList = async (productId: string) => {
    if (user && user.email) {
      const response = await addProductToWishList(user.email, productId);
      if (response?.success) {
        const productResponse = await getProducts();
        if (productResponse && productResponse.length > 0) {
          setUserProductsData(productResponse);
        }
        const response = await getProductFromCategoryId(categoryId);
        setCategoryProduct(response);
      }
    } else {
      router.push("/auth");
    }
  };

  const handleRemoveWishList = async (productId: string) => {
    if (user && user.email) {
      const response = await removeWishListAction(user.email, productId);
      if (response?.success) {
        const productResponse = await getProducts();
        if (productResponse && productResponse.length > 0) {
          setUserProductsData(productResponse);
        }
        const response = await getProductFromCategoryId(categoryId);
          setCategoryProduct(response);
      } else {
        router.push("/auth");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-[50%] gap-6 mt-20">
      {categoryProduct &&
        categoryProduct.slice(0, 4).map((product: ProductTypes) => (
          <div key={product.id} className="h-full my-2 cursor-pointer">
            <div className="flex flex-col h-full">
              {product.images && product.images.length > 0 && (
                <div className="bg-secondary-white rounded-2xl shadow-[2px_2px_2px_2px_rgba(0,0,0,0.03)]  flex justify-center items-center py-4">
                  <Image
                    onClick={() => handleProductClick(product.id)}
                    className=" w-[150px] h-[170px] "
                    src={product.images[0]}
                    alt="alt image"
                    width={150}
                    height={150}
                  />
                </div>
              )}
              <div className="px-2 mt-4">
                <div className="flex items-center justify-center">
                  {/* <p className="flex-1 font-medium">${product.price}</p>   */}
                  <div
                    className="flex items-center gap-2 flex-1 font-medium"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <p>
                      $
                      {Math.round(
                        product.price -
                          (product?.price * product?.discount) / 100
                      )}
                    </p>
                    <p className="text-custom-font line-through text-sm">
                      ${product?.price}
                    </p>
                  </div>
                  <p className="text-secondary-blue">
                    {product.wishlist &&
                    product.wishlist?.length > 0 &&
                    user ? (
                      <IoHeart
                        size={22}
                        className="text-secondary-blue"
                        onClick={() => handleRemoveWishList(product.id)}
                      />
                    ) : (
                      <IoHeartOutline
                        size={22}
                        className="text-secondary-blue"
                        onClick={() => handleWishList(product.id)}
                      />
                    )}
                  </p>
                </div>
                <div className="mb-4 inline-block text-xs font-bold py-1  text-emerald-500">
                  <p>{product?.discount}% Off</p>
                </div>
                <div className="line-clamp-2 mt-2">
                  <p className="">{product.productName}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SameCateGoryProducts;