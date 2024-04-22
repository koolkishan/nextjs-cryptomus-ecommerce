"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "../ui/input";
import { IoIosSearch } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Button } from "../ui/button";
import { Ghost } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductTypes } from "@/types";
import { useAppStore } from "@/store";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import ProductModal from "./product-modal";
import { getProduct } from "@/data/product";
import { getProducts } from "@/actions/get-products";
import { deleteProduct } from "@/actions/delete-product";
import useDebounce from "@/hooks/useDebounce";

interface DataTableProps {
  products: boolean;
}
export const DataTable = ({ products, }: DataTableProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<ProductTypes[] | []>([]);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [productModal, setProductModal] = useState<boolean>(false);
  const [currentItems, setCurrentItems] = useState<ProductTypes[] | []>([]);
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [searchProducts, setSearchProducts] = useState<ProductTypes[] | []>([]);

  const {
    productsData,
    setOpenModal,
    openModal,
    setviewingProductId,
    categoriesData,
    setProductsData,

  } = useAppStore();

  const itemsPerPage = 10;
  const debouncedSearchValue = useDebounce(searchTerms, 300);

  useEffect(() => {
    if (debouncedSearchValue && debouncedSearchValue.length > 0) {
      const filteredData = productsData.filter(
        (item: ProductTypes) =>
          item.productName
            .toLowerCase()
            .includes(debouncedSearchValue.toLowerCase())
      );
      setSearchProducts(filteredData);
    }
  }, [debouncedSearchValue, productsData]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  useEffect(() => {

    if (productsData) {
      const result = productsData.slice(firstIndex, lastIndex);
      setCurrentItems(result);
    }
  }, [productsData, firstIndex, lastIndex, isMounted]);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    if (searchTerm) {
      setSearchTerms(searchTerm);
    }
    if (!searchTerm) {
      setSearchTerms("");
      setSearchProducts([]);
    }
  };

  if (!isMounted) {
    return;
  }
  const toggleSelectAll = () => {
    if (allSelected) {
      setAllSelected(false);
      setSelectedRows([]);
    } else {
      if (products) {
        setSelectedRows([...productsData]);
        setAllSelected(true);
      }
    }
  };

  const toggleRowSelection = (item: ProductTypes) => {
    if (selectedRows.some((row: ProductTypes) => row.id === item.id)) {
      setSelectedRows(selectedRows.filter((row: ProductTypes) => row.id !== item.id));
    } else {
      setSelectedRows([...selectedRows, item]);
    }
  };

  const isRowSelected = (item: ProductTypes) => {
    console.log('isRowSelected ~ item:', item);
    return selectedRows.some((row: ProductTypes) => row.id === item.id);
  };

  const tableHeaderKeys = productsData.length
    ? Object.keys(productsData[0])
      .filter(
        (key) =>
          key !== "id" &&
          key !== "createdAt" &&
          key !== "updatedAt" &&
          key !== "images" &&
          key !== "description" &&
          key !== "tags"
      )
      .map((key) =>
        key === "categoryId"
          ? "CategoryName"
          : key.charAt(0).toUpperCase() + key.slice(1)
      )
    : [];

  const handleProduct = (id: string) => {
    setOpenModal(!openModal);
    setviewingProductId(id);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    const response = await getProducts();
    if (response && response.length > 0) {
      setProductsData(response);
    }
    else {
      setProductsData([]);

    }
  }
  return (
    <div className="bg-surface rounded-3xl">
      <div className=" felx justify-center items-center py-4 px-5 mt-4">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <IoIosSearch size={22} className="text-secondary-gray " />
          </span>
          <div className="relative">
            <Input
              className="placeholder:text-secondary-gray bg-transparent w-full border border-secondary-black focus:border-none rounded-md py-2 pl-9 pr-3 shadow-sm sm:text-sm"
              placeholder="Search Products..."
              type="text"
              name="search"
              onChange={handleChange}
            />
            <div className="absolute z-50 top-full left-0 w-full my-1 bg-surface rounded-b-xl rounded-md shadow-2xl">
              {searchProducts &&
                searchProducts.length > 0 &&
                searchProducts.map((c: ProductTypes, index: number) => {
                  return (
                    <div key={c.id} className={cn('px-3', index === searchProducts.length - 1 ? '' : 'border-b border-secondary-black')}>
                      <p onClick={() => setProductModal(true)} className="px-2 py-3 my-2 hover:bg-primary-background rounded-2xl cursor-pointer">
                        {c.productName}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </label>
      </div>
      <div className="">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-surface border-b-secondary-black">
              {products && productsData.length ? (
                <>
                  <TableHead>
                    <Input
                      type="checkbox"
                      className="h-5 w-5 rounded border-red-500 checked:bg-red-500 checked:border-transparent"
                      checked={selectedRows.length === productsData.length}
                      onChange={toggleSelectAll}
                    />
                  </TableHead>
                  {tableHeaderKeys.map((key) => (
                    <TableHead key={key} className="text-custom-font">
                      {key}
                    </TableHead>
                  ))}
                  <TableHead className="text-custom-font">Available</TableHead>
                </>
              ) : null}
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentItems &&
              currentItems.map((item: ProductTypes) => (
                <>
                  <ProductModal product={item} setProductModal={setProductModal} productModal={productModal} />

                  <TableRow
                    key={item.id}
                    className="hover:bg-primary-background  border-b-secondary-black cursor-pointer"
                    onClick={() => handleProduct(item.id)}
                  >
                    <TableCell>
                      <Input
                        type="checkbox"
                        className="h-5 w-5 rounded border-red-500 checked:bg-red-500 checked:border-transparent"
                        checked={isRowSelected(item)}
                        onChange={() => toggleRowSelection(item)}
                      />
                    </TableCell>
                    <TableCell className="line-clamp-1">
                      {item.productName}
                    </TableCell>
                    <TableCell className="text-custom-font font-medium">
                      ${item.price}
                    </TableCell>
                    <TableCell>{item.discount}%</TableCell>
                    <TableCell className="text-custom-font font-medium">
                      {
                        categoriesData.find(
                          (category) => category.id === item.categoryId
                        )?.categoryName
                      }
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <div className="flex justify-between items-center">
                        <div
                          className={cn(
                            " w-[50%] text-center py-[2px]",
                            item.quantity > 0
                              ? "rounded-md bg-emerald-500/15  text-sm text-emerald-500"
                              : " rounded-md bg-destructive/15 text-sm text-destructive"
                          )}
                        >
                          {item.quantity > 0 ? "Yes" : "No"}
                        </div>
                        <div>
                          <HoverCard >
                            <HoverCardTrigger><PiDotsThreeOutlineVerticalFill /></HoverCardTrigger>
                            <HoverCardContent className="w-32 bg-surface border border-secondary-black mr-4  ">
                              <div className="text-custom-font ">
                                <p onClick={() => setProductModal(true)} className="border-b border-secondary-black p-2 hover:bg-primary-background rounded-xl text-center">Edit</p>
                                <p onClick={() => handleDelete(item.id)} className="p-2 hover:bg-primary-background rounded-xl text-center">Delete</p>
                              </div>
                              {/* onClick={() => handleDelete(item.id)} */}
                              <ProductModal product={item} setProductModal={setProductModal} productModal={productModal} />
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </Table>
        <div className="flex justify-end mt-4 pb-2 mx-5 mb-3 cursor-pointer">
          <div className="flex justify-center items-center">
            <Button
              className={`bg-primary-background hover:bg-primary-background rounded-xl`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <MdKeyboardArrowLeft size={22} />
            </Button>

            {[...Array(Math.ceil(productsData.length / itemsPerPage))].map(
              (_, i) =>
                i >= currentPage - 2 &&
                i <= currentPage + 2 && (
                  <Button
                    key={i}
                    className={`px-4 mx-3 bg-secondary-blue h-9 rounded-xl hover:bg-secondary-blue`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Button>
                )
            )}
            <Button
              className={`bg-primary-background hover:bg-primary-background rounded-xl`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(productsData.length / itemsPerPage)
              }
            >
              <MdKeyboardArrowRight size={22} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;