"use client";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { IoIosSearch } from "react-icons/io";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineEdit,
} from "react-icons/md";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import useDebounce from "@/hooks/useDebounce";
import OrderModal from "./order-modal";
import { orderTypes } from "@/types";
import { FaLastfmSquare } from "react-icons/fa";

interface OrderTable {
  orders: orderTypes[] | [];
  lastFiveOrders?: boolean; 
}
export const OrderTable = ({ lastFiveOrders=false ,orders }: OrderTable) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderModal, setOrderModal] = useState<boolean>(false);
  const [currentItems, setCurrentItems] = useState<orderTypes[] | []>([]);
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [searchOrders, setSearchOrders] = useState<orderTypes[] | []>([]);

  const { setViewingOrderId } = useAppStore();

  const itemsPerPage = 10;
  const debouncedSearchValue = useDebounce(searchTerms, 300);

  useEffect(() => {
    if (debouncedSearchValue && debouncedSearchValue.length > 0) {
      const filteredData = orders.filter((item: orderTypes) => {
        if (debouncedSearchValue) {
          return item.id
            .toLowerCase()
            .includes(debouncedSearchValue.toLowerCase());
        }
        return false;
      });
      setSearchOrders(filteredData);
    }
  }, [debouncedSearchValue, orders]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  useEffect(() => {
    if (orders) {
      const result = orders.slice(firstIndex, lastIndex);
      setCurrentItems(result);
    }
  }, [firstIndex, lastIndex, isMounted, orders]);

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
      setSearchOrders([]);
    }
  };

  if (!isMounted) {
    return;
  }

  const handleOrderEdit = async (id: string) => {
    setViewingOrderId(id);
    setOrderModal(true);
  };

  return (
    <>
      <div className=" bg-surface rounded-3xl">
        <OrderModal setOrderModal={setOrderModal} orderModal={orderModal} />

        <div className="flex items-center py-4 px-5 mt-4 ">
          <label className="w-full relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <IoIosSearch size={22} className="text-secondary-gray " />
            </span>
            <div className="w-full">
              <Input
                className=" placeholder:text-secondary-gray bg-transparent w-full border border-secondary-black focus:border-none rounded-md py-2 pl-9 pr-3 shadow-sm sm:text-sm"
                placeholder="Search Orders By Order Id..."
                type="text"
                name="search"
                onChange={handleChange}
              />
              <div className="absolute text-base z-50 top-full left-0 w-full my-1 bg-surface rounded-b-xl rounded-md shadow-2xl">
                {searchOrders &&
                  searchOrders.length > 0 &&
                  searchOrders.map((order: orderTypes, index: number) => {
                    return (
                      <div
                        key={order.id}
                        className={cn(
                          "px-3",
                          index === searchOrders.length - 1
                            ? ""
                            : "border-b border-secondary-black"
                        )}
                      >
                        <p
                          onClick={() => handleOrderEdit(order.id)}
                          className="px-2 py-3 my-2 hover:bg-primary-background rounded-2xl cursor-pointer"
                        >
                          {order.user?.name}
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
              <TableRow className="hover:bg-surface  border-b-secondary-black">
                <TableHead className="text-primary-text ">No</TableHead>
                <TableHead className="text-primary-text ">Order Id</TableHead>
                <TableHead className="text-primary-text ">
                  Customer Name
                </TableHead>
                <TableHead className="text-primary-text ">
                  Total Items
                </TableHead>{" "}
                <TableHead className="text-primary-text ">
                  Total Amount
                </TableHead>
                <TableHead className="text-primary-text ">
                  Total Discount
                </TableHead>
                <TableHead className="text-primary-text ">
                  Order Status
                </TableHead>
                <TableHead className="text-primary-text ">
                  Payment Status
                </TableHead>
                {/* {!lastFiveOrders &&  */}
                <TableHead className="text-primary-text ">Edit</TableHead> 
                {/* } */}
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentItems &&
                currentItems.map((order: orderTypes, index: number) => (
                  <>
                    <TableRow
                      key={order.id}
                      className="hover:bg-primary-background text-primary-text font-light  border-b-secondary-black cursor-pointer"
                    >
                      <TableCell className="">{index + 1}</TableCell>
                      <TableCell className="">{order.id}</TableCell>
                      <TableCell className="">{order.user?.name}</TableCell>
                      <TableCell>{order.products.length}</TableCell>
                      <TableCell className="">${order.totalPrice.toLocaleString('us')}</TableCell>
                      <TableCell>${order.totalDiscount.toLocaleString('us')}</TableCell>
                      <TableCell>
                        {order?.orderStatus === "cancel" ? (
                          <p className="w-fit text-red-400 border  border-red-400 bg-red-400/20 px-4 rounded-lg">
                            <p>
                              {order?.orderStatus
                                ? order.orderStatus.charAt(0).toUpperCase() +
                                  order.orderStatus.slice(1)
                                : ""}
                            </p>
                          </p>
                        ) : (
                          ""
                        )}
                        {order?.orderStatus.toLowerCase() === "pending" ? (
                          <p className="w-fit  text-yellow-400 border border-yellow-400 bg-yellow-400/20 px-4 rounded-lg">
                            <p>
                              {order?.orderStatus
                                ? order.orderStatus.charAt(0).toUpperCase() +
                                  order.orderStatus.slice(1)
                                : ""}
                            </p>
                          </p>
                        ) : (
                          ""
                        )}
                        {order?.orderStatus.toLowerCase() === "delivered" ? (
                          <p className="w-fit  text-green-400 border border-green-400 bg-green-400/20 px-4 rounded-lg">
                            <p>
                              {order?.orderStatus
                                ? order.orderStatus.charAt(0).toUpperCase() +
                                  order.orderStatus.slice(1)
                                : ""}
                            </p>
                          </p>
                        ) : (
                          ""
                        )}
                      </TableCell>
                      <TableCell>
                        {order?.paymentStatus.toLowerCase() ===
                        ("cancel" ||
                          "fail" ||
                          "system_fail" ||
                          "refund_fail" ||
                          "locked") ? (
                          <p className="w-fit text-red-400 border  border-red-400 bg-red-400/20 px-4 rounded-lg">
                            {order?.paymentStatus
                              ? order.paymentStatus.charAt(0).toUpperCase() +
                                order.paymentStatus.slice(1)
                              : ""}
                          </p>
                        ) : (
                          ""
                        )}
                        {order?.paymentStatus.toLowerCase() ===
                        ("pending" ||
                          "process" ||
                          "confirm_check" ||
                          "check" ||
                          "refund_process") ? (
                          <p className="w-fit text-yellow-400 border border-yellow-400 bg-yellow-400/20 px-4 rounded-lg">
                            {order?.paymentStatus
                              ? order.paymentStatus.charAt(0).toUpperCase() +
                                order.paymentStatus.slice(1)
                              : ""}
                          </p>
                        ) : (
                          ""
                        )}
                        {order?.paymentStatus ===
                        ("paid" || "paid_over" || "refund_paid") ? (
                          <p className="w-fit text-green-400 border border-green-400 bg-green-400/20 px-4 rounded-lg">
                            {order?.paymentStatus
                              ? order.paymentStatus.charAt(0).toUpperCase() +
                                order.paymentStatus.slice(1)
                              : ""}
                          </p>
                        ) : (
                          ""
                        )}
                      </TableCell>
                      {/* {!lastFiveOrders &&  */}
                      <TableCell>
                        <MdOutlineEdit
                          size={22}
                          className="text-secondary-blue"
                          onClick={() => handleOrderEdit(order.id)}
                        />
                      </TableCell>
                      {/* } */}
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>

          {!lastFiveOrders && currentItems && currentItems.length > 0 && (
           <div className="flex items-center">
           <div className="flex-1 px-4 text-custom-font">Total {Math.ceil(orders.length)} Orders</div>
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
               {[...Array(Math.ceil(orders.length / itemsPerPage))].map((_, index) => (
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
                   disabled={currentPage === Math.ceil(orders.length / itemsPerPage)}
                 >
                   <PaginationNext
                     className={cn(
                       "",
                       currentPage === Math.ceil(orders.length / itemsPerPage)
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
        <div className="text-center text-custom-font mt-4">
          No Orders Are Availabe
        </div>
      )}
    </>
  );
};

export default OrderTable;
