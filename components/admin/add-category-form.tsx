"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "@/schemas";
import * as z from "zod";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState } from "react";
import { Button } from "../ui/button";
import { useAppStore } from "@/store";
import { createCategory } from "@/actions/add-category";
import { getCategories } from "@/actions/get-all-categories";
import { updateCategory } from "@/actions/update-category";
import { toast } from "sonner";

const AddCategoryForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { setCategoriesData, setToggleSheet, editCategory, setEditCategory } =
    useAppStore();
  const [newCategoryName, setNewCategoryName] = useState<string | undefined>(
    editCategory?.categoryName
  );

  const form = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      categoryName: editCategory ? editCategory.categoryName : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
    setError("");
    setSuccess("");
    const { error, success } = await createCategory(values);
    if (error) {
      toast.error("Please provide a unique category name.");
      setToggleSheet(false);
    }
    if (success) {
      toast.success("Category created successfully.");
      setToggleSheet(false);
    }
    const response = await getCategories();
    if (response && response.length > 0) {
      setCategoriesData(response);
    }

    form.reset();
    return;
  };

  const handleCancle = () => {
    setToggleSheet(false);
    setEditCategory({ categoryName: "", id: "" });
    form.reset();
  };
  const isLoading = form.formState.isSubmitting;

  const handleUpdate = async () => {
    if (newCategoryName && editCategory) {
      const { error, success } = await updateCategory(
        newCategoryName,
        editCategory.id
      );
      if (success) {
        toast.success("Category updated successfully.");
      }
      if (error) {
        toast.error("Error updating category.");
      }
      const response = await getCategories();
      if (response && response.length) {
        setCategoriesData(response);
        setEditCategory({ categoryName: "", id: "" });
        setToggleSheet(false);
      }
    }
  };
  return (
    <div>
      {editCategory && editCategory.categoryName.length ? (
        <div>
          <Input
            onChange={(e) => setNewCategoryName(e.target.value)}
            disabled={isLoading}
            className="w-[99%] ml-[1px] bg-transparent text-white mt-4 border-secondary-black focus:outline-none placeholder:text-custom-font"
            placeholder="Enter category name"
            value={newCategoryName}
          />
          <div className="fixed bottom-0 right-0 w-[384px]  p-4 flex gap-4">
            <Button
              size={"sm"}
              disabled={isLoading}
              className="w-1/4 bg-secondary-blue border-none hover:bg-secondary-blue rounded-xl mr-4"
              onClick={() => handleUpdate()}
            >
              Update
            </Button>
            <Button
              size={"sm"}
              disabled={isLoading}
              onClick={handleCancle}
              className="w-1/4 bg-transparent border border-secondary-black hover:bg-transparent rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
            <div className="flex h-full flex-col">
              <div className="h-[80%] overflow-y-scroll scrollbar-hide">
                <div className="my-6 text-primary-text">
                  <FormField
                    control={form.control}
                    name="categoryName"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-custom-font">
                          Category Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="w-[99%] ml-[1px] bg-transparent border-secondary-black focus:outline-none placeholder:text-custom-font"
                            placeholder="Enter category name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
      )}
      {/* <div className="fixed bottom-0 right-0 w-[384px]  p-4 flex justify-end gap-4">
        <div className="w-full">
          {editCategory && editCategory.categoryName.length > 0 ?
            <Button
              size={"sm"}
              type="button"
              disabled={isLoading}
              className="w-1/4 bg-secondary-blue border-none hover:bg-secondary-blue rounded-xl mr-4"
              onClick={() => handleUpdate()}
            >
              Update
            </Button> :
            <Button
              size={"sm"}
              type="submit"
              disabled={isLoading}
              className="w-1/4 bg-secondary-blue border-none hover:bg-secondary-blue rounded-xl mr-4"
            >
              Save
            </Button>
          }
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
      </div> */}
    </div>
  );
};

export default AddCategoryForm;
