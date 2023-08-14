import React, { useState } from "react";
import { ResetPasswordModuleProps } from "./interface";

export const AuthResetPasswordModule: React.FC = () => {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  switch (page) {
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
  return <div></div>;
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
