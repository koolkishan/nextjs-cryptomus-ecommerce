"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import { LuLogOut } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { signOut } from "next-auth/react";

const Side = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState("/admin/dashboard");
  const [toggled, setToggled] = useState(false);
  const { collapsSidbar, setCollapsSidbar } = useAppStore();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setSelectedItem(pathname);
  }, [pathname]);

  const menuItems = [
    { label: "Dashboard", icon: <RxDashboard />, link: "/admin/dashboard" },
    {
      label: "Products",
      icon: <GoDotFill />,
      link: "/admin/products",
    },
    {
      label: "Orders",
      icon: <GoDotFill />,
      link: "/admin/order",
    },
    {
      label: "Categories",
      icon: <GoDotFill />,
      link: "/admin/categories",
    },
  ];

  const handleItemClick = (link: string) => {
    setSelectedItem(link);
    router.push(link);
  };
  if (!isMounted) {
    return null;
  }
  
  return (
    <div className={` border-none ${collapsSidbar ? "collapsed" : ""}`}>
      <Sidebar
        collapsed={collapsSidbar}
        className={cn("overflow-hidden border-none h-screen ")}
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
            loading="lazy"
          />
          <p className={cn(!collapsSidbar ? "text-start" : "hidden")}>Rocket</p>
        </div>
        <Menu
          className="text-white overflow-hidden border-none"
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
              {
                // false ? (
                // <SubMenu label={item.label} icon={item.icon}>
                //   {item.subMenuItems.map((subItem, subIndex) => (
                //     <MenuItem
                //       key={subIndex}
                //       onClick={() => handleItemClick(subItem.link)}
                //       icon={subItem.icon}
                //       active={selectedItem === subItem.link}
                //     >
                //       {subItem.label}
                //     </MenuItem>
                //   ))}
                // </SubMenu>
                //   <div></div>
                // ) : (
                <MenuItem
                  onClick={() => handleItemClick(item.link)}
                  icon={item.icon}
                  active={selectedItem === item.link}
                >
                  {item.label}
                </MenuItem>
              }
            </React.Fragment>
          ))}
          <MenuItem
            onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
            icon={<LuLogOut />}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Side;
