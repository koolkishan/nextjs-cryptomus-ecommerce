"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { useAppStore } from "@/store";
import AddCategoryForm from "./add-category-form";
import { getCategories } from "@/actions/get-all-categories";
import { cn } from "@/lib/utils";

const AddCategorySideBar = () => {
  const { toggleSheet, setToggleSheet, categoriesData, setCategoriesData } =
    useAppStore();
  const toggleMenu = () => {
    setToggleSheet(!toggleSheet);
  };
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

  return (
    <div className="">
      <Sheet open={toggleSheet} onOpenChange={setToggleSheet}>
        <SheetTrigger onClick={toggleMenu}>
          <Button
            variant={"ghost"}
            className="bg-secondary-blue rounded-2xl hover:bg-secondary-blue"
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
              Add Category
            </SheetTitle>
            <SheetDescription className="text-primary-txt h-full">
              {/* display all categories */}
              <div className="border border-secondary-black rounded-xl">
                <div className="text-primary-text flex justify-between border-b border-secondary-black  py-4 px-2 ">
                  <p>Available Categories</p>
                  <p>Total {categoriesData.length}</p>
                </div>
                {categoriesData &&
                  categoriesData.length > 0 &&
                  categoriesData.map((category, index) => (
                    <div
                      key={category.id}
                      className={cn(
                        "text-secondary-gray py-3  px-2 flex items-center hover:bg-primary-surface cursor-pointer",
                        index === categoriesData.length - 1
                          ? ""
                          : "border-b border-secondary-black"
                      )}
                    >
                      <p>{category.categoryName}</p>
                    </div>
                  ))}
              </div>

              <div className="h-full">
                {/* <AddProductForm /> */}
                <AddCategoryForm />
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export { AddCategorySideBar };
