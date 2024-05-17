"use client";

// import { getOrderProductAction } from "@/actions/get-order-products";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { CheckOutInfoSceham } from "@/schemas";

const CheckOut = () => {
  const [userAndProfile, setUserProfile] = useState<UserAndProfileTypes>();
  const [cart, setCart] = useState<CartTypes>();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [profileUpdated, setProfileUpdated] = useState<boolean>(false);
  const user = useAuthUser();
  const router = useRouter();

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
    if (cart && cart.products && user && user.email && profileUpdated) {
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
      if (!paymentUrl) {
        return;
      }
      if (paymentUrl && window && window.location) {
        window.location.href = paymentUrl;
      }
    }
    else {
      toast.info('Please provide contact information and shipping information.')
    }
  };



  const form = useForm({
    resolver: zodResolver(CheckOutInfoSceham),
    defaultValues: {
      firstName: userAndProfile?.name ? userAndProfile.name.split(" ")[0] : "",
      lastName: userAndProfile?.name ? userAndProfile.name.split(" ")[1] : "",
      phone:
        userAndProfile?.profile &&
          userAndProfile?.profile[0] &&
          userAndProfile?.profile[0].mobileNo
          ? userAndProfile?.profile[0].mobileNo
          : "",
      address:
        userAndProfile?.profile &&
          userAndProfile?.profile[0] &&
          userAndProfile?.profile[0].addresses &&
          userAndProfile?.profile[0]?.addresses.length > 0 &&
          userAndProfile?.profile[0]?.addresses[0]
          ? userAndProfile?.profile[0]?.addresses[0]
          : "",
    },
  });


  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof CheckOutInfoSceham>) => {
    if (userAndProfile?.profile && email) {
      const { error, success } = await updateProfileAction(
        values,
        userAndProfile?.image ? userAndProfile?.image : '',
        userAndProfile?.profile[0].id,
        email,
        userAndProfile?.id
      );
      if (success) {
        toast.success("Profile uodated successfully.");
        setProfileUpdated(true)
      }
    }
    // form.reset();
  };
  return (
    <div className="grid grid-cols-5 gap-5 lg:container lg:px-0 px-6 mt-5">
      {user && userAndProfile && cart && cart.products && cart.products.length > 0 ? (
        <>
          <div className="col-span-4">
            {user
              && userAndProfile && (

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
                    <p className="text-2xl font-bold my-5">Contact Information</p>
                    <div className="flex w-full gap-5 my-5">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel className="text-lg font-normal">
                              First name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Type here"
                                className=""
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel className="text-lg font-normal">
                              Last name
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Type here" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex w-full gap-5 my-5">
                      <FormField
                        // defaultValue={email}
                        // control={form.control}
                        name="updatedEmail"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel className="text-lg font-normal">
                              Email <span className="text-xs text-custom-font">{`(Can not be change)`}</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                value={email}
                                placeholder="example@gmail.com"
                                // {...field}
                                disabled
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel className="text-lg font-normal mr-5">
                              Phone
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="+123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <p className="text-2xl font-bold my-5">Shipping Informaiton</p>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-lg font-normal">
                                Address
                              </FormLabel>
                              <FormControl>
                                {/* Ensure that the value is always a string */}
                                <Input placeholder="Type here" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    />
                    <Button
                      size={"lg"}
                      type="submit"
                      disabled={isLoading}
                      className="bg-secondary-blue border-none hover:bg-secondary-blue rounded-lg my-5"
                    >
                      Save
                    </Button>
                  </form>
                </Form>
              )}
          </div>
          <div className="col-span-1 w-full">
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
                <div className="flex flex-col gap-2">
                  <Button
                    className="bg-secondary-blue mr-1 hover:bg-secondary-blue "
                    onClick={handlePayment}
                    size={'sm'}
                  >
                    Pay with crypto
                  </Button>
                  <Button
                    variant={"outline"}
                    className="text-secondary-blue mr-1 hover:text-secondary-blue"
                    onClick={() => router.push("/")}
                    size={'sm'}
                  >
                    Return to shop
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : ""}
    </div>



  );
};

export default CheckOut;
