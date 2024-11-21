"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Skeleton,
} from "@nextui-org/react";

import Link from "next/link";

import { AcmeLogo } from "@public/Acmelogo";
import { logout, getSession } from "@app/_lib/session";
import LoginModal from "@app/(components)/LoginModal";
import RegisterModal from "@app/(components)/RegisterModal";

import { useRouter } from "next/navigation";

const NavigationBar = () => {
  // const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter(); 

  const [session, setSession] = useState<{
    isLoggedIn: boolean;
    username: string | null;
    email: string | null;
    isAdmin: boolean;
    adminLevel: number | null;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
      setLoading(false);
    };
    fetchSession();
  }, []);

  const handlelogout = async () => {
    await logout(); 
    setSession(null)
    router.push("/")
  };

  // Define the onLoginSuccess function here
  const handleLoginSuccess = (user: any) => {
    // Update session state after successful login
    setSession({
      isLoggedIn: true,
      username: user.UserID,
      email: user.Email,
      isAdmin: user.Admin,
      adminLevel: user.AdminLevel,
    });
  };

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
      // onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="bg-gray-400/40"
    >
      <NavbarContent>
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
        {loading ? ( // Show nothing or a skeleton loader while loading
          <Skeleton className="flex rounded-md w-10 h-10 bg-gray-400" />
        ) : !session?.isLoggedIn ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <LoginModal onLoginSuccess={handleLoginSuccess}/>
            </NavbarItem>
            <NavbarItem>
              <RegisterModal />
            </NavbarItem>
          </>
        ) : (
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <div className="flex items-center justify-center cursor-pointer w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white text-lg font-bold rounded-md shadow-lg hover:scale-110 transition-transform duration-300">
                {session?.email?.charAt(0).toUpperCase()}
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">@{session?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">Account Settings</DropdownItem>
              <DropdownItem onPress={handlelogout} color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>

      {/* <NavbarMenu>
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
      </NavbarMenu> */}
    </Navbar>
  );
};

export default NavigationBar;
