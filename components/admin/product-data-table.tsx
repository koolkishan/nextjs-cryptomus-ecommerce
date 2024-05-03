"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "../ui/input";
import { IoIosSearch } from "react-icons/io";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineDelete,
  MdOutlineEdit,
} from "react-icons/md";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ProductTypes } from "@/types";
import { useAppStore } from "@/store";
import ProductModal from "./product-modal";
import { getProducts } from "@/actions/get-products";
import { deleteProduct } from "@/actions/delete-product";
import useDebounce from "@/hooks/useDebounce";
import { toast } from "sonner";


interface DataTableProps {
  products: boolean;
}
export const DataTable = ({ products }: DataTableProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productModal, setProductModal] = useState<boolean>(false);
  const [currentItems, setCurrentItems] = useState<ProductTypes[] | []>([]);
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [searchProducts, setSearchProducts] = useState<ProductTypes[] | []>([]);

  const { productsData, setviewingProductId, categoriesData, setProductsData } =
    useAppStore();

  const itemsPerPage = 10;
  const debouncedSearchValue = useDebounce(searchTerms, 300);

  useEffect(() => {
    if (debouncedSearchValue && debouncedSearchValue.length > 0) {
      const filteredData = productsData.filter((item: ProductTypes) =>
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

  const handleDelete = async (id: string) => {
    console.log('handleDelete ~ id:', id);
    await deleteProduct(id);
    const response = await getProducts();
    if (response && response.length > 0) {
      setProductsData(response);
      toast.success("Product deleted successfully.");
    } else {
      setProductsData([]);
    }
  };

  const handleProductEdit = async (id: string) => {
    setviewingProductId(id);
    setProductModal(true);

  };

  return (
    <>
      <div className="bg-surface rounded-3xl">
        <ProductModal
          productModal={productModal}
          setProductModal={setProductModal}
        />

        <div className=" felx justify-center items-center py-4 px-5 mt-2">
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
                      <div
                        key={c.id}
                        className={cn(
                          "px-3",
                          index === searchProducts.length - 1
                            ? ""
                            : "border-b border-secondary-black"
                        )}
                      >
                        <p
                          onClick={() => handleProductEdit(c.id)}
                          className="px-2 py-3 my-2 hover:bg-primary-background rounded-2xl cursor-pointer"
                        >
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
                <>
                  <TableHead className="text-base text-primary-text">No</TableHead>
                  <TableHead className="text-base text-primary-text">Product Name</TableHead>
                  <TableHead className="text-base text-primary-text">Price</TableHead>
                  <TableHead className="text-base text-primary-text">Discount</TableHead>
                  <TableHead className="text-base text-primary-text">Categor Name</TableHead>
                  <TableHead className="text-base text-primary-text">Quantity</TableHead>
                  <TableHead className="text-base text-primary-text">Available</TableHead>
                  <TableHead className="text-base text-primary-text">Edit</TableHead>
                  <TableHead className="text-base text-primary-text">Delete</TableHead>
                </>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentItems &&
                currentItems.map((item: ProductTypes, index: number) => (
                  <>
                    <TableRow
                      key={item.id}
                      className="hover:bg-primary-background text-primary-text font-light  border-b-secondary-black cursor-pointer"
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="">{item.productName}</TableCell>
                      <TableCell className="">
                        ${item.price.toLocaleString('us')}
                      </TableCell>
                      <TableCell>{item.discount}%</TableCell>
                      <TableCell className="">
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
                        </div>
                      </TableCell>
                      <TableCell>
                        <MdOutlineEdit
                          size={22}
                          className="text-secondary-blue"
                          onClick={() => handleProductEdit(item.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <MdOutlineDelete
                          size={22}
                          className="text-red-400/80"
                          onClick={() => handleDelete(item.id)}
                        />
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>

          {
            products && productsData.length > 0 && (
                <div className="flex items-center">
                <div className="flex-1 px-4 text-custom-font">Total {Math.ceil(productsData.length)} Products</div>
              <div className="flex justify-end mt-1 pb-2   ">
                <div className="flex justify-center items-center my-7">
                  <Pagination className="flex justify-end ">
                  <PaginationContent className="text-secondary-blue">
                    <PaginationItem>
                      <Button variant={"link"} disabled={currentPage === 1}>
                        <PaginationPrevious
                          className={cn(
                            "",
                            currentPage === 1
                              ? "cursor-not-allowed text-zinc-400 hover:text-zinc-400"
                              : "transition-all duration-500 hover:text-primary-text text-secondary-blue hover:bg-secondary-blue hove  "
                          )}
                          href="#"
                          onClick={() => handlePageChange(currentPage - 1)}
                        />
                      </Button>
                    </PaginationItem>
                    {[...Array(Math.ceil(productsData.length / itemsPerPage))].map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          className={cn(
                            "hover:bg-secondary-blue hover:text-primary-text border-none",
                            currentPage === index + 1
                              ? "bg-secondary-blue text-white"
                              : ""
                          )}
                          href="#"
                          onClick={() => handlePageChange(index + 1)}
                          isActive={currentPage === index + 1}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <Button
                        variant={"link"}
                        disabled={currentPage === Math.ceil(productsData.length / itemsPerPage)}
                      >
                        <PaginationNext
                          className={cn(
                            "",
                            currentPage === Math.ceil(productsData.length / itemsPerPage)
                              ? "cursor-not-allowed text-zinc-400 hover:text-zinc-400"
                              : "transition-all duration-500 hover:text-primary-text text-secondary-blue hover:bg-secondary-blue hove  "

                          )}
                          href="#"
                          onClick={() => handlePageChange(currentPage + 1)}
                        />
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                </div>
              </div>
                </div>
            )
          }
        </div>
      </div>
      {products && productsData.length > 0 ? "" : <div className="text-center mt-4 text-custom-font"><p>No Products Are Availabes</p></div>}

    </>);
};

export default DataTable;
