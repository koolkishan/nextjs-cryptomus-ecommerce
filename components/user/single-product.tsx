"use client";
import { addProductToWishList, cn } from "@/lib/utils";
import { ProductTypes } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";
import { getProductFromProductId } from "@/actions/get-product-from-id";
import { useAppStore } from "@/store";
import { removeWishListAction } from "@/actions/remove-wishlist-action";
import SameCateGoryProducts from "./same-category-products";
import { addToCart } from "@/actions/add-cart-action";
import { createOrderAndOrderProducts } from "@/actions/create-order";
import { toast } from "sonner";
import ContainerLoader from "../loader";

const SingleProduct = () => {
  const user = useAuthUser();
  const [singleProductImages, setSingleProductImages] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  const { setProduct, product } = useAppStore();
  useEffect(() => {
    if (product && product.images) {
      setSingleProductImages(product?.images[0]);
    }
    if (product && quantity > product.quantity) {
      setQuantity(product.quantity);
    }
  }, [product, quantity]);

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (product && product.quantity && quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleWishList = async (productId: string) => {
    if (user && user.email) {
      const response = await addProductToWishList(user.email, productId);
      if (response?.success) {
        const response = (await getProductFromProductId(
          productId
        )) as ProductTypes;
        if (response) {
          setProduct(response);
        }
        toast.success("Product added to wishlist.");
      }
    } else {
      router.push("/auth");
      toast.error("Please sign in to proceed.");
    }
  };

  const handleRemoveWishList = async (productId: string) => {
    if (user && user.email) {
      const response = await removeWishListAction(user.email, productId);
      if (response?.success) {
        const response = (await getProductFromProductId(
          productId
        )) as ProductTypes;
        if (response) {
          setProduct(response);
        }
        toast.success("Product removed from wishlist.");
      } else {
        router.push("/auth");
        toast.error("Please sign in to proceed.");
      }
    }
  };

  const handleCart = async (productId: string | undefined) => {
    if (user && user.email && productId) {
      const response = await addToCart(user.email, productId, quantity);
      toast.success("Product added to cart.");
    } else {
      router.push("/auth");
      toast.error("Please sign in to proceed.");

    }
  };

  const handleBuy = async (productId: string | undefined, quantity: number) => {
    if (productId && user && user.email && product?.price) {
      const products = [
        {
          productId,
          quantity,
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
        // console.log("handleBuy ~ productId:", productId);
        window.location.href = paymentUrl;
      }
    } else {
      router.push("/auth");
      toast.error("Please sign in to proceed.");
    }
  };

  return (
    <div>
      <div className="bg-white py-6 ">
        {product ? (
          <div className=" grid grid-cols-3 lg:container lg:px-0 px-6 ">
            <div className="flex flex-col col-span-1 justify-center items-center gap-y-6 ">
              <div className="relative  hover:scale-105 transition-all duration-500 w-[300px] h-[300px] rounded-xl">
                <Image
                  src={singleProductImages}
                  alt="single product image "
                  className="p-4"
                  layout="fill"
                  loading="lazy"
                  objectFit="contain"
                />
              </div>
              <div className="flex gap-x-2">
                {product?.images?.map((image: string) => (
                  <div
                    key={image}
                    className={cn(
                      "relative w-[60px] h-[60px]",
                      image === singleProductImages
                        ? "border-secondary-blue  bg-blue-100"
                        : "border-none"
                    )}
                  >
                    <Image
                      onClick={() => setSingleProductImages(image)}
                      src={image}
                      alt="sub image"
                      className="p-2"
                      layout="fill"
                      loading="lazy"
                      objectFit="contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col col-span-2">
              <div className="flex-1">
                <div className="font-bold text-2xl mb-4">
                  {product?.productName}
                </div>
                <div className="font-bold text-xl mb-4 flex items-center gap-4">
                  <p>${product?.price.toLocaleString("us")} </p>
                  <p className="text-sm center font-bold py-1  text-emerald-500">
                    {product?.discount}% Off
                  </p>
                </div>
                <div className="text-base text-gray-600 line-clamp-4">
                  {product?.description}
                </div>
              </div>
              <div className="flex flex-col my-4 gap-4 ">
                <div className="flext justify-center item-center font-medium text-xl">
                  <p className="font-medium">Quantity</p>
                </div>
                <div className="flex gap-4 items-center ">
                  <Button
                    className="hover:bg-secondary-white rounded-xl bg-secondary-white border-slate-50 shadow-[2px_2px_2px_2px_rgba(0,0,0,0.03)]"
                    onClick={decrementQuantity}
                    disabled={quantity === 0}
                  >
                    <p className="text-xl text-black">-</p>
                  </Button>
                  <p>{quantity}</p>
                  <Button
                    className="hover:bg-secondary-white rounded-xl bg-secondary-white border-slate-50 shadow-[2px_2px_2px_2px_rgba(0,0,0,0.03)]"
                    onClick={incrementQuantity}
                    disabled={quantity === product?.quantity}
                  >
                    <p className="text-xl text-black">+</p>
                  </Button>
                </div>
                {product?.quantity === 0 && (
                  <div>
                    <div className="inline-flex items-center rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                      <AlertTriangle className="h-4 w-4 mr-2 inline-block" />{" "}
                      <span>Not Available</span>
                    </div>
                  </div>
                )}
                <div className="flex gap-4 mt-4 items-center">
                  <Button
                    className={`${
                      quantity === 0
                        ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed"
                        : "bg-yellow-400 hover:bg-yellow-400/90"
                    } font-bold`}
                    onClick={() => handleBuy(product?.id, quantity)}
                  >
                    Buy now
                  </Button>
                  <Button
                    className={`${
                      quantity === 0
                        ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed"
                        : "bg-secondary-blue hover:bg-secondary-blue"
                    } font-bold`}
                    onClick={() => handleCart(product?.id)}
                  >
                    Add to cart
                  </Button>
                  {/* <p className="text-secondary-blue">
                <IoHeartOutline size={22} />
              </p> */}
                  {product &&
                  product.wishlist &&
                  product.wishlist?.length > 0 &&
                  product.id &&
                  user ? (
                    <IoHeart
                      size={22}
                      className="text-secondary-blue cursor-pointer"
                      onClick={() => handleRemoveWishList(product.id)}
                    />
                  ) : (
                    <IoHeartOutline
                      size={22}
                      className="text-secondary-blue cursor-pointer"
                      onClick={() => {
                        if (product) {
                          handleWishList(product.id);
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[230px] flex justify-center items-center">
            <ContainerLoader />
          </div>
        )}
      </div>
      <div className="lg:container lg:px-0 px-6 my-8">
        <p className="text-2xl font-medium my-6">Similar products</p>
        {product && product?.categoryId ? (
          <SameCateGoryProducts categoryId={product?.categoryId} />
        ) : (
          <div className="h-[230px] flex justify-center items-center">
            <ContainerLoader />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
