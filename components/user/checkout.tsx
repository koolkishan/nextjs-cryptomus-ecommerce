"use client";

import { getOrderProductAction } from "@/actions/get-order-products";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CartTypes, UserAndProfileTypes } from "@/types";
import { useAuthUser } from "@/hooks/useAuthUser";
import { getUserByEmailAction } from "@/actions/get-user-by-email-action";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCartAction } from "@/actions/get-cart-action";
import { Input } from "../ui/input";
import { updateProfileAction } from "@/actions/update-profile-action";
import { createOrderAndOrderProducts } from "@/actions/create-order";

const CheckOut = () => {
  const [userProfile, setUserProfile] = useState<UserAndProfileTypes>();
  const [cart, setCart] = useState<CartTypes>();
  console.log("CheckOut ~ cart:", cart);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const user = useAuthUser();
  const router = useRouter();

  //   useEffect(() => {
  //     async function fetchOrderProduct() {
  //       if (user && user.email) {
  //         const result = await getOrderProductAction(orderId);
  //         if (result) {
  //           setOrderDetails(result);
  //         }
  //         const dbUser = await getUserByEmailAction(user.email) as any;
  //         if (dbUser && dbUser?.id) {
  //           await updateOrderStatus(orderId, "PROCESSING");
  //           await deleteUnprocessedOrders(dbUser?.id);
  //           setLoggedUser(dbUser);
  //           console.log("fetchOrderProduct ~ loggedUser:", dbUser);
  //         }
  //       }
  //     }
  //     fetchOrderProduct();
  //   }, [orderId, user]);

  useEffect(() => {
    async function getUserCart() {
      if (user && user.email) {
        const response = await getCartAction(user.email);
        if (response) {
          setCart(response);
        }
        const dbUser = (await getUserByEmailAction(user.email)) as any;
        if (dbUser) {
          setUserProfile(dbUser);
          setFirstName(dbUser.name.split(" ")[0]);
          setLastName(dbUser.name.split(" ")[1]);
          setAddress(dbUser.profile[0].addresses);
          setPhone(dbUser.profile[0].mobileNo);
          setEmail(dbUser.email);
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

  const handlePayment = async () => {
    if (cart && cart.products && user && user.email) {
      const products = cart?.products.map((p) => {
        return {
          productId: p.product.id,
          quantity: p.quantity,
        };
      });
      const paymentUrl = await createOrderAndOrderProducts(
        user.email,
        products,
        totalPrice,
        totalDiscount
      );
      console.log(paymentUrl,":::::");
      if (!paymentUrl) {
        return;
      }
      if (paymentUrl && window && window.location) {
        window.location.href = paymentUrl;
      }
    }
  };

  const handleChange = async () => {
    if (firstName && lastName && email && phone && address) {
      const values = {
        firstName,
        lastName,
        updatedEmail: email,
        phone,
        address,
      };
      if (userProfile?.profile) {
        updateProfileAction(
          values,
          userProfile?.image,
          userProfile?.profile[0].id,
          userProfile?.id
        );
      }
    } else {
      alert("Please provide contact information");
    }
  };

  return (
    <div className="grid grid-cols-5 gap-5 lg:container lg:px-0 px-6 mt-5">
      {cart && cart.products && cart.products.length > 0 && (
        <div className="col-span-4">
          <div className=" ">
            <p className="text-2xl font-bold">Contact Info</p>
            <div className="flex gap-5 my-5">
              <div className="w-1/2">
                <div>
                  <p>First name</p>
                </div>
                <div>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div>
                  <p>Last name</p>
                </div>
                <div>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-1/2">
                <div>
                  <p>Phone</p>
                </div>
                <div>
                  <Input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div>
                  <p>Email</p>
                </div>
                <div>
                  <Input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="my-5 flex items-center gap-2">
              <input
                type="checkbox"
                className="checked:bg-secondary-blue w-5 h-5"
                onChange={handleChange}
              />{" "}
              <span>Keep me up to date on news</span>
            </div>
          </div>
          <div className="border border-b-zinc-400/10"></div>
          <div className="my-4">
            <p className="text-2xl font-bold">Shopping Info</p>
          </div>
          <div>
            <p>Address</p>
          </div>
          <div>
            <Input
              type="text"
              value={address}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5 flex items-center gap-2">
            <input
              type="checkbox"
              className="checked:bg-secondary-blue w-5 h-5"
              onChange={handleChange}
            />{" "}
            <span>Save this address</span>
          </div>
          <div className="flex gap-4">
            <Button
              className="bg-secondary-blue hover:bg-secondary-blue"
              onClick={handlePayment}
            >
              Pay with crypto
            </Button>
            <Button
              variant={"outline"}
              className="text-secondary-blue  hover:text-secondary-blue"
            >
              Return to shop
            </Button>
          </div>
        </div>
      )}
      <div className="col-span-1">
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
              <div className="border border-b-zinc-400/10 my-4"></div>
              <div className="flex">
                <p className="flex-1">Total:</p>
                <p className="text-xl font-bold">
                  ${(totalPrice - totalDiscount).toLocaleString("us")}
                </p>
              </div>
              <div className="border border-b-zinc-400/10 my-4"></div>
              <div>
                <p className="text-sm font-bold">Item in cart</p>
                {cart.products.map((p) => (
                  <div key={p.id} className=" my-4 grid grid-cols-3 gap-4">
                    {/* <p className="absolute">{p.quantity}</p> */}
                    <div className=" relative  h-[70px] border border-zinc-400/20 rounded-md col-span-1  ">
                      <Image
                        src={p.product.images[0]}
                        alt={p.product.productName}
                        className="bg-secondary-white rounded-md py-2"
                        layout="fill"
                        loading="lazy"
                        objectFit="contain"
                      />
                    </div>
                    <div className="text-sm col-span-2">
                      <div>
                        <p className="line-clamp-1">{p.product.productName}</p>
                        <p className=" text-zinc-400">
                          Total: $
                          {p.product.price -
                            (p.product.price * p.product.discount) / 100}
                        </p>
                        <p className=" text-zinc-400">Quantity: {p.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOut;
