"use client";
import { getProducts } from "@/actions/get-products";
import { useAppStore } from "@/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useAuthUser } from "@/hooks/useAuthUser";
import { addProductToWishList } from "@/lib/utils";
import { removeWishListAction } from "@/actions/remove-wishlist-action";
import { ProductTypes } from "@/types";
import { createOrderAndOrderProducts } from "@/actions/create-order";
import { addToCart } from "@/actions/add-cart-action";
import { toast } from "sonner";

const Wishlist = () => {
  const { userProductsData, setUserProductsData } = useAppStore();
  const router = useRouter();
  const user = useAuthUser();
  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [router, user]);

  useEffect(() => {
    async function getProductsData() {
      const productResponse = await getProducts();
      if (productResponse && productResponse.length > 0) {
        setUserProductsData(productResponse);
      }
    }
    getProductsData();
  }, [setUserProductsData]);

  const handleWishList = async (productId: string) => {
    if (user && user.email) {
      const response = await addProductToWishList(user.email, productId);
      if (response?.success) {
        const productResponse = await getProducts();
        if (productResponse && productResponse.length > 0) {
          setUserProductsData(productResponse);
        }
      toast.success("Product added to wish list." )
      }
    } else {
      router.push("/auth");
      toast.error('Please sign in to proceed.')
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
        toast.success("Product removed from wish list.");
      } else {
        router.push("/auth");
        toast.error('Please sign in to proceed.')
      }
    }
  };

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
    }
  };

  const handleCart = async (productId: string | undefined) => {
    if (user && user.email && productId) {
      const response = await addToCart(user.email, productId, 1);
      toast.success('Product added to cart.')
    } else {
      router.push("/auth");
    }
  };

  return (
    <div className="lg:container lg:px-6 px-0 ">
      {userProductsData &&
        userProductsData.length > 0 &&
        userProductsData.map((product) =>
          product.wishlist && product.wishlist?.length > 0 ? (
            <div
              key={product.id}
              className="cursor-pointer grid grid-cols-4 bg-secondary-white m-4 rounded-2xl shadow-[2px_2px_2px_2px_rgba(0,0,0,0.03)]"
            >
              <div key={product.id} className="m-4 ">
                {product && product.images && (
                  <div className="relative h-[200px]">
                    <Image
                      src={product?.images[0]}
                      alt={product.productName}
                      objectFit="contain"
                      layout="fill"
                      loading="lazy"
                      onClick={() => router.push(`/products/${product.id}`)}
                    />
                  </div>
                )}
              </div>
              <div
                className="col-span-2 my-4 mr-4"
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
                    className="px-5 bg-yellow-400 hover:bg-yellow-400/90 font-bold"
                    onClick={() => handleBuy(product)}
                  >
                    Buy now
                  </Button>
                  <Button
                    className="px-4 bg-secondary-blue hover:bg-secondary-blue font-bold"
                    onClick={() => handleCart(product.id)}
                  >
                    Add to cart
                  </Button>
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
              </div>
            </div>
          ) : null
        )}
    </div>
  );
};

export default Wishlist;
