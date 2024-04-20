import { Button } from "../ui/button";
import ProductsTable from "./products-table";
import { FiPlus } from "react-icons/fi";

const Products = () => {
  return (
    <div className="text-primary-text">
      <div className="text-2xl flex justify-center items-center font-medium mt-4">
        <p className="flex-1">Products</p>
        <Button
          variant={"ghost"}
          className="bg-[#2b90ff] rounded-2xl hover:bg-[#2b90ff]"
        >
          <FiPlus />
        </Button>
      </div>
      <div className="">
        <ProductsTable />
      </div>
    </div>
  );
};

export default Products;
