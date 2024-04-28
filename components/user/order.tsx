"use client";

import { useEffect } from "react";
import { orderTypes } from "@/types";
import { useAuthUser } from "@/hooks/useAuthUser";
import { getUserByEmailAction } from "@/actions/get-user-by-email-action";
import Image from "next/image";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";

interface OrderProps {
  order: orderTypes;
}

const Order = ({ order }: OrderProps) => {
  const user = useAuthUser();
  const router = useRouter();
  const { setUserAndProfile, userAndProfile } = useAppStore();

  useEffect(() => {
    async function getUserProfile() {
      if (user?.email) {
        const userDetails = (await getUserByEmailAction(user?.email)) as any;
        if (userDetails) {
          setUserAndProfile(userDetails);
        }
      }
    }
    getUserProfile();
  }, [user, setUserAndProfile]);

  return (
    <>
      {userAndProfile &&
        userAndProfile.profile &&
        userAndProfile.profile.length > 0 && (
          <div className="bg-secondary-white w-full shadow-[2px_2px_2px_2px_rgba(0,0,0,0.03)] mb-4 p-2">
            <div className="flex gap-5 mb-4">
              <p className="text-custom-font">
                <span className="font-medium text-black">Date-Time:</span>{" "}
                {order.createdAt.toLocaleString()}
              </p>
              <div className="flex gap-4">
                <p className="text-custom-font flex gap-1 items-center">
                  <span className="font-medium text-black">Order status:</span>
                  {order.orderStatus === "cancel" ? (
                    <p className="border border-red-400 bg-red-400/20 px-4 rounded-lg">
                      {order.orderStatus}
                    </p>
                  ) : (
                    ""
                  )}
                  {order.orderStatus === "Pending" ? (
                    <p className="border border-yellow-400 bg-yellow-400/20 px-4 rounded-lg">
                      {order.orderStatus}
                    </p>
                  ) : (
                    ""
                  )}
                  {order.orderStatus === "Delivered" ? (
                    <p className="border border-green-400 bg-green-400/20 px-4 rounded-lg">
                      {order.orderStatus}
                    </p>
                  ) : (
                    ""
                  )}
                </p>
                <p className="font-medium text-custom-font flex gap-1 items-center">
                  <span className="font-medium text-black">
                    Payment status:
                  </span>
                  {order.paymentStatus ===
                  ("cancel" ||
                    "fail" ||
                    "system_fail" ||
                    "refund_fail" ||
                    "locked") ? (
                    <p className="border  border-red-400 bg-red-400/20 px-4 rounded-lg">
                      {order.paymentStatus}
                    </p>
                  ) : (
                    ""
                  )}
                  {order.paymentStatus ===
                  ("Pending" ||
                    "process" ||
                    "confirm_check" ||
                    "check" ||
                    "refund_process") ? (
                    <p className="border border-yellow-400 bg-yellow-400/20 px-4 rounded-lg">
                      {order.paymentStatus}
                    </p>
                  ) : (
                    ""
                  )}
                  {order.paymentStatus ===
                  ("paid" || "paid_over" || "refund_paid") ? (
                    <p className="border border-green-400 bg-green-400/20 px-4 rounded-lg">
                      {order.paymentStatus}
                    </p>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
            <div className="flex justify-between text-custom-font">
              <div className="">
                <p className="text-black font-medium mb-4">Contact Details</p>
                <p>Name: {userAndProfile.name}</p>
                <p>Phone no: {userAndProfile.profile[0].mobileNo}</p>
                <p>Email: {userAndProfile.email}</p>
              </div>
              <div className="">
                <p className="text-black font-medium mb-4">Shipping Details </p>
                <p>
                  <span className="ml-r">Shipping address:</span>
                  {userAndProfile.profile[0].addresses &&
                  userAndProfile.profile[0].addresses.length > 0
                    ? ` ${userAndProfile.profile[0].addresses[0]}`
                    : ""}
                </p>
              </div>
              <div className="">
                <p className="text-black font-medium">Pyment Detail</p>
                <div className="flex mt-4">
                  <p>
                    <p className="mr-2">Total price:</p>
                    <p className="mr-2">discount:</p>
                    <p className="mr-2">Total:</p>
                  </p>
                  <p>
                    <p className="">${order.totalPrice.toFixed(2)}</p>
                    <p className="">-${order.totalDiscount.toFixed(2)}</p>
                    <p className="">
                      ${(order.totalPrice - order.totalDiscount).toFixed(2)}
                    </p>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="font-medium text-black my-4">Products</p>
              <div className="grid grid-cols-5 ">
                {order.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4  border border-zinc-400/20 rounded-xl cursor-pointer"
                    onClick={() =>
                      router.push(`/products/${product.product.id}`)
                    }
                  >
                    <div className=" relative w-[200px]   h-[100px] rounded-md col-span-1  ">
                      <Image
                        src={product.product.images[0]}
                        alt={product.product.productName}
                        className="bg-secondary-white rounded-md py-2 ml-2"
                        layout="fill"
                        loading="lazy"
                        objectFit="contain"
                      />
                    </div>
                    <div className="flex justify-center flex-col text-sm">
                      <p className="line-clamp-1">
                        {product.product.productName}
                      </p>
                      <p className="">Price: {product.product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      {/* {!userAndProfile && <p>Loading user information...</p>}
      {userAndProfile && userAndProfile.profile && userAndProfile.profile.length === 0 && (
        <p>User profile not found.</p>
      )} */}
    </>
  );
};

export default Order;
