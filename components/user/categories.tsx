import { getAllCategories } from "@/data/category";
import { cn } from "@/lib/utils";
import { CategoryTypes } from "@/types";
import { useEffect, useState } from "react";

const Categories = () => {
  const [allCategories, setAllCategories] = useState<CategoryTypes[] | []>([]);
  console.log("Categories ~ allCategories:", allCategories);

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
        <ul className="bg-blue-400/15 py-5 border border-blue-400/20 grid gap-8 grid-cols-3 md:grid-cols-6 text-center my-4">
          {allCategories.map((category, index) => (
            <li
              key={category.id}
              className={cn("hover:bg-blue-400/30 py-3 rounded-xl")}
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
