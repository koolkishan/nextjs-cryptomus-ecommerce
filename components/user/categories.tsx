"use client";
import { getAllCategories } from "@/data/category";
import { cn } from "@/lib/utils";
import { CategoryTypes } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Categories = () => {
  const [allCategories, setAllCategories] = useState<CategoryTypes[] | []>([]);
  const router = useRouter();
  useEffect(() => {
    async function getAllCategory() {
      const response = await getAllCategories();
      setAllCategories(response);
    }
    getAllCategory();
  }, []);

  return (
    <div className="h-full">
      {allCategories && allCategories.length > 0 && (
        <div className="flex h-full flex-col overflow-y-scroll  scrollbar-hide">
          {allCategories.map((category, index) => (
            <p
              key={category.id}
              className={cn(
                "text-sm md:text-base cursor-pointer  hover:bg-blue-400/30 p-2"
              )}
              onClick={() => {
                router.push(`/category/${category.id}`);
              }}
            >
              {category.categoryName}
            </p>
          ))}
          {/* <p className="cursor-pointer hover:bg-blue-400/30 p-2">test</p>
          <p className="cursor-pointer hover:bg-blue-400/30 p-2">test</p>
          <p className="cursor-pointer hover:bg-blue-400/30 p-2">test</p>
          <p className="cursor-pointer hover:bg-blue-400/30 p-2">test</p>
          <p className="cursor-pointer hover:bg-blue-400/30 p-2">test</p>
          <p className="cursor-pointer hover:bg-blue-400/30 p-2">test</p>
          <p className="cursor-pointer hover:bg-blue-400/30 p-2">test</p>
          <p className="cursor-pointer hover:bg-blue-400/30 p-2">test</p>
          <p className="cursor-pointer hover:bg-blue-400/30 p-2">test</p>
          <p className="cursor-pointer hover:bg-blue-400/30 p-2">test</p>
          <p className="cursor-pointer hover:bg-blue-400/30 p-2">test</p>
          <p className="cursor-pointer hover:bg-blue-400/30 p-2">test</p>
          <p className="cursor-pointer hover:bg-blue-400/30 p-2">test</p>
          <p className="cursor-pointer hover:bg-blue-400/30 p-2">test</p>
          <p className="cursor-pointer hover:bg-blue-400/30 p-2">test</p> */}
        </div>

      )}
    </div>
  );
};

export default Categories;
