"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { BsFillBarChartFill, BsPhoneFill } from "react-icons/bs";
import { MdAddBox } from "react-icons/md";
import { HiCollection, HiOutlineMenuAlt2 } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { Button } from "../ui/button";
import { RxDashboard } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { useAppStore } from "@/store";
import { cn } from "@/lib/utils";

const Side = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState("/admin/dashboard");
  const [toggled, setToggled] = useState(false);
  const { collapsSidbar } = useAppStore();

  useEffect(() => {
    setSelectedItem(pathname);
  }, [pathname]);

  const menuItems = [
    { label: "Dashboard", icon: <RxDashboard />, link: "/admin/dashboard" },
    {
      label: "Ecommerce",
      icon: <FiShoppingCart />,
      subMenuItems: [
        {
          label: "Products",
          icon: <GoDotFill />,
          link: "/admin/category/add-category",
        },
        {
          label: "Orders",
          icon: <GoDotFill />,
          link: "/admin/category/all-category",
        },
        {
          label: "Customers",
          icon: <GoDotFill />,
          link: "/admin/category/reports",
        },
      ],
    },
    // {
    //   label: "Product",
    //   icon: <BsPhoneFill />,
    //   subMenuItems: [
    //     {
    //       label: "Add Product",
    //       icon: <MdAddBox />,
    //       link: "/admin/products/add-product",
    //     },
    //     {
    //       label: "All Products",
    //       icon: <HiCollection />,
    //       link: "/admin/products/all-products",
    //     },
    //     {
    //       label: "Reports",
    //       icon: <BsFillBarChartFill />,
    //       link: "/admin/products/reports",
    //     },
    //   ],
    // },
    // { label: "Orders", icon: <FaShoppingCart />, link: "/admin/orders" },
  ];

  const handleItemClick = (link: string) => {
    setSelectedItem(link);
    //   router.push(link);
  };

  return (
    <div
      className={`min-h-[100vh] overflow-hidden border-none ${
        collapsSidbar ? "collapsed" : ""
      }`}
    >
      <Sidebar
        collapsed={collapsSidbar}
        className="h-full overflow-hidden border-nonde"
        toggled={toggled}
        onBackdropClick={() => setToggled((prev) => !prev)}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#1D1E24",
            "&:hover": {
              backgroundColor: "#1D1E24",
            },
          },
        }}
      >
        <div className="text-primary-text flex  pl-[30px] my-5">
          <Image
            className="mr-4"
            src="/Rocket.png"
            alt="logo png"
            width={20}
            height={20}
          />
          <p className={cn(!collapsSidbar ? "text-start" : "hidden")}>Rocket</p>
        </div>
        <Menu
          className="h-[100vh] max-h-[100vh] text-white overflow-hidden border-none"
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              const backgroundColor = level === 0 ? "" : "#23262B";

              return {
                backgroundColor: active ? "#23262B" : backgroundColor,
                "&:hover": {
                  backgroundColor: active ? "#212c3a" : "#2c3a4d",
                },
              };
            },
          }}
        >
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.subMenuItems ? (
                <SubMenu label={item.label} icon={item.icon}>
                  {item.subMenuItems.map((subItem, subIndex) => (
                    <MenuItem
                      key={subIndex}
                      onClick={() => handleItemClick(subItem.link)}
                      icon={subItem.icon}
                      active={selectedItem === subItem.link}
                    >
                      {subItem.label}
                    </MenuItem>
                  ))}
                </SubMenu>
              ) : (
                <MenuItem
                  onClick={() => handleItemClick(item.link)}
                  icon={item.icon}
                  active={selectedItem === item.link}
                >
                  {item.label}
                </MenuItem>
              )}
            </React.Fragment>
          ))}
          <MenuItem
            onClick={() => handleItemClick("/admin/logout")}
            icon={<LuLogOut />}
            active={selectedItem === "/admin/logout"}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Side;
