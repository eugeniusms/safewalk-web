import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Navbar from "src/components/elements/Navbar";

export const BufferModule: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <div
        className="h-screen w-screen flex justify-center items-center relative bg-gradient-to-b from-[#000000] to-[#1E1E1F]"
        onClick={() => router.push("/maps")}
      >
        <div className="animate-pulse">
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
            <div className="text-center text-2xl text-white font-semibold py-2">
              Tap to Start
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};
