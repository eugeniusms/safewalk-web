import { useRouter } from "next/router";
import { useContext } from "react";
import { useWindowSize } from "src/components/hooks/useWindowSize";
import { AuthContext } from "src/providers/AuthProvider";
import { BufferToLanding } from "../BufferToLanding";
import DesktopScreen from "../DesktopScreen";
import Navbar from "../Navbar";
import { LayoutProps } from "./interface";

const registerNavbar = ["/", "/maps", "/contact/list", "/profile"];

export const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const { pathname, ...restRouter } = router;
  const { width } = useWindowSize();

  if (width > 768) {
    return <DesktopScreen />;
  }

  if (registerNavbar.includes(pathname) && !isAuthenticated) {
    return <BufferToLanding />;
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
