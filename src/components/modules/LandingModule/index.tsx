import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SWButton } from "src/components/elements/Button";
import { LandingModuleProps } from "./interface";

export const LandingModule: React.FC = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(page + 1);
  };

  const goToAuth = () => {
    router.push("/auth/register");
  };

  switch (page) {
    case 1:
      return <LandingPage1 nextPage={nextPage} />;
    case 2:
      return <LandingPage2 nextPage={goToAuth} />;
    default:
      return <LandingPage1 nextPage={nextPage} />;
  }
};

const LandingPage1 = ({ nextPage }: LandingModuleProps) => {
  return (
    <div className="h-[96vh] w-screen flex justify-center items-center relative">
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
          <div className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4D61A3] to-[#3E35F7]">
            SafeWalk
          </div>
          <div className="text-center text-white text-base font-semibold">
            Your Safety Companion
          </div>
        </div>
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <SWButton label="Next" onClick={nextPage} />
        </div>
      </div>
    </div>
  );
};

const LandingPage2 = ({ nextPage }: LandingModuleProps) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center relative">
      <div>
        <div className="flex justify-center">
          <Image
            src="/assets/images/landing-girl.svg"
            alt="landing"
            width={280}
            height={280}
          />
        </div>
        <div className="pt-4 pb-10">
          <div className="text-center text-2xl font-bold text-white">
            Step into Safety, Walk with Confidence
          </div>
          <div className="text-center text-white text-xs font-light pt-2">
            Empowering Security for Every Step You Take!
          </div>
        </div>
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <SWButton label="Next" onClick={nextPage} />
        </div>
      </div>
    </div>
  );
};