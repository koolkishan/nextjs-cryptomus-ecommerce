"use client";
import Image from "next/image"; // Make sure to import Image from 'next/image'
import { LuHeart } from "react-icons/lu";
import { ProductTypes } from "@/types";
import { IoHeartOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
interface HorizontalProductListProps {
  products: ProductTypes[];
}
const HorizontalProductList = ({ products }: HorizontalProductListProps) => {
  const router = useRouter();
  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-[50%] gap-6">
      {products.map((product: ProductTypes) => (
        <div key={product.id} className="h-full my-2 cursor-pointer">
          <div
            className="flex flex-col h-full"
            onClick={() => handleProductClick(product.id)}
          >
            {product.images && product.images.length > 0 && (
              <div className="bg-secondary-white rounded-2xl shadow-[2px_2px_2px_2px_rgba(0,0,0,0.03)]  flex justify-center items-center py-4">
                <Image
                  className=" w-[150px] h-[170px] "
                  src={product.images[0]}
                  alt="alt image"
                  width={150}
                  height={150}
                />
              </div>
            )}
            <div className="px-2 mt-4">
              <div className="flex items-center justify-center">
                <p className="flex-1 font-medium">${product.price}</p>
                <p className="text-secondary-blue">
                  <IoHeartOutline size={22} />
                </p>
              </div>
              <div className="line-clamp-2 mt-2">
                <p className="">{product.productName}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HorizontalProductList;
