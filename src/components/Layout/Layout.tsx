import "@/app/globals.css";

import { PropsWithChildren } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = PropsWithChildren<{}>;

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
