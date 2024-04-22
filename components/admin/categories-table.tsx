import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { CategoryTypes, CategoryWithProductCount } from "@/types";
import { getAllCategorisWithProductCount } from "@/actions/get-all-categories-with-product-count";
import useDebounce from "@/hooks/useDebounce";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { cn } from "@/lib/utils";
import CategoryModal from "./category-modal";
import { deleteCategory } from "@/actions/delete-category";
import { getCategories } from "@/actions/get-all-categories";

interface CategoriesTableProps {
  categories: boolean;
}
const CategoriesTable = ({ categories }: CategoriesTableProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<CategoryTypes[] | []>([]);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [categoriesWithProductCount, setCategoriesWithProductCount] = useState<CategoryWithProductCount[] | []>([]);
  const [searchCategories, setSearchCategories] = useState<CategoryTypes[] | []>([]);
  const [searchTerms, setSearchTerms] = useState<string>("");
  const { setOpenModal, openModal, categoriesData, setCategoriesData, setToggleSheet, setEditCategory } = useAppStore();
  const [categoryModal, setsetCategoryModal] = useState<boolean>(false)

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

  const toggleSelectAll = () => {
    if (allSelected) {
      setAllSelected(false);
      setSelectedRows([]);
    } else {
      if (categories) {
        setSelectedRows([...categoriesData]);
        setAllSelected(true);
      }
    }
  };

  const toggleRowSelection = (item: CategoryTypes) => {
    if (selectedRows.some((row: CategoryTypes) => row.id === item.id)) {
      setSelectedRows(selectedRows.filter((row: CategoryTypes) => row.id !== item.id));
    } else {
      setSelectedRows([...selectedRows, item]);
    }
  };

  const isRowSelected = (item: CategoryTypes) => {
    return selectedRows.some((row: CategoryTypes) => row.id === item.id);
  };

  const handleSearchCategory = (editCategory:CategoryTypes) => {
    console.log('handleSearchCategory ~ editCategory:', editCategory)
    setToggleSheet(true);
    setEditCategory(editCategory)
  }
  const tableHeaderKeys = categoriesData.length
    ? Object.keys(categoriesData[0])
      .filter(
        (key) => key !== "id" && key !== "createdAt" && key !== "updatedAt"
      )
      .map((key) => key.charAt(0).toUpperCase() + key.slice(1))
    : [];

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    const response = await getCategories();
    if (response && response.length) {
      setCategoriesData(response);
      // setsetCategoryModal(false);
    } else {
      setCategoriesData([]);
    }
  }

  return (
    categoriesData && categoriesData.length > 0 &&
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
                    <div key={c.id} className={cn('px-3', index === searchCategories.length - 1 ? '' : 'border-b border-secondary-black')}>
                      <p onClick={() => handleSearchCategory(c)} className="px-2 py-3 my-2 hover:bg-primary-background rounded-2xl cursor-pointer">
                        {c.categoryName}
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
              {categories && categoriesData.length ? (
                <>
                  <TableHead>
                    <Input
                      type="checkbox"
                      className="h-5 w-5 rounded border-red-500 checked:bg-red-500 checked:border-transparent"
                      checked={selectedRows.length === categoriesData.length}
                      onChange={toggleSelectAll}
                    />
                  </TableHead>
                  {tableHeaderKeys.map((key) => (
                    <TableHead key={key} className="text-custom-font">
                      {key}
                    </TableHead>
                  ))}
                </>
              ) : null}
              <TableHead className="text-custom-font">TotalProducts</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="">
            {currentItems &&
              currentItems.map((item: CategoryTypes) => (
                <>
                  {/* <CategoryModal category={item} setsetCategoryModal={setsetCategoryModal} categoryModal={categoryModal} /> */}
                  <TableRow
                    // onClick={() => setsetCategoryModal(true)}
                    key={item.id}
                    className="hover:bg-primary-background  border-b-secondary-black cursor-pointer"
                  >
                    <TableCell>
                      <Input
                        type="checkbox"
                        className="h-5 w-5 rounded border-red-500 checked:bg-red-500 checked:border-transparent"
                        checked={isRowSelected(item)}
                        onChange={() => toggleRowSelection(item)}
                      />
                    </TableCell>
                    <TableCell className="">{item.categoryName}</TableCell>

                    <TableCell className="line-clamp-1">
                      <div className="flex ">
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
                        <div>
                          <HoverCard >
                            <HoverCardTrigger><PiDotsThreeOutlineVerticalFill /></HoverCardTrigger>
                            <HoverCardContent className="w-32 bg-surface border border-secondary-black mr-4  ">
                              <div className="text-custom-font ">
                                <p onClick={() => setsetCategoryModal(true)} className="border-b border-secondary-black p-2 hover:bg-primary-background rounded-xl text-center">Edit</p>
                                <p onClick={() => handleDelete(item.id)} className="p-2 hover:bg-primary-background rounded-xl text-center">Delete</p>
                              </div>
                              <CategoryModal category={item} setsetCategoryModal={setsetCategoryModal} categoryModal={categoryModal} />
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

            {[...Array(Math.ceil(categoriesData.length / itemsPerPage))].map(
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
                currentPage === Math.ceil(categoriesData.length / itemsPerPage)
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

export default CategoriesTable;
