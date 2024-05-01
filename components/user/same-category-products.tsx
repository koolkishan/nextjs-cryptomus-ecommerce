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
import { toast } from "sonner";

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
      toast.success("Product added to wish list.");
    } else {
      router.push("/auth");
      toast.error("Please sign in to proceed.");
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
        toast.success("Product removed from wish list.");
      } else {
        router.push("/auth");
        toast.error("Please sign in to proceed.");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-[50%] gap-6 ">
      {categoryProduct &&
        categoryProduct.slice(0, 4).map((product: ProductTypes) => (
          <div key={product.id} className="h-full my-2 cursor-pointer">
            <div className="p-4  flex flex-col h-full bg-primary-text shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
              {product.images && product.images.length > 0 && (
                <div className="flex justify-center items-center mt-4">
                  <div className="relative w-[200px] h-[200px]  py-4">
                    <Image
                      onClick={() => handleProductClick(product.id)}
                      src={product.images[0]}
                      alt="alt image"
                      // width={150}
                      // height={150}
                      loading="lazy"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
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
                      ).toLocaleString('us')}
                    </p>
                    <p className="text-custom-font line-through text-sm">
                      ${product?.price.toLocaleString('us')}
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
