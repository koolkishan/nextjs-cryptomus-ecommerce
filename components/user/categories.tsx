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
    <div>
      {allCategories && allCategories.length > 0 && (
        <ul className="bg-secondary-white py-5  grid gap-8 grid-cols-3 md:grid-cols-6 text-center my-4">
          {allCategories.map((category, index) => (
            <li
              key={category.id}
              className={cn(
                "text-sm md:text-base cursor-pointer hover:bg-blue-400/30 py-3 rounded-xl"
              )}
              onClick={() => {
                router.push(`/category/${category.id}`);
              }}
            >
              {category.categoryName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;
