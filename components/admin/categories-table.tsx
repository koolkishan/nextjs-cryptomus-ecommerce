import {
  MdOutlineDelete,
  MdOutlineEdit,
} from "react-icons/md";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";
import { useAppStore } from "@/store";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryTypes, CategoryWithProductCount } from "@/types";
import { getAllCategorisWithProductCount } from "@/actions/get-all-categories-with-product-count";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import CategoryModal from "./category-modal";
import { deleteCategory } from "@/actions/delete-category";
import { getCategories } from "@/actions/get-all-categories";
import { toast } from "sonner";

interface CategoriesTableProps {
  categories: boolean;
}
const CategoriesTable = ({ categories }: CategoriesTableProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesWithProductCount, setCategoriesWithProductCount] = useState<
    CategoryWithProductCount[] | []
  >([]);
  const [searchCategories, setSearchCategories] = useState<
    CategoryTypes[] | []
  >([]);
  const { setViewingCategoryId } = useAppStore();
  const [searchTerms, setSearchTerms] = useState<string>("");
  const { categoriesData, setCategoriesData, setToggleSheet, setEditCategory } =
    useAppStore();
  const [categoryModal, setsetCategoryModal] = useState<boolean>(false);

  const debouncedSearchValue = useDebounce(searchTerms, 300);
  const itemsPerPage = 10;

  useEffect(() => {
    setIsMounted(true);
    async function getCategoriesProduct() {
      const result = await getAllCategorisWithProductCount();
      setCategoriesWithProductCount(result);
    }
    getCategoriesProduct();
  }, []);

  useEffect(() => {
    if (debouncedSearchValue && debouncedSearchValue.length > 0) {
      const filteredData = categoriesWithProductCount.filter(
        (item: CategoryTypes) =>
          item.categoryName
            .toLowerCase()
            .includes(debouncedSearchValue.toLowerCase())
      );
      setSearchCategories(filteredData);
    }
  }, [debouncedSearchValue, categoriesWithProductCount]);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  let currentItems;

  if (!isMounted) {
    return null;
  }

  if (categories) {
    currentItems = categoriesData.slice(firstIndex, lastIndex);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    if (searchTerm) {
      setSearchTerms(searchTerm);
    }
    if (!searchTerm) {
      setSearchTerms("");
      setSearchCategories([]);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchCategory = (editCategory: CategoryTypes) => {
    setToggleSheet(true);
    setEditCategory(editCategory);
  };

  const handleDelete = async (id: string, categoryName: string) => {
    const result = await getAllCategorisWithProductCount();
    setCategoriesWithProductCount(result);
    const categoryDetails = categoriesWithProductCount.find(
      (c) => c.categoryName === categoryName
    );
    if (categoryDetails?.products?.length === 0) {
      await deleteCategory(id);
      const response = await getCategories();
      if (response && response.length) {
        setCategoriesData(response);
      } else {
        setCategoriesData([]);
      }
    } else {
      toast.info("You can't delete this category as it has products.");
    }
  };

  const handleEdit = (id: string) => {
    setViewingCategoryId(id);
    setsetCategoryModal(true);
  };

  return (
    // categoriesData &&
    // categoriesData.length > 0 && (
    <div>
      <CategoryModal
        // category={item}
        setsetCategoryModal={setsetCategoryModal}
        categoryModal={categoryModal}
      />
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
                placeholder="Search Categories..."
                type="text"
                name="search"
                onChange={handleChange}
              />
              <div className="absolute z-50 top-full left-0 w-full my-1 bg-surface rounded-b-xl rounded-md shadow-2xl">
                {searchCategories &&
                  searchCategories.length > 0 &&
                  searchCategories.map((c: CategoryTypes, index: number) => {
                    return (
                      <div
                        key={c.id}
                        className={cn(
                          "px-3",
                          index === searchCategories.length - 1
                            ? ""
                            : "border-b border-secondary-black"
                        )}
                      >
                        <p
                          onClick={() => handleSearchCategory(c)}
                          className="px-2 py-3 my-2 hover:bg-primary-background rounded-2xl cursor-pointer"
                        >
                          {c.categoryName}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </label>
        </div>
        <div className="w-full">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="hover:bg-surface text-primary-text font-medium border-b-secondary-black">
                {/* {categories && categoriesData.length ? ( */}
                <>
                  <TableHead className="text-primary-text font-medium">No</TableHead>
                  <TableHead className="text-primary-text font-medium">Category Name</TableHead>
                  <TableHead className="text-primary-text font-medium">Total Products</TableHead>
                  <TableHead className="text-primary-text font-medium">Edit</TableHead>
                  <TableHead className="text-primary-text font-medium">Delete</TableHead>
                </>
                {/* ) : null} */}
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {currentItems &&
                currentItems.map((item: CategoryTypes, index: number) => (
                  <>
                    {/* <CategoryModal category={item} setsetCategoryModal={setsetCategoryModal} categoryModal={categoryModal} /> */}
                    <TableRow
                      // onClick={() => setsetCategoryModal(true)}
                      key={item.id}
                      className="hover:bg-primary-background font-light border-b-secondary-black cursor-pointer"
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="">{item.categoryName}</TableCell>

                      <TableCell className="line-clamp-1">
                        <div className="flex-1">
                          {categoriesWithProductCount &&
                            categoriesWithProductCount.length > 0 &&
                            categoriesWithProductCount.find(
                              (c) => c.categoryName === item.categoryName
                            )
                            ? categoriesWithProductCount.find(
                              (c) => c.categoryName === item.categoryName
                            )?.products?.length ?? 0
                            : 0}
                        </div>
                      </TableCell>
                      <TableCell>
                        <MdOutlineEdit
                          size={22}
                          className="text-secondary-blue"
                          // onClick={() => setsetCategoryModal(true)}
                          onClick={() => handleEdit(item.id)}
                        />
                        {/* <CategoryModal
                          category={item}
                          setsetCategoryModal={setsetCategoryModal}
                          categoryModal={categoryModal}
                        /> */}
                      </TableCell>
                      <TableCell>
                        <MdOutlineDelete
                          size={22}
                          className="text-red-400/80"
                          onClick={() =>
                            handleDelete(item.id, item.categoryName)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
          {currentItems && currentItems.length > 0 && (
              <div className="flex items-center">
              <div className="flex-1 px-4 text-custom-font">Total {Math.ceil(categoriesData.length)} Categories</div>
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
                  {[...Array(Math.ceil(categoriesData.length / itemsPerPage))].map((_, index) => (
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
                      disabled={currentPage === Math.ceil(categoriesData.length / itemsPerPage)}
                    >
                      <PaginationNext
                        className={cn(
                          "",
                          currentPage === Math.ceil(categoriesData.length / itemsPerPage)
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
          )}
        </div>

      </div>
      {currentItems && currentItems.length === 0 && (
        <div className="text-center text-custom-font mt-4">No Categoryies Are Availabe</div>
      )}

    </div>
  );
};

export default CategoriesTable;
