import { Navbar, NextUIProvider } from "@nextui-org/react";
import NavigationBar from "@app/(components)/NavigationBar";
import LoggedNavBar from "@/app/(components)/LoggedNavBar";
import Footer from "@app/(components)/Footer";
import { ReactNode } from "react";
import { getSession } from "@/actions";

export default async function Provider({ children }: { children: ReactNode }) {
  // 2. Wrap NextUIProvider at the root of your app
  const session = await getSession();

  return (
    <NextUIProvider>
      {session.isLoggedIn ? <LoggedNavBar /> : <NavigationBar />}
      {children}
      {/* <Footer /> */}
    </NextUIProvider>
  );
}
