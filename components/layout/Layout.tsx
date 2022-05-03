import classNames from "classnames";
import { isUndefined } from "lodash";
import React, { useEffect } from "react";
import Header from "../navigation/Header";

type LayoutProps = React.ComponentPropsWithoutRef<"div">;
const Layout = ({ children, className }: LayoutProps) => {
  // scroll to top
  useEffect(() => {
    if (!isUndefined(window)) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className={classNames("relative min-h-screen", className)}>
      <Header />
      <main className="">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
