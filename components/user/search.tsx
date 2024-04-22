"use client";
import { Input } from "@/components/ui/input";
// import { dealOfTheDay } from "@/data-access/products";
import { ProductTypes } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  // const [searchItem, setsearchItem] = useState<ProductTypes[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  // const { setSearchTerm } = useAppStore();
  const [searchTerm, setsearchTerm] = useState<string>('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    // let searchedProducts: typeof dealOfTheDay = [];
    // const seenProductIds: number[] = [];
    // const seenProductTitles: string[] = [];

    if (searchTerm) {
      setsearchTerm(searchTerm);
      // searchedProducts = dealOfTheDay.filter((product) => {
      //   const matchesSearchTerm = product.name
      //     .toLowerCase()
      //     .trim()
      //     .includes(searchTerm);
      //   if (
      //     matchesSearchTerm &&
      //     !seenProductIds.includes(product.id) &&
      //     !seenProductTitles.includes(product.name.toLowerCase().trim())
      //   ) {
      //     seenProductIds.push(product.id);
      //     seenProductTitles.push(product.name.toLowerCase().trim());
      //     return true;
      //   }
      // return false;
      // });
    }
    // setsearchItem(searchedProducts);
    setSelectedIndex(-1);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        // prevIndex < searchItem.length - 1 ? prevIndex + 1 : prevIndex
        prevIndex < 3 - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
    // else if (e.key === "Enter" && selectedIndex >= 0) {
    //   // Handle Enter key if an item is selected
    //   const selectedProduct = searchItem[selectedIndex];
    // }
  };

  return (
    <div className="relative ">
      <div className="flex items-center">
        <Input
          onChange={(e) => setsearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border-black/20 outline-none bg-transparent text-zinc-600  placeholder:text-primary-gray "
          placeholder="Search..."
          value={searchTerm}
        />
        {/* focus-visible:outline-blue-400 focus-visible:border-none */}
        <IoSearchOutline size={40} className="text-primary-text bg-secondary-blue p-2 rounded-r-lg ml-[-3px] " />
      </div>
      <div className="absolute  w-full bg-primary-dark shadow-2xl rounded-lg ">
        {/* {Array.from({ length: 5 }).map((_, index) => (
          <p key={index}>{index + 10}</p>
        ))} */}
      </div>
    </div>
  );
};

export default Search;

// {/* {searchItem &&
//           searchItem.map((product: ProductTypes, index: number) => {
//             const isSelected = index === selectedIndex;
//             return (
//               <div
//                 key={index}
//                 className={`m-4 border-b border-gray-200/15 ${isSelected ? "border-b-gray-400" : ""}`}
//                 onMouseEnter={() => setSelectedIndex(index)}
//               >
//                 <p
//                   onClick={(e: any) => {
//                     setSearchTerm(e.target.innerText);
//                     router.push(
//                       `/search/${e.target.innerText.split(" ").join("")}`
//                     );
//                     // setsearchTerm(null);
//                     setsearchItem([]);
//                   }}
//                   className="truncate mb-4 cursor-pointer"
//                 >
//                   {product.title}
//                 </p>
//               </div>
//             );
//           })} */}