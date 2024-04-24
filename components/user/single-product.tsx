"use client";
import { cn } from "@/lib/utils";
import { ProductTypes } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IoHeartOutline } from "react-icons/io5";
import { AlertTriangle } from "lucide-react";
import RecommendedProducts from "./recommended";

interface SingleProductProps {
  product: ProductTypes | undefined;
}

const SingleProduct = ({ product }: SingleProductProps) => {
  const [singleProductImages, setSingleProductImages] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

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

  return (
    <div className=" px-6 lg:container lg:px-0">
      <div className="lg:grid lg:grid-cols-2 my-5 ">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={singleProductImages}
            alt="single product image "
            className="mb-5 h-[200px] md:h-[300px] w-[70%] lg:h-[400px] bg-secondary-white rounded-2xl shadow-[2px_2px_2px_2px_rgba(0,0,0,0.03)]"
            width={300}
            height={300}
          />
        </div>
        <div className="visible lg:hidden flex gap-5 justify-center mb-4">
          {product?.images?.map((image: string) => (
            <div
              key={image}
              className={cn(
                "bg-blue-100 p-4 rounded-lg border ",
                image === singleProductImages
                  ? "border-secondary-blue"
                  : "border-none"
              )}
            >
              <Image
                onClick={() => setSingleProductImages(image)}
                src={image}
                alt="sub image"
                width={60}
                height={60}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <div className="flex-1">
            <div className="font-bold text-2xl mb-4">
              {product?.productName}
            </div>
            <div className="font-bold text-xl mb-4 flex items-center gap-4">
              <p>${product?.price} </p>
              <p className="font-medium text-sm center text-gray-500">
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
              >
                Buy now
              </Button>
              <Button
                className={`${
                  quantity === 0
                    ? "bg-gray-300 hover:bg-gray-300 cursor-not-allowed"
                    : "bg-secondary-blue hover:bg-secondary-blue"
                } font-bold`}
              >
                Add to cart
              </Button>
              <p className="text-secondary-blue">
                <IoHeartOutline size={22} />
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:visible lg:flex lg:gap-5 lg:justify-center">
          {product?.images?.map((image: string) => (
            <div
              key={image}
              className={cn(
                "bg-blue-100 p-4 rounded-lg border ",
                image === singleProductImages
                  ? "border-secondary-blue"
                  : "border-none"
              )}
            >
              <Image
                onClick={() => setSingleProductImages(image)}
                src={image}
                alt="sub image"
                width={60}
                height={60}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <RecommendedProducts
          productsForSameCategory={true}
          categoryId={product?.categoryId}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
