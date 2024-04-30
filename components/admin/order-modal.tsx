"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

import { getOrderFromOrderIdAction } from "@/actions/get-order-from-order-id";
import { orderTypes } from "@/types";
import { useAppStore } from "@/store";
import { updateOrderStatus } from "@/actions/update-order-status";
import { getAllOrderAction } from "@/actions/get-all-orders";
import { toast } from "sonner";

interface OrderModalProps {
  setOrderModal: Dispatch<SetStateAction<boolean>>;
  orderModal: boolean;
}

const OrderModal = ({ setOrderModal, orderModal }: OrderModalProps) => {
  const [IsDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [order, setOrder] = useState<orderTypes | null>(null);
  const [orderStatus, setOrderStatus] = useState<string>("");
  console.log("OrderModal ~ orderStatus:", orderStatus);
  const { viewingOrderId, setOrders } = useAppStore();
  useEffect(() => {
    async function getOrderformOrderId() {
      const response = await getOrderFromOrderIdAction(viewingOrderId);
      if (response) {
        setOrderStatus(response.orderStatus);
        setOrder(response);
      }
    }
    getOrderformOrderId();
  }, [viewingOrderId]);

  const handleSave = async () => {
    if (order && order.id) {
      await updateOrderStatus(order?.id, orderStatus.toLowerCase());
      const orders = await getAllOrderAction();
      if (orders && orders.length > 0) {
        setOrders(orders);
      }
      toast.success('Order updated successfully.')
      setOrderModal(false);
      const response = await getOrderFromOrderIdAction(viewingOrderId);
      if (response) {
        setOrderStatus(response.orderStatus);
        setOrder(response);
      }
    }
  };

  return (
    <Dialog open={orderModal} onOpenChange={setOrderModal}>
      <DialogContent className="bg-surface border border-secondary-black h-[590px]">
        <Tabs defaultValue="Order Details" className="w-full">
          <div className="flex flex-col">
            <div className="flex-1">
              <DialogHeader className="w-full mt-4">
                <TabsList className="bg-transparent justify-start gap-10">
                  {["Order Details", "Items"].map((tab) => (
                    <div key={tab} className="flex  justify-center ">
                      <TabsTrigger
                        className="data-[state=active]:border-b-2  data-[state=active]:border-b-secondary-blue rounded-none data-[state=active]:text-primary-text data-[state=active]:bg-transparent text-primary-text hover:bg-transparent"
                        value={tab}
                      >
                        {tab}
                      </TabsTrigger>
                    </div>
                  ))}
                </TabsList>
              </DialogHeader>

              {["Order Details", "Items"].map((tab) => (
                <TabsContent key={tab} value={tab} className="">
                  {tab === "Order Details" && (
                    <div className="text-3xl text-primary-text my-4">
                      <p>Order Details</p>
                    </div>
                  )}
                  {tab === "Order Details" && (
                    <div className="text-primary-text">
                      <div className="mb-4">
                        <div className="flex gap-5 mb-4">
                          <div className="flex gap-2 items-center">
                            <span className="">{`Order status: `}</span>
                            {order?.orderStatus.toLowerCase() === "cancel" ? (
                              <p className="text-red-400 border  border-red-400 bg-red-400/20 px-4 rounded-lg">
                                {order?.orderStatus
                                  ? order.orderStatus.charAt(0).toUpperCase() +
                                    order.orderStatus.slice(1)
                                  : ""}
                              </p>
                            ) : (
                              ""
                            )}
                            {order?.orderStatus.toLowerCase() === "pending" ? (
                              <p className="text-yellow-400 border border-yellow-400 bg-yellow-400/20 px-4 rounded-lg">
                                {order?.orderStatus
                                  ? order.orderStatus.charAt(0).toUpperCase() +
                                    order.orderStatus.slice(1)
                                  : ""}
                              </p>
                            ) : (
                              ""
                            )}
                            {order?.orderStatus.toLowerCase() ===
                            "delivered" ? (
                              <p className="text-green-400 border border-green-400 bg-green-400/20 px-4 rounded-lg">
                                {order?.orderStatus
                                  ? order.orderStatus.charAt(0).toUpperCase() +
                                    order.orderStatus.slice(1)
                                  : ""}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="flex gap-2 items-center">
                            <span className="">{`Payment status: `}</span>
                            {order?.paymentStatus.toLowerCase() ===
                            ("cancel" ||
                              "fail" ||
                              "system_fail" ||
                              "refund_fail" ||
                              "locked") ? (
                              <p className="text-red-400 border  border-red-400 bg-red-400/20 px-4 rounded-lg">
                                {order?.paymentStatus
                                  ? order.paymentStatus
                                      .charAt(0)
                                      .toUpperCase() +
                                    order.paymentStatus.slice(1)
                                  : ""}
                              </p>
                            ) : (
                              ""
                            )}
                            {order?.paymentStatus.toLowerCase() ===
                            ("pending" ||
                              "process" ||
                              "confirm_check" ||
                              "check" ||
                              "refund_process") ? (
                              <p className="text-yellow-400 border border-yellow-400 bg-yellow-400/20 px-4 rounded-lg">
                                {order?.paymentStatus
                                  ? order.paymentStatus
                                      .charAt(0)
                                      .toUpperCase() +
                                    order.paymentStatus.slice(1)
                                  : ""}
                              </p>
                            ) : (
                              ""
                            )}
                            {order?.paymentStatus.toLowerCase() ===
                            ("paid" || "paid_over" || "refund_paid") ? (
                              <p className="text-green-400 border border-green-400 bg-green-400/20 px-4 rounded-lg">
                                {order?.paymentStatus
                                  ? order.paymentStatus
                                      .charAt(0)
                                      .toUpperCase() +
                                    order.paymentStatus.slice(1)
                                  : ""}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="text-custom-font">Name</div>
                        <div>
                          <p>{order?.user?.name}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-custom-font">Phone</div>
                        <div>
                          <p>
                            {order?.user?.profile
                              ? order?.user?.profile[0]?.mobileNo
                              : ""}
                          </p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-custom-font">Email</div>
                        <div>
                          <p>{order?.user?.email}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-custom-font">Address</div>
                        <div>
                          <p>
                            {order?.user?.profile &&
                            order?.user?.profile[0]?.addresses
                              ? order?.user?.profile[0]?.addresses[0]
                              : ""}
                          </p>
                        </div>
                      </div>
                      <div className="text-custom-font">
                        Update order status
                      </div>
                      <div>
                        <Select
                          onValueChange={(value) => setOrderStatus(value)}
                          value={orderStatus}
                          defaultValue={orderStatus}
                        >
                          <SelectTrigger className="bg-transparent outline-none border-secondary-black mt-2 mb-4">
                            <SelectValue placeholder={orderStatus} />
                          </SelectTrigger>
                          <SelectContent className="font-light text-primary-text hover:bg-surface bg-primary-background outline-none border-secondary-black">
                            <SelectItem
                              className="hover:bg-surface"
                              value={"Cancel"}
                            >
                              Cancel
                            </SelectItem>
                            <SelectItem
                              className="hover:bg-surface"
                              value={"Delivered"}
                            >
                              Delivered
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  {tab === "Items" && (
                    <div className="text-3xl text-primary-text my-4">
                      <p>Items</p>
                    </div>
                  )}
                  {tab === "Items" && (
                    <div className="text-primary-text">
                      <div className="">
                        {order?.products.map((product) => (
                          <div
                            key={product.id}
                            className="grid grid-cols-5 gap-10 border border-secondary-black rounded-lg shadow-[2px_2px_2px_2px_rgba(0,0,0,0.03)]"
                          >
                            <div className=" relative h-[100px] rounded-md col-span-1">
                              <Image
                                src={product.product.images[0]}
                                alt={product.product.productName}
                                className="rounded-md py-2 ml-2"
                                layout="fill"
                                // width={100}
                                // height={100}
                                loading="lazy"
                                objectFit="contain"
                              />
                            </div>
                            <div className="flex flex-col gap-y-2 text-sm col-span-4">
                              <p className="line-clamp-1">
                                {product.product.productName}
                              </p>
                              <p className="flex gap-2">
                                <p> Price: ${product.product.price}</p>
                                <p>Discount: {product.product.discount}%</p>
                              </p>
                              <p>Quantity:{product.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
              ))}
            </div>
            <div className="fixed bottom-4  mt-4">
              <Button
                onClick={handleSave}
                size={"sm"}
                className="w-[80px]	bg-secondary-blue border-none hover:bg-secondary-blue rounded-xl mr-4"
              >
                Save
              </Button>
              <Button
                size={"sm"}
                onClick={() => setOrderModal(false)}
                className="w-[80px] bg-transparent border border-secondary-black hover:bg-transparent rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
