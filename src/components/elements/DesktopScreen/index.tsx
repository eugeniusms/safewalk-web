import Image from "next/image";

const DesktopScreen = () => {
  return (
    <div className="bg-gradient-to-b from-[#162563] to-[#120A44] flex justify-center text-white h-screen w-screen">
      <div className="py-20">
        <div className="flex justify-center">
          <Image
            src="/assets/images/safewalk-logo.svg"
            alt="SafeWalk Logo"
            width={400}
            height={400}
          />
        </div>
        <div className="text-7xl font-black text-center py-8">Oops...</div>
        <div className="flex justify-center">
          <div className="text-center w-1/2">
            Now, we don&apos;t support desktop devices yet, keep using your
            smartphone to open this service
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopScreen;
