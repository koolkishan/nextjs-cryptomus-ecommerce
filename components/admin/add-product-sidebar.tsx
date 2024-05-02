"use client";
import React, { useState } from "react";
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
import AddProductForm from "./add-product-form";
import { useAppStore } from "@/store";

const AddProductSideBar = () => {
  const { toggleSheet, setToggleSheet } = useAppStore();
  const toggleMenu = () => {
    setToggleSheet(!toggleSheet);
  };

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
          className={`bg-primary-background rounded-lg border-none h-[100vh]  overflow-y-scroll`}
        >
          <SheetHeader>
            <SheetTitle className="text-primary-text font-bold text-2xl my-4">
              Add Product
            </SheetTitle>
            <SheetDescription className="text-primary-txt h-full">
              <div >
                <AddProductForm />
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export { AddProductSideBar };
