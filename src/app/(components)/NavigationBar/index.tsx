"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "./Acmelogo.jsx";

import LoginModal from "@app/(components)/LoginModal";
import RegisterModal from "@app/(components)/RegisterModal";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", href: "/home" },
    { label: "Rankings", href: "/rankings" },
    { label: "Drop List", href: "/drop-list" },
    { label: "Download", href: "/download" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="bg-gray-400/40"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">SHAIYA M</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.slice(0, 4).map((item) => (
          <NavbarItem key={item.label} isActive={isActive(item.href)}>
            <Link
              href={item.href}
              color={isActive(item.href) ? "primary" : "foreground"}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <LoginModal />
        </NavbarItem>
        <NavbarItem>
          <RegisterModal />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavigationBar;
