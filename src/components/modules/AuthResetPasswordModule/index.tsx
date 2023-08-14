import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SWButton } from "src/components/elements/Button";
import { ResetPasswordModuleProps } from "./interface";

export const AuthResetPasswordModule: React.FC = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  switch (page) {
    case 0:
      router.push("/auth/login");
    case 1:
      return <SendVerificationPage prevPage={prevPage} nextPage={nextPage} />;
    case 2:
      return <VerificationPage prevPage={prevPage} nextPage={nextPage} />;
    case 3:
      return <ResetPasswordPage prevPage={prevPage} nextPage={nextPage} />;
    case 4:
      return (
        <ResetPasswordSuccessPage prevPage={prevPage} nextPage={nextPage} />
      );
    default:
      return <SendVerificationPage prevPage={prevPage} nextPage={nextPage} />;
  }
};

const SendVerificationPage = ({
  prevPage,
  nextPage,
}: ResetPasswordModuleProps) => {
  return (
    <div>
      <div className="px-8 py-8 h-screen relative">
        <div onClick={prevPage}>
          <Image
            src="/assets/icons/back.svg"
            alt="landing"
            width={50}
            height={50}
          />
        </div>
        <div className="text-white text-3xl font-bold py-4">
          Forgot Password?
        </div>
        <div className="text-white text-sm font-light">
          Select which contact details should we use to reset your password
        </div>
        {/* TODO: change to dynamic info of user credentials */}
        <div className="flex gap-3 bg-[#252525]/70 py-4 px-6 rounded-2xl mt-8">
          <Image
            src="/assets/icons/message.svg"
            alt="message"
            width={40}
            height={40}
          />
          <div className="flex flex-col gap-2 text-sm">
            <div className="text-[#828282]">Via SMS:</div>
            <div className="text-white">XXXX XXXX 4235</div>
          </div>
        </div>
        <div className="flex gap-3 bg-[#252525]/70 py-4 px-6 rounded-2xl mt-4">
          <Image
            src="/assets/icons/mail-2.svg"
            alt="message"
            width={40}
            height={40}
          />
          <div className="flex flex-col gap-2 text-sm">
            <div className="text-[#828282]">Via Email:</div>
            <div className="text-white">XXXX XXXX ms@gmail.com</div>
          </div>
        </div>
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <SWButton label="Next" onClick={nextPage} />
        </div>
      </div>
    </div>
  );
};

const VerificationPage = ({ prevPage, nextPage }: ResetPasswordModuleProps) => {
  return <div></div>;
};

const ResetPasswordPage = ({
  prevPage,
  nextPage,
}: ResetPasswordModuleProps) => {
  return <div></div>;
};

const ResetPasswordSuccessPage = ({
  prevPage,
  nextPage,
}: ResetPasswordModuleProps) => {
  return <div></div>;
};
