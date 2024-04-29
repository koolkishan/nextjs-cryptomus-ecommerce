"use client";
import { getCartAction } from "@/actions/get-cart-action";
import { useAuthUser } from "@/hooks/useAuthUser";
import { CartTypes } from "@/types";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { removeProductFromCart } from "@/actions/remove-cart-action";
import { useRouter } from "next/navigation";
import { createOrderAndOrderProducts } from "@/actions/create-order";

const Cart = () => {
  const user = useAuthUser();
  const [cart, setCart] = useState<CartTypes>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function getUserCart() {
      if (user && user.email) {
        const response = await getCartAction(user.email);
        if (response) {
          setCart(response);
        }
      }
    }
    getUserCart();
  }, [user]);

  useEffect(() => {
    if (cart && cart.products) {
      const total = cart.products.reduce((acc, product) => {
        return acc + product.quantity * product.product.price;
      }, 0);
      setTotalPrice(total);
      let totalDiscount = 0;
      cart.products.forEach((product) => {
        const discountAmount =
          (product.product.price * product.product.discount) / 100;
        totalDiscount += discountAmount * product.quantity;
      });
      setTotalDiscount(Math.round(totalDiscount));
    }
  }, [cart]);

  if (!isMounted) {
    return null;
  }

  const handleClick = async (productId: string) => {
    if (user && user.email) {
      const response = await removeProductFromCart(user.email, productId);
      const result = await getCartAction(user.email);
      if (result) {
        setCart(result);
      }
    }
  };

  const handleCheckOut = async () => {
    if (user && user?.email && cart && cart.products) {
      router.push(`/checkout`);
    }
  };

  return (
    <div>
      <div className="lg:container lg:px-0 grid grid-cols-4 gap-5 pt-5">
        <div className="col-span-3 min-h-[calc(100vh-230px)] overflow-y-auto scrollbar-hide">
          {cart && cart.products && cart.products.length > 0 ? (
            cart.products.map((p, index) => (
              <div key={p.id}>
                <div className="mb-8 grid grid-cols-6 gap-4">
                  <div className="flex  col-span-3 gap-4 w-[90%]">
                    <div className="grid grid-cols-3 items-center gap-x-4">
                      <div className="relative w-full h-[100px] border border-zinc-400/20 rounded-md col-span-1  ">
                        <Image
                          src={p.product.images[0]}
                          alt={p.product.productName}
                          className="bg-secondary-white rounded-md py-2"
                          layout="fill"
                          loading="lazy"
                          objectFit="contain"
                        />
                      </div>
                      <div className="col-span-2">
                        <p className="text-[18px] line-clamp-2">
                          {p.product.productName}
                        </p>
                        <p className="line-clamp-2 text-sm text-zinc-400 text-justify">
                          {p.product.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-zinc-400">
                      Quantity:{" "}
                      <span className="text-secondary-black">{p.quantity}</span>
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">
                      $
                      {Math.round(
                        (p.product.price -
                          (p.product.price * p.product.discount) / 100) *
                          p.quantity
                      ).toLocaleString("us")}
                    </p>
                    <p className="text-sm text-zinc-400">
                      {`$${Math.round(
                        p.product.price -
                          (p.product.price * p.product.discount) / 100
                      ).toLocaleString("us")}/per item`}
                    </p>
                  </div>
                  <div>
                    <Button
                      variant={"outline"}
                      className="text-destructive hover:text-destructive hover:bg-destructive/5 border border-destructive/20"
                      onClick={() => handleClick(p.productId)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>no cart items</div>
          )}
        </div>
        {cart && cart.products && cart.products.length > 0 && (
          <div className="col-span-1 w-full">
            <div className="bg-secondary-white p-6 rounded-xl ">
              <div className="flex my-2">
                <p className="flex-1">Total Price: </p>
                <p>${totalPrice.toLocaleString("us")}</p>
              </div>
              <div className="flex my-2">
                <p className="flex-1">Discount: </p>
                <p className="text-destructive">
                  -${totalDiscount.toLocaleString("us")}
                </p>
              </div>
              <div className="border border-b-zinc-400/20"></div>
              <div className="flex my-2">
                <p className="flex-1">Total:</p>
                <p className="text-xl font-bold">
                  ${(totalPrice - totalDiscount).toLocaleString("us")}
                </p>
              </div>
              <div className="flex flex-col gap-y-4">
                <div>
                  <Button
                    className="w-full bg-secondary-blue hover:bg-secondary-blue"
                    onClick={handleCheckOut}
                  >
                    Checkout
                  </Button>
                </div>
                <div>
                  <Button
                    variant={"outline"}
                    className="w-full text-secondary-blue hover:text-secondary-blue"
                    onClick={() => router.push("/")}
                  >
                    Back to shop
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
{
  /* <div class="flex flex-col">
  <div class="overflow-auto h-full">
    <!-- Scrollable content -->
  </div>
  <div class="fixed bottom-0 left-0 right-0">
    <!-- Fixed content -->
  </div>
</div> */
}
export default Cart;
