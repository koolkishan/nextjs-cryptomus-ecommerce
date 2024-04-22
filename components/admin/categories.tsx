"use client";

import { useEffect, useState } from "react";
import ProductsTable from "./products-table";
import { AddCategorySideBar } from "./add-category-sidebar";
import CategoriesTable from "./categories-table";

const Categories = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="text-primary-text w-full">
      <div className="text-2xl w-full flex justify-center items-center font-medium mt-4">
        <p className="flex-1">Categolries</p>
        <AddCategorySideBar />
      </div>
      <div className="">
        <CategoriesTable categories={true}/>
      </div>
    </div>
  );
};

export default Categories;
