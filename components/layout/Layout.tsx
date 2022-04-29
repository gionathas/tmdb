import classNames from "classnames";
import { isUndefined } from "lodash";
import React, { useEffect } from "react";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // scroll to top
  useEffect(() => {
    if (!isUndefined(window)) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div
      className={classNames("relative min-h-screen", {
        "debug-screens": process.env.NODE_ENV === "development",
      })}
    >
      <Header />
      <main className="">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
