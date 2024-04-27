"use client";

import { getOrderProductAction } from "@/actions/get-order-products";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ProfileEntity, UserAndProfileTypes, orderTypes } from "@/types";
import { useAuthUser } from "@/hooks/useAuthUser";
import { getUserByEmailAction } from "@/actions/get-user-by-email-action";
import { getProfileAction } from "@/actions/get-profile-action";
import { useRouter } from "next/navigation";
import { deleteUnprocessedOrders } from "@/actions/delete-unprocessed-orders";
import { updateOrderStatus } from "@/actions/update-order-status";
import Image from "next/image";

interface OrderProps {
  orderId: string;
}
const Order = ({ orderId }: OrderProps) => {
  const [orderDetails, setOrderDetails] = useState<orderTypes[] | []>([]);
  const [loggedUser, setLoggedUser] = useState<UserAndProfileTypes>();
  const router = useRouter();
  const user = useAuthUser();

  useEffect(() => {
    async function fetchOrderProduct() {
      if (user && user.email) {
        const result = await getOrderProductAction(orderId);
        if (result) {
          setOrderDetails(result);
        }
        const dbUser = await getUserByEmailAction(user.email) as any;
        if (dbUser && dbUser?.id) {
          await updateOrderStatus(orderId, "PROCESSING");
          await deleteUnprocessedOrders(dbUser?.id);
          setLoggedUser(dbUser);
        }
      }
    }
    fetchOrderProduct();
  }, [orderId, user]);
  return (
    <>
      {orderDetails && loggedUser && (
        <div className="h-full">
          <div className=" flex-1 w-full">
            <div className="fixed  bg-blue-100 w-full py-4">
              <div className="lg:container lg:px-0 px-6">
                <p className="text-2xl lg:text-4xl font-medium">
                  Order Details
                </p>
              </div>
            </div>
          </div>
          <div className="lg:container  lg:px-0 0 grid grid-cols-4 gap-5 pt-[92px]  rounded-xl">
            <div className="col-span-3 px-3">
              <div className="text-xl font-bold mb-4">
                <p>Contact Info</p>
              </div>
              <div className="grid grid-cols-2 my-4 ">
                <div className="flex gap-2">
                  <label>First name:</label>
                  <p>{loggedUser.name?.split(" ")[0]}</p>
                </div>
                <div className="flex gap-2">
                  <label>Last name:</label>
                  <p>{loggedUser?.name?.split(" ")[1]}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 items-center">
                <div className="flex gap-2">
                  <label>Email:</label>
                  <p>{loggedUser.email}</p>
                </div>
                <div className="">
                  {loggedUser.profile && loggedUser.profile[0] && loggedUser.profile[0].mobileNo ? (
                    <div className="flex gap-2">
                      <label>Phone:</label>
                      <p>{loggedUser.profile[0].mobileNo}</p>
                    </div>
                  ) : (
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      onClick={() => router.push("/profile/profile-setting")}
                    >
                      Add Mobile No
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <div className="text-xl font-bold my-4">
                  <p>Shipping Info</p>
                </div>
                <div className="">
                  {loggedUser.profile && loggedUser.profile[0] && loggedUser.profile[0].addresses&&  loggedUser.profile[0].addresses.length ? (
                    <div className="flex gap-2">
                      <label>Address:</label>
                      <p>{loggedUser.profile[0].addresses}</p>
                    </div>
                  ) : (
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      onClick={() => router.push("/profile/profile-setting")}
                    >
                      Add Shipping Address
                    </Button>
                  )}
                </div>
              </div>
              <div className="border border-b-zinc-400/10 my-10"></div>
              <div className="">
                {orderDetails[0].products &&
                orderDetails[0].products.length > 0 ? (
                  orderDetails[0].products.map((p,) => (
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
                            <span className="text-secondary-black">
                              {p.quantity}
                            </span>
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
                      </div>
                    </div>
                  ))
                ) : (
                  <div>no cart items</div>
                )}
              </div>
            </div>
            <div className="col-span-1 h-[calc(100vh-225px)] overflow-y-auto scrollbar-hide">
              <div className="col-span-1 w-full">
                <div className="bg-secondary-white p-6 rounded-xl ">
                  <div className="flex my-2">
                    <p className="flex-1">Total Price: </p>
                    <p>${orderDetails[0].totalPrice.toLocaleString("us")}</p>
                  </div>
                  <div className="flex my-2">
                    <p className="flex-1">Discount: </p>
                    <p className="text-destructive">
                      -${orderDetails[0].totalDiscount.toLocaleString("us")}
                    </p>
                  </div>
                  <div className="border border-b-zinc-400/20"></div>
                  <div className="flex my-2">
                    <p className="flex-1">Total:</p>
                    <p className="text-xl font-bold">
                      $
                      {(
                        orderDetails[0].totalPrice -
                        orderDetails[0].totalDiscount
                      ).toLocaleString("us")}
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-4">
                    <div>
                      <Button
                        className="w-full bg-secondary-blue hover:bg-secondary-blue"
                        // onClick={handleCheckOut}
                      >
                        PAY
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
