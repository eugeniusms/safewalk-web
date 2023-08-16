import { useRouter } from "next/router";
import Navbar from "../Navbar";
import { LayoutProps } from "./interface";

const registerNavbar = ["/", "/maps", "/contact/list", "/profile"];

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { pathname, ...restRouter } = router;

  if (registerNavbar.includes(pathname)) {
    return (
      <div>
        {children}
        <Navbar />
      </div>
    );
  }
  return <div>{children}</div>;
};

export default Layout;
