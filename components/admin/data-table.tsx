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
import { Input } from "../ui/input";
import { IoIosSearch } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Button } from "../ui/button";
import { Ghost } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductTypes } from "@/types";
import { useAppStore } from "@/store";

interface DataTableProps {
  products: boolean;
  orders: [];
}
export const DataTable = ({ products }: DataTableProps) => {
  // console.log("DataTable ~ products:", products);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const { productsData } = useAppStore();
  // console.log("DataTable ~ selectedRows:", selectedRows);
  const itemsPerPage = 10;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // const dummyData = [
  //   {
  //     id: 1,
  //     productName: "Product A",
  //     productNo: "P001",
  //     categoryName: "Category 1",
  //     date: "2024-04-01",
  //     price: "$50.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 2,
  //     productName: "Product B",
  //     productNo: "P002",
  //     categoryName: "Category 2",
  //     date: "2024-04-02",
  //     price: "$60.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 3,
  //     productName: "Product C",
  //     productNo: "P003",
  //     categoryName: "Category 1",
  //     date: "2024-04-03",
  //     price: "$70.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 4,
  //     productName: "Product D",
  //     productNo: "P004",
  //     categoryName: "Category 3",
  //     date: "2024-04-04",
  //     price: "$80.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 5,
  //     productName: "Product E",
  //     productNo: "P005",
  //     categoryName: "Category 2",
  //     date: "2024-04-05",
  //     price: "$90.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 6,
  //     productName: "Product F",
  //     productNo: "P006",
  //     categoryName: "Category 1",
  //     date: "2024-04-06",
  //     price: "$100.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 7,
  //     productName: "Product G",
  //     productNo: "P007",
  //     categoryName: "Category 3",
  //     date: "2024-04-07",
  //     price: "$110.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 8,
  //     productName: "Product H",
  //     productNo: "P008",
  //     categoryName: "Category 2",
  //     date: "2024-04-08",
  //     price: "$120.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 9,
  //     productName: "Product I",
  //     productNo: "P009",
  //     categoryName: "Category 1",
  //     date: "2024-04-09",
  //     price: "$130.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 10,
  //     productName: "Product J",
  //     productNo: "P010",
  //     categoryName: "Category 3",
  //     date: "2024-04-10",
  //     price: "$140.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 11,
  //     productName: "Product K",
  //     productNo: "P011",
  //     categoryName: "Category 2",
  //     date: "2024-04-11",
  //     price: "$150.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 12,
  //     productName: "Product L",
  //     productNo: "P012",
  //     categoryName: "Category 1",
  //     date: "2024-04-12",
  //     price: "$160.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 13,
  //     productName: "Product M",
  //     productNo: "P013",
  //     categoryName: "Category 3",
  //     date: "2024-04-13",
  //     price: "$170.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 14,
  //     productName: "Product N",
  //     productNo: "P014",
  //     categoryName: "Category 1",
  //     date: "2024-04-14",
  //     price: "$180.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 15,
  //     productName: "Product O",
  //     productNo: "P015",
  //     categoryName: "Category 2",
  //     date: "2024-04-15",
  //     price: "$190.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 16,
  //     productName: "Product P",
  //     productNo: "P016",
  //     categoryName: "Category 3",
  //     date: "2024-04-16",
  //     price: "$200.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 17,
  //     productName: "Product Q",
  //     productNo: "P017",
  //     categoryName: "Category 1",
  //     date: "2024-04-17",
  //     price: "$210.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 18,
  //     productName: "Product R",
  //     productNo: "P018",
  //     categoryName: "Category 2",
  //     date: "2024-04-18",
  //     price: "$220.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 19,
  //     productName: "Product S",
  //     productNo: "P019",
  //     categoryName: "Category 3",
  //     date: "2024-04-19",
  //     price: "$230.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 20,
  //     productName: "Product T",
  //     productNo: "P020",
  //     categoryName: "Category 1",
  //     date: "2024-04-20",
  //     price: "$240.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 21,
  //     productName: "Product U",
  //     productNo: "P021",
  //     categoryName: "Category 2",
  //     date: "2024-04-21",
  //     price: "$250.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 22,
  //     productName: "Product V",
  //     productNo: "P022",
  //     categoryName: "Category 1",
  //     date: "2024-04-22",
  //     price: "$260.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 23,
  //     productName: "Product W",
  //     productNo: "P023",
  //     categoryName: "Category 3",
  //     date: "2024-04-23",
  //     price: "$270.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 24,
  //     productName: "Product X",
  //     productNo: "P024",
  //     categoryName: "Category 2",
  //     date: "2024-04-24",
  //     price: "$280.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 25,
  //     productName: "Product Y",
  //     productNo: "P025",
  //     categoryName: "Category 1",
  //     date: "2024-04-25",
  //     price: "$290.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 26,
  //     productName: "Product Z",
  //     productNo: "P026",
  //     categoryName: "Category 3",
  //     date: "2024-04-26",
  //     price: "$300.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 27,
  //     productName: "Product AA",
  //     productNo: "P027",
  //     categoryName: "Category 2",
  //     date: "2024-04-27",
  //     price: "$310.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 28,
  //     productName: "Product AB",
  //     productNo: "P028",
  //     categoryName: "Category 1",
  //     date: "2024-04-28",
  //     price: "$320.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 29,
  //     productName: "Product AC",
  //     productNo: "P029",
  //     categoryName: "Category 3",
  //     date: "2024-04-29",
  //     price: "$330.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 30,
  //     productName: "Product AD",
  //     productNo: "P030",
  //     categoryName: "Category 2",
  //     date: "2024-04-30",
  //     price: "$340.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 31,
  //     productName: "Product AE",
  //     productNo: "P031",
  //     categoryName: "Category 1",
  //     date: "2024-05-01",
  //     price: "$350.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 32,
  //     productName: "Product AF",
  //     productNo: "P032",
  //     categoryName: "Category 3",
  //     date: "2024-05-02",
  //     price: "$360.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 33,
  //     productName: "Product AG",
  //     productNo: "P033",
  //     categoryName: "Category 2",
  //     date: "2024-05-03",
  //     price: "$370.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 34,
  //     productName: "Product AH",
  //     productNo: "P034",
  //     categoryName: "Category 1",
  //     date: "2024-05-04",
  //     price: "$380.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 35,
  //     productName: "Product AI",
  //     productNo: "P035",
  //     categoryName: "Category 3",
  //     date: "2024-05-05",
  //     price: "$390.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 36,
  //     productName: "Product AJ",
  //     productNo: "P036",
  //     categoryName: "Category 2",
  //     date: "2024-05-06",
  //     price: "$400.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 37,
  //     productName: "Product AK",
  //     productNo: "P037",
  //     categoryName: "Category 1",
  //     date: "2024-05-07",
  //     price: "$410.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 38,
  //     productName: "Product AL",
  //     productNo: "P038",
  //     categoryName: "Category 3",
  //     date: "2024-05-08",
  //     price: "$420.00",
  //     status: "Not Available",
  //   },
  //   {
  //     id: 39,
  //     productName: "Product AM",
  //     productNo: "P039",
  //     categoryName: "Category 2",
  //     date: "2024-05-09",
  //     price: "$430.00",
  //     status: "Available",
  //   },
  //   {
  //     id: 40,
  //     productName: "Product AN",
  //     productNo: "P040",
  //     categoryName: "Category 1",
  //     date: "2024-05-10",
  //     price: "$440.00",
  //     status: "Not Available",
  //   },
  // ];

  // Calculate pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  // const currentItems = dummyData.slice(firstIndex, lastIndex);
  let currentItems;
  // console.log("currentItems: ", currentItems);

  if (products) {
    currentItems = productsData.slice(firstIndex, lastIndex);
  }
  // Handle pagination change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Toggle select all
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

  // Toggle individual row selection
  const toggleRowSelection = (item: any) => {
    if (selectedRows.some((row: any) => row.id === item.id)) {
      setSelectedRows(selectedRows.filter((row: any) => row.id !== item.id));
    } else {
      setSelectedRows([...selectedRows, item]);
    }
  };

  // Check if a row is selected
  const isRowSelected = (item: any) => {
    return selectedRows.some((row: any) => row.id === item.id);
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
        .map((key) => key.charAt(0).toUpperCase() + key.slice(1))
    : [];

  return (
    <div className="bg-surface rounded-3xl">
      <div className=" felx justify-center items-center py-4 px-5 mt-4">
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <IoIosSearch size={22} className="text-custom-font " />
          </span>
          <Input
            className="placeholder:italic placeholder:text-custom-font bg-transparent w-full border  rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none  sm:text-sm"
            placeholder="Search Products"
            type="text"
            name="search"
          />
        </label>
      </div>
      <div className="px-5">
        <Table>
          <TableCaption>A list of your products.</TableCaption>
          <TableHeader>
            <TableRow className="hover:bg-surface border-b-custom-font">
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems &&
              currentItems.map((item: ProductTypes) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-primary-background  border-b-custom-font"
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
                    {item.category}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <p
                      className={cn(
                        "w-[50%] text-center py-[2px]",
                        item.quantity > 0
                          ? "rounded-md bg-emerald-500/15  text-sm text-emerald-500"
                          : " rounded-md bg-destructive/15 text-sm text-destructive"
                      )}
                    >
                      {item.quantity > 0 ? "Yes" : "No"}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* Pagination */}
        <div className="flex justify-end mt-4 pb-2">
          <div className="flex justify-center items-center">
            {/* Previous Button */}
            <Button
              className={`bg-primary-background hover:bg-primary-background`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <MdKeyboardArrowLeft size={22} />
            </Button>

            {/* Page Numbers */}
            {[...Array(Math.ceil(productsData.length / itemsPerPage))].map(
              (_, i) =>
                i >= currentPage - 2 &&
                i <= currentPage + 2 && ( // Show 5 page numbers at a time
                  <Button
                    variant={"ghost"}
                    key={i}
                    className={`px-3 py-1 mx-1`}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Button>
                )
            )}
            {/* Next Button */}
            <Button
              className={`bg-primary-background hover:bg-primary-background`}
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
