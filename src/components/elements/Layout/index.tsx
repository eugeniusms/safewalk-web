import { useRouter } from "next/router";
import { useWindowSize } from "src/components/hooks/useWindowSize";
import DesktopScreen from "../DesktopScreen";
import Navbar from "../Navbar";
import { LayoutProps } from "./interface";

const registerNavbar = ["/", "/maps", "/contact/list", "/profile"];

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { pathname, ...restRouter } = router;
  const { width } = useWindowSize();

  if (width > 768) {
    return <DesktopScreen />;
  }

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
