import { Spacer } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsMegaphone } from "react-icons/bs";
import useShareAddressStore from "src/stores/maps";

const Navbar = () => {
  const { showShareAddress, setShowShareAddress } = useShareAddressStore();
  const [isEmergency, setIsEmergency] = useState(false);
  const router = useRouter();

  let iconMenuHome = "/assets/icons/menu-home.svg";
  let iconMenuLocation = "/assets/icons/menu-location.svg";
  let iconMenuCall = "/assets/icons/menu-call.svg";
  let iconMenuProfile = "/assets/icons/menu-profile.svg";

  if (router.pathname === "/") {
    iconMenuHome = "/assets/icons/menu-home-active.svg";
  } else if (router.pathname === "/maps") {
    iconMenuLocation = "/assets/icons/menu-location-active.svg";
  } else if (router.pathname === "/contact/list") {
    iconMenuCall = "/assets/icons/menu-call-active.svg";
  } else if (router.pathname === "/profile") {
    iconMenuProfile = "/assets/icons/menu-profile-active.svg";
  }

  const megaphoneHandler = () => {
    router.push("/maps");
    setShowShareAddress(!showShareAddress);
    setIsEmergency(!isEmergency);
  };

  return (
    <div className="flex justify-between bg-[#252525] absolute bottom-0 left-0 right-0 items-center py-2 px-10 rounded-t-3xl">
      <div onClick={() => router.push("/")}>
        <Image src={iconMenuHome} alt="logo" width={20} height={20} />
      </div>
      <Spacer />
      <div onClick={() => router.push("/maps")}>
        <Image src={iconMenuLocation} alt="logo" width={20} height={20} />
      </div>
      <Spacer />
      {/* TODO: routing on megaphone menu */}
      {!isEmergency ? (
        <div
          className="bg-[#7A2824] rounded-full p-6"
          onClick={() => megaphoneHandler()}
        >
          <BsMegaphone className="w-5 h-5 text-white" />
        </div>
      ) : (
        <a href={`tel:110`}>
          <div className="bg-[#7A2824] rounded-full p-6 animate-bounce">
            <BsMegaphone className="w-5 h-5 text-white" />
          </div>
        </a>
      )}
      <Spacer />
      <div onClick={() => router.push("/contact/list")}>
        <Image src={iconMenuCall} alt="logo" width={20} height={20} />
      </div>
      <Spacer />
      <div onClick={() => router.push("/profile")}>
        <Image src={iconMenuProfile} alt="logo" width={20} height={20} />
      </div>
    </div>
  );
};

export default Navbar;
