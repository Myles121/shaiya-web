// app/dashboard/NavigationBarWrapper.tsx
"use client";  // This is a Client Component

import React from "react";
import { usePathname } from "next/navigation";
import NavigationBar from "./index";

export default function NavigationBarWrapper({ sessionData }: { sessionData: any }) {
  const pathname = usePathname();  // Client-side hook

  return <NavigationBar sessionData={sessionData} pathname={pathname} />;
}