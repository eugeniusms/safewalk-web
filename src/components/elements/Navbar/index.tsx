import { Spacer } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsMegaphone } from "react-icons/bs";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between bg-[#252525] absolute bottom-0 left-0 right-0 items-center py-2 px-10 rounded-t-3xl">
      <div onClick={() => router.push("/")}>
        <Image
          src="/assets/icons/menu-home.svg"
          alt="logo"
          width={20}
          height={20}
        />
      </div>
      <Spacer />
      <div onClick={() => router.push("/maps")}>
        <Image
          src="/assets/icons/menu-location.svg"
          alt="logo"
          width={20}
          height={20}
        />
      </div>
      <Spacer />
      {/* TODO: routing on megaphone menu */}
      <div className="bg-[#7A2824] rounded-full p-6">
        <BsMegaphone className="w-5 h-5 text-white" />
      </div>
      <Spacer />
      <div onClick={() => router.push("/contact/list")}>
        <Image
          src="/assets/icons/menu-call.svg"
          alt="logo"
          width={20}
          height={20}
        />
      </div>
      <Spacer />
      <div onClick={() => router.push("/profile")}>
        <Image
          src="/assets/icons/menu-profile.svg"
          alt="logo"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};

export default Navbar;
