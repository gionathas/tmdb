import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const debugScreens =
    process.env.NODE_ENV === "development" ? "debug-screens" : "";

  return (
    <div className={`relative min-h-screen ${debugScreens}`}>
      <Header />
      <main className="">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
