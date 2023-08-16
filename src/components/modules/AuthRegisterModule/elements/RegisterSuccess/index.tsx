import Image from "next/image";
import { SWButton } from "src/components/elements/Button";
import Layout from "src/components/elements/Layout";
import { RegisterModuleProps } from "../../interface";

export const RegisterSuccess = ({
  prevPage,
  nextPage,
}: RegisterModuleProps) => {
  return (
    <Layout>
      <div className="h-[92vh] w-screen flex justify-center items-center relative">
        <div className="pt-16">
          <div className="flex justify-center">
            <Image
              src="/assets/images/success.svg"
              alt="landing"
              width={160}
              height={160}
            />
          </div>
          <div className="pt-4 pb-10">
            <div className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4D61A3] to-[#3E35F7]">
              Congrats!
            </div>
            <div className="text-center text-xl text-white text-base font-semibold py-2">
              Your Profile Is Ready To Use
            </div>
          </div>
          <div className="flex justify-center pt-16">
            <SWButton label="Next" onClick={nextPage} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
