"use client";

import Image from "next/image";

const DashBoard = () => {
  return (
    <div className="text-primary-text mx-5">
      <div className="text-2xl font-medium my-4">
        <p>Overview</p>
      </div>
      <div className="lg:grid lg:grid-cols-3 lg:gap-10 h-[150px] ">
        <div className="my-5 lg:my-0 flex justify-center items-center bg-surface rounded-3xl px-10">
          <div className=" flex-1">
            <p className="text-custom-font font-medium">Total Income</p>
            <p className="sm:text-4xl">$8.500</p>
          </div>
          <div className="py-5 lg:py-0">
            <Image
              src="/Dollar.png"
              className="mx-3"
              alt="in dollar"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="my-5 lg:my-0 flex justify-center items-center bg-surface rounded-3xl px-10">
          <div className=" flex-1">
            <p className="text-custom-font font-medium">Total Sales</p>
            <p className="sm:text-4xl">$8.500</p>
          </div>
          <div className="py-5 lg:py-0">
            <Image
              src="/sales.png"
              className="mx-3"
              alt="in dollar"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="my-5 lg:my-0 flex justify-center items-center bg-surface rounded-3xl px-10">
          <div className=" flex-1">
            <p className="text-custom-font font-medium">Total Customer</p>
            <p className="sm:text-4xl">$8.500</p>
          </div>
          <div className="py-5 lg:py-0">
            <Image
              src="/customer.png"
              className="mx-3"
              alt="in dollar"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
