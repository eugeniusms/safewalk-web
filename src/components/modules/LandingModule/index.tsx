import Image from "next/image";
import { SWButton } from "src/components/elements/Button";

export const LandingModule: React.FC = () => {
  return <LandingPage1 />;
};

const LandingPage1: React.FC = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center relative">
      <div>
        <div className="flex justify-center">
          <Image
            src="/assets/images/safewalk-logo.svg"
            alt="landing"
            width={140}
            height={140}
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
          <SWButton label="Next" onClick={() => console.log("CHECK")} />
        </div>
      </div>
    </div>
  );
};
