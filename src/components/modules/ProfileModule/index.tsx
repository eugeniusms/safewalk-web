import React from "react";
import Navbar from "src/components/elements/Navbar";

const PROFILE_DUMMY = {
  id: 1,
  name: "John Doe",
  photo_url: "/assets/images/photo-profile.svg",
  phone_number: "08123456789",
  email: "eugeniusms@gmail.com",
};

export const ProfileModule: React.FC = () => {
  return (
    <div className="h-screen">
      <div className="text-3xl text-white font-bold">{PROFILE_DUMMY.name}</div>
      <div className="text-white/40 text-sm">{PROFILE_DUMMY.phone_number}</div>
      <div className="text-white/40 text-sm">{PROFILE_DUMMY.email}</div>
      <Navbar />
    </div>
  );
};
