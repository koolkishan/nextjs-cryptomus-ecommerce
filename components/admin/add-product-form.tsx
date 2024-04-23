"use client";
import {
  Form,
  FormControl,
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
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { createProduct } from "@/actions/create-product";
import { useAppStore } from "@/store";
import { getCategories } from "@/actions/get-all-categories";
import { getProducts } from "@/actions/get-products";

const AddProductForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string[] | []>([]);
  const { setProductsData, setToggleSheet, setCategoriesData, categoriesData } =
    useAppStore();
  // console.log('AddProductForm ~ categoriesData:', categoriesData);

  useEffect(() => {
    async function fetchCategories() {
      const response = await getCategories();
      if (response && response.length > 0) {
        setCategoriesData(response);
      }
    }
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productName: "",
      description: "",
      category: "",
      price: "",
      discount: "",
      tags: "",
      qty: "",
    },
  });

  const handleUploadSuccess = (uploaded: any) => {
    if (uploaded?.event === "success") {
      setUploadedImageUrl((prev) => [...prev, uploaded.info.url]);
    }
  };

  const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
    setError("");
    setSuccess("");
    const category = categoriesData.find(category => category.categoryName === values.category);
    if (category) {
      const { error, success } = await createProduct(values, uploadedImageUrl, category?.id);
      setError(error);
      setSuccess(success);
      setUploadedImageUrl([]);
    }
    const response = await getProducts();
    if (response && response.length) {
      setProductsData(response);
      const timerId = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 2000);

      setTimeout(() => {
        clearTimeout(timerId);
      }, 2000);
    }
    else {
      setProductsData([]);
    }
    form.reset();
    return;
  };

  const removeImage = async (url: string) => {
    setUploadedImageUrl((prev) => prev.filter((item) => item !== url));
  };

  const handleCancle = () => {
    setUploadedImageUrl([]);
    setToggleSheet(false);
    form.reset();
  };
  const isLoading = form.formState.isSubmitting;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
          <div className="flex h-full flex-col">
            <div className="h-[80%] overflow-y-scroll scrollbar-hide">
              <div className="w-[98%] ml-1 my-6 text-primary-text">
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
                          className=" bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
                          placeholder="Enter product name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[98%] ml-1 my-6 text-primary-text">
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
                          className="  bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
                          placeholder="Type something"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[98%] ml-1 my-6 text-primary-text">
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
                          <SelectTrigger className="w-[98%] ml-1  bg-transparent outline-none border-secondary-black">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent className=" text-primary-text hover:bg-surface  bg-primary-background outline-none border-secondary-black">
                            {categoriesData.map((category) => (
                              <SelectItem
                                key={category.id}
                                className="hover:bg-surface"
                                value={category.categoryName}
                              >
                                {category.categoryName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[98%] ml-1 flex gap-4 my-6 text-primary-text">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-custom-font">Price</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="w-[98%] ml-1  bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
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
                        Discount
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="w-[98%] ml-1  bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
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
                          className="  bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
                          placeholder="Enter quantity"
                          {...field}
                          type="number"
                          min={0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-[98%] ml-1 my-6 text-primary-text">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-custom-font">Tags</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className=" bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
                          placeholder="Enter comma seprated tags"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-6 text-primary-text">
                <p className="text-custom-font">Product Images</p>
                <div className="border rounded-xl border-dashed border-custom-font my-2 h-[100px] flex flex-col justify-center items-center">
                  <div
                    className="flex flex-col justify-center items-center
                            "
                  >
                    <CloudinaryUploadImages
                      handleUploadSuccess={handleUploadSuccess}
                    />
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
            <div className="fixed bottom-0 right-0 w-[384px]  p-4 flex justify-end gap-4">
              <div className="w-full">
                <Button
                  size={"sm"}
                  type="submit"
                  disabled={isLoading}
                  className="w-1/4 bg-secondary-blue border-none hover:bg-secondary-blue rounded-xl mr-4"
                >
                  Save
                </Button>
                <Button
                  size={"sm"}
                  type="reset"
                  disabled={isLoading}
                  onClick={handleCancle}
                  className="w-1/4 bg-transparent border border-secondary-black hover:bg-transparent rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddProductForm;
