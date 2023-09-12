import "@/app/globals.css";

import { PropsWithChildren } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Banner from "@/components/Banner";

type Props = PropsWithChildren<{}>;

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Banner/>
      <div className="py-[50px] h-[700px]  bg-gray-50 flex justify-center"><Form/></div>
      {/* <main>{children}</main>
       */}
      <Footer />
    </>
  );
}

export default Layout;
