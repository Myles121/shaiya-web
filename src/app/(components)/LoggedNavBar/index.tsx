"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Skeleton,
} from "@nextui-org/react";
import { logout, getSession } from "@app/_lib/session";
import LoginModal from "@app/(components)/LoginModal";
import RegisterModal from "@app/(components)/RegisterModal";
import { AcmeLogo } from "@public/Acmelogo";

export interface User {
  isLoggedIn: boolean;
  user_id: string;
  UserID: string;
  Email: string | null;
  Admin: boolean;
  AdminLevel: number;
}

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [session, setSession] = useState<{
    isLoggedIn: boolean;
    user_id: string | null;
    username: string | null;
    email: string | null;
    isAdmin: boolean;
    adminLevel: number | null;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession({
        isLoggedIn: sessionData.isLoggedIn ?? false,
        user_id: sessionData.user_id ?? null,
        username: sessionData.username ?? null,
        email: sessionData.email ?? null,
        isAdmin: sessionData.isAdmin ?? false,
        adminLevel: sessionData.adminLevel ?? null,
      });
      setLoading(false);
    };
    fetchSession();
  }, []);

  const handlelogout = async () => {
    await logout();
    setSession(null);
    router.push("/");
  };

  const handleLoginSuccess = (user: User) => {
    setSession({
      isLoggedIn: true,
      user_id: user.user_id,
      username: user.UserID,
      email: user.Email,
      isAdmin: user.Admin,
      adminLevel: user.AdminLevel,
    });
  };

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
          <p className="font-bold text-inherit text-md">SHAIYA M</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <DesktopMenu pathname={pathname} />
      </NavbarContent>

      <NavbarContent justify="end">
        <UserSection
          loading={loading}
          session={session}
          handleLoginSuccess={handleLoginSuccess}
          handlelogout={handlelogout}
        />
      </NavbarContent>

      <NavbarMenu>
        <MobileMenu setIsMenuOpen={function (): void {
          throw new Error("Function not implemented.");
        } } />
      </NavbarMenu>
    </Navbar>
  );
};

const DesktopMenu = ({ pathname }: { pathname: string }) => {
  const menuItems = [
    { label: "Home", href: "/home" },
    { label: "Rankings", href: "/rankings" },
    { label: "Drop List", href: "/drop-list" },
    { label: "Download", href: "/download" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {menuItems.map((item) => (
        <NavbarItem key={item.label} isActive={isActive(item.href)}>
          <Link
            href={item.href}
            color={isActive(item.href) ? "primary" : "foreground"}
          >
            {item.label}
          </Link>
        </NavbarItem>
      ))}
    </>
  );
};

const MobileMenu = ({
  setIsMenuOpen,
}: {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const mobileMenuItems = [
    { label: "Home", href: "/home" },
    { label: "Rankings", href: "/rankings" },
    { label: "Drop List", href: "/drop-list" },
    { label: "Download", href: "/download" },
  ];

  return (
    <>
      {mobileMenuItems.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`}>
          <Link
            color={
              index === 2
                ? "primary"
                : index === mobileMenuItems.length - 1
                ? "danger"
                : "foreground"
            }
            className="w-full"
            href={item.href}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </Link>
        </NavbarMenuItem>
      ))}
    </>
  );
};

const UserSection = ({
  loading,
  session,
  handleLoginSuccess,
  handlelogout,
}: {
  loading: boolean;
  session: {
    isLoggedIn: boolean;
    user_id: string | null;
    username: string | null;
    email: string | null;
    isAdmin: boolean;
    adminLevel: number | null;
  } | null;
  handleLoginSuccess: (user: User) => void;
  handlelogout: () => void;
}) => {
  return loading ? (
    <Skeleton className="flex rounded-md w-10 h-10 bg-gray-400" />
  ) : !session?.isLoggedIn ? (
    <>
      <NavbarItem className="">
        <LoginModal onLoginSuccess={handleLoginSuccess} />
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
  );
};

export default NavigationBar;
