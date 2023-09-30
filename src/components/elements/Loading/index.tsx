import Image from "next/image";
import React from "react";
import { Layout } from "src/components/elements/Layout";
import Navbar from "src/components/elements/Navbar";

export const Loading: React.FC = () => {
  return (
    <Layout>
      <div className="h-[92vh] w-screen flex justify-center items-center relative bg-gradient-to-b from-[#000000] to-[#1E1E1F]">
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
            <div className="text-center text-xl font-bold text-transparent bg-clip-text text-white">
              Loading ...
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </Layout>
  );
};
