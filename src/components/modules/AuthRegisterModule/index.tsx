import Image from "next/image";
import React, { useState } from "react";
import { SWButton } from "src/components/elements/Button";
import { RegisterModuleProps } from "./interface";

export const AuthRegisterModule: React.FC = () => {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(page + 1);
  };

  switch (page) {
    case 1:
      return <RegisterPage nextPage={nextPage} />;
    case 2:
      return <RegisterBio nextPage={nextPage} />;
    case 3:
      return <RegisterPhoto nextPage={nextPage} />;
    default:
      return <RegisterPage nextPage={nextPage} />;
  }
};

const RegisterPage = ({ nextPage }: RegisterModuleProps) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center relative">
      <div>
        <div className="flex justify-center">
          <Image
            src="/assets/images/safewalk-logo.svg"
            alt="landing"
            width={160}
            height={160}
          />
        </div>
        <div className="pt-4 pb-10">
          <div className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4D61A3] to-[#3E35F7]">
            SafeWalk
          </div>
          <div className="text-center text-white text-xs font-semibold">
            Your Safety Companion
          </div>
          <div className="text-center text-xl font-bold text-white py-6">
            Sign Up For Free
          </div>
        </div>
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <SWButton label="Create Account" onClick={nextPage} />
          <div className="text-center text-xs text-transparent bg-clip-text bg-gradient-to-r from-[#4D61A3] to-[#3E35F7] py-4 underline">
            already have an account?
          </div>
        </div>
      </div>
    </div>
  );
};

const RegisterBio = ({ nextPage }: RegisterModuleProps) => {
  return <div></div>;
};

const RegisterPhoto = ({ nextPage }: RegisterModuleProps) => {
  return <div></div>;
};
