import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
