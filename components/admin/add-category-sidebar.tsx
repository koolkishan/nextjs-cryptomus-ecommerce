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
              <div className="h-full">
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
