import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Navbar from "src/components/elements/Navbar";
import Toggle from "src/components/elements/Toggle";
import { useLocalStorage } from "src/components/hooks/useLocalStorage";

const PROFILE_DUMMY = {
  id: 1,
  first_name: "John",
  last_name: "Doe",
  photo_url: "/assets/images/dummy-profile-photo.png",
  mobile_number: "08123456789",
  email: "eugeniusms@gmail.com",
};

export const ProfileModule: React.FC = () => {
  const [profile, setProfile] = useState(PROFILE_DUMMY);
  const [toggleIsChecked, setToggleIsChecked] = useState(false);
  const { handleLoad } = useLocalStorage();

  const handleToggle = () => {
    setToggleIsChecked(!toggleIsChecked);
  };

  useEffect(() => {
    const email = handleLoad("SW-EMAIL");
    const password = handleLoad("SW-PASSWORD");
    const sendData = {
      email,
      password,
    };
    axios
      .post("/api/profile/manual", sendData)
      .then((response) => {
        console.log(response.data);
        setProfile(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="h-screen">
      <div className="relative">
        <Image src={profile.photo_url} alt="logo" width={1000} height={1000} />
        <div className="absolute bottom-0 left-0 w-full h-30 bg-black"></div>
      </div>
      <div className="flex justify-between px-6">
        <div>
          <div className="text-3xl text-white font-bold">
            {profile.first_name} {profile.last_name}
          </div>
          <div className="text-white/40 text-sm">{profile.mobile_number}</div>
          <div className="text-white/40 text-sm">{profile.email}</div>
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
