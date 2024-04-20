"use client";
import React, { useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { IoCloudUploadOutline, IoMenuOutline } from "react-icons/io5";
import { X } from "lucide-react";
import { FiPlus } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/schemas";
import * as z from "zod";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Textarea } from "../ui/textarea";
import CloudinaryUploadImages from "./cloudinary-upload-images";
import Image from "next/image";
import { RxCrossCircled } from "react-icons/rx";
import { createProduct } from "@/actions/create-product";

const AddProductSideBar = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string[] | []>([]);
  console.log("AddProductSideBar ~ uploadedImageUrl:", uploadedImageUrl);
  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productName: "",
      description: "",
      category: "",
      price: "",
      discount: "",
      tags: "",
      qty:""
    },
  });

  const toggleMenu = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  const handleUploadSuccess = (uploaded: any) => {
    console.log(uploaded, ":::::");
    if (uploaded?.event === "success") {
      setUploadedImageUrl((prev) => [...prev, uploaded.info.url]);
    }
  };

  const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
    console.log("onSubmit ~ values:", values);
    setError("");
    setSuccess("");
    const { error, success } = await createProduct(values, uploadedImageUrl);
    setError(error);
    setSuccess(success);
    setUploadedImageUrl([]);

    // startTransition(async () => {
    //   // // const { error, success } = await createAccount(values);
    //   // // const {error, success} =
    //   // await login(values);
    //   // // if (error) {
    //   // //   setError(error);
    //   // // } else {
    //   // //   setOtp(true);
    //   // //   setSuccess(success);
    //   // // }
    //   // setEmail(values.email);
    //   const response = await sendOtp(values.email);
    //   if (response?.error) {
    //     setError(error);
    //   } else {
    //     setEmail(values.email);
    //     setOtp(true);
    //     setSuccess(success);
    //   }
    // });
    form.reset();
    return;
  };

  const removeImage = async (url: string) => {
    setUploadedImageUrl((prev) => prev.filter((item) => item !== url));
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <div>
      <Sheet open={toggle} onOpenChange={setToggle}>
        <SheetTrigger onClick={toggleMenu}>
          <Button
            variant={"ghost"}
            className="bg-[#2b90ff] rounded-2xl hover:bg-[#2b90ff]"
          >
            <FiPlus />
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"right"}
          className={`bg-primary-background rounded-lg border-none`}
        >
          <SheetHeader>
            <SheetTitle className="text-primary-text font-bold text-2xl my-4">
              Add Product
            </SheetTitle>
            <SheetDescription className="text-primary-txt h-full">
              <div className="h-full">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="h-full"
                  >
                    <div className="flex h-full flex-col">
                      <div className="flex-1 ">
                        <div className="my-4 text-primary-text">
                          <FormField
                            control={form.control}
                            name="productName"
                            render={({ field }) => (
                              <FormItem className="">
                                <FormLabel className="text-custom-font">
                                  Product Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isLoading}
                                    className="bg-transparent border-custom-font focus:outline-none"
                                    placeholder="Enter product name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="my-4 text-primary-text">
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem className="">
                                <FormLabel className="text-custom-font">
                                  Description
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    disabled={isLoading}
                                    className="bg-transparent border-custom-font focus:outline-none"
                                    placeholder="Type something"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="my-4 text-primary-text">
                          <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem className="">
                                <FormLabel className="text-custom-font">
                                  Category
                                </FormLabel>
                                <FormControl>
                                  <Select
                                    {...field}
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                    }}
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger className=" bg-transparent outline-none border-custom-font">
                                      <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent className=" text-primary-text hover:bg-surface  bg-primary-background outline-none border-gray-500">
                                      <SelectItem
                                        className="hover:bg-surface"
                                        value="Electronics"
                                      >
                                        Electronics
                                      </SelectItem>
                                      <SelectItem
                                        className=""
                                        value="Clothing & Accessories"
                                      >
                                        Clothing & Accessories
                                      </SelectItem>
                                      <SelectItem
                                        className=""
                                        value="Toys & Games"
                                      >
                                        Toys & Games
                                      </SelectItem>
                                      <SelectItem
                                        className=""
                                        value="Jewelry & Watches"
                                      >
                                        Jewelry & Watches
                                      </SelectItem>
                                      <SelectItem
                                        className=""
                                        value="Musical Instruments"
                                      >
                                        Musical Instruments
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex gap-4 my-4 text-primary-text">
                          <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                              <FormItem className="">
                                <FormLabel className="text-custom-font">
                                  Price
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isLoading}
                                    className="bg-transparent border-custom-font focus:outline-none"
                                    placeholder="Enter price"
                                    {...field}
                                    type="number"
                                    min={0}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="discount"
                            render={({ field }) => (
                              <FormItem className="">
                                <FormLabel className="text-custom-font">
                                  Product Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isLoading}
                                    className="bg-transparent border-custom-font focus:outline-none"
                                    placeholder="Enter discount"
                                    {...field}
                                    type="number"
                                    min={0}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="qty"
                            render={({ field }) => (
                              <FormItem className="">
                                <FormLabel className="text-custom-font">
                                Qauntity
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isLoading}
                                    className="bg-transparent border-custom-font focus:outline-none"
                                    placeholder="Enter quantity"
                                    {...field}
                                    type="number"
                                    min={1}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="my-4 text-primary-text">
                          <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                              <FormItem className="">
                                <FormLabel className="text-custom-font">
                                  Tags
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    disabled={isLoading}
                                    className="bg-transparent border-custom-font focus:outline-none"
                                    placeholder="Enter comma seprated tags"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="my-4 text-primary-text">
                          <p className="text-custom-font">Product Images</p>
                          <div className="border rounded-xl border-dashed border-custom-font my-2 h-[100px] flex flex-col justify-center items-center">
                            <div>
                              <div
                                className="flex flex-col justify-center items-center
                            "
                              >
                                <CloudinaryUploadImages
                                  handleUploadSuccess={handleUploadSuccess}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            {uploadedImageUrl.length > 0 &&
                              uploadedImageUrl.map((imageUrl, index) => {
                                return (
                                  <>
                                    <div className="relative">
                                      <Image
                                        src={imageUrl}
                                        alt="image"
                                        key={index}
                                        width={90}
                                        height={90}
                                      />
                                      <div
                                        className="absolute top-0 right-2"
                                        onClick={() => removeImage(imageUrl)}
                                      >
                                        <RxCrossCircled size={18} color="red" />
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                          </div>
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                      </div>
                      <div>
                        <Button disabled={isLoading} className="w-full">
                          Create
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export { AddProductSideBar };
