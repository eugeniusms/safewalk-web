import Image from "next/image";
import React, { useState } from "react";
import Navbar from "src/components/elements/Navbar";
import Toggle from "src/components/elements/Toggle";

const PROFILE_DUMMY = {
  id: 1,
  name: "John Doe",
  photo_url: "/assets/images/dummy-profile-photo.png",
  phone_number: "08123456789",
  email: "eugeniusms@gmail.com",
};

export const ProfileModule: React.FC = () => {
  const [toggleIsChecked, setToggleIsChecked] = useState(false);

  const handleToggle = () => {
    setToggleIsChecked(!toggleIsChecked);
  };

  return (
    <div className="h-screen">
      <div className="relative">
        <Image
          src={PROFILE_DUMMY.photo_url}
          alt="logo"
          width={1000}
          height={1000}
        />
        <div className="absolute bottom-0 left-0 w-full h-30 bg-black"></div>
      </div>
      <div className="flex justify-between px-6">
        <div>
          <div className="text-3xl text-white font-bold">
            {PROFILE_DUMMY.name}
          </div>
          <div className="text-white/40 text-sm">
            {PROFILE_DUMMY.phone_number}
          </div>
          <div className="text-white/40 text-sm">{PROFILE_DUMMY.email}</div>
        </div>
        <div>
          <Image
            src="/assets/icons/edit.svg"
            alt="logo"
            width={30}
            height={30}
          />
        </div>
      </div>
      <div>
        <div>Settings and Privacy</div>
        <div className="bg-[#252525]/80 flex justify-between py-4 px-4 mx-6 rounded-2xl items-center">
          <Image
            src="/assets/icons/compass.svg"
            alt="logo"
            width={30}
            height={30}
          />
          <div className="text-xs font-semibold text-white">
            Always-on location tracking
          </div>
          <div onClick={handleToggle}>
            <Toggle isChecked={toggleIsChecked} />
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};
