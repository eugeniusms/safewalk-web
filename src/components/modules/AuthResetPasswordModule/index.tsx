import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SWButton } from "src/components/elements/Button";
import { FormData, FormDefault, ResetPasswordModuleProps } from "./interface";

export const AuthResetPasswordModule: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [page, setPage] = useState(1);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDefault>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormDefault) => {
    const { password, confirmPassword } = data;
    const sendData: FormData = {
      password,
      confirmPassword,
    };
    axios.post("/api/auth/reset-password", sendData).then((response) => {
      console.log(response.data.token);
    });
  };

  const selectAccount = (account: string) => {
    setSelectedAccount(account);
  };

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
      return (
        <SendVerificationPage
          prevPage={prevPage}
          nextPage={nextPage}
          selectAccount={selectAccount}
        />
      );
    case 2:
      return (
        <VerificationPage
          prevPage={prevPage}
          nextPage={nextPage}
          verificationSendTo={selectedAccount}
        />
      );
    case 3:
      return (
        <ResetPasswordPage
          prevPage={prevPage}
          nextPage={nextPage}
          control={control}
          handleSubmit={handleSubmit}
          watch={watch}
          errors={errors}
          onSubmit={onSubmit}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
        />
      );
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
  selectAccount,
}: ResetPasswordModuleProps) => {
  const verifyViaSMS = () => {
    selectAccount("XXXX XXXX 4235");
    nextPage();
  };

  const verifyViaEmail = () => {
    selectAccount("XXXX XXXX ms@gmail.com");
    nextPage();
  };
  return (
    <div>
      <div className="px-8 py-8 h-[92vh] relative">
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
        <div
          className="flex gap-3 bg-[#252525]/70 py-4 px-6 rounded-2xl mt-8"
          onClick={verifyViaSMS}
        >
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
        <div
          className="flex gap-3 bg-[#252525]/70 py-4 px-6 rounded-2xl mt-4"
          onClick={verifyViaEmail}
        >
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
      </div>
    </div>
  );
};

const VerificationPage = ({
  prevPage,
  nextPage,
  verificationSendTo,
}: ResetPasswordModuleProps) => {
  return (
    <div>
      <div className="px-8 py-8 h-[92vh] relative">
        <div onClick={prevPage}>
          <Image
            src="/assets/icons/back.svg"
            alt="landing"
            width={50}
            height={50}
          />
        </div>
        <div className="text-white text-3xl font-bold py-4">
          Enter 4-digit Verification code
        </div>
        <div className="text-white text-sm font-light">
          Code send to {verificationSendTo}. This code will expired in 01:30
        </div>
        {/* TODO: change to dynamic info of user credentials */}
        <div className="flex gap-3 py-4 px-6 rounded-2xl mt-8">
          <Input
            placeholder=""
            backgroundColor={"#252525"}
            opacity={0.8}
            border="none"
            borderRadius={12}
            textAlign="center"
            textColor={"#fff"}
            fontSize={24}
            fontWeight={600}
            size="lg"
          />
          <Input
            placeholder=""
            backgroundColor={"#252525"}
            opacity={0.8}
            border="none"
            borderRadius={12}
            textAlign="center"
            textColor={"#fff"}
            fontSize={24}
            fontWeight={600}
            size="lg"
          />
          <Input
            placeholder=""
            backgroundColor={"#252525"}
            opacity={0.8}
            border="none"
            borderRadius={12}
            textAlign="center"
            textColor={"#fff"}
            fontSize={24}
            fontWeight={600}
            size="lg"
          />
          <Input
            placeholder=""
            backgroundColor={"#252525"}
            opacity={0.8}
            border="none"
            borderRadius={12}
            textAlign="center"
            textColor={"#fff"}
            fontSize={24}
            fontWeight={600}
            size="lg"
          />
        </div>
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <SWButton label="Next" onClick={nextPage} />
        </div>
      </div>
    </div>
  );
};

const ResetPasswordPage = ({
  prevPage,
  nextPage,
  control,
  handleSubmit,
  watch,
  errors,
  onSubmit,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: ResetPasswordModuleProps) => {
  return (
    <div className="px-8 py-8 h-[92vh] relative">
      <div onClick={prevPage}>
        <Image
          src="/assets/icons/back.svg"
          alt="landing"
          width={50}
          height={50}
        />
      </div>
      <div className="text-white text-3xl font-bold py-4">
        Reset your password here
      </div>
      <div className="text-white text-sm font-light">
        Select which contact details should we use to reset your password
      </div>
      <div className="flex justify-center">
        <div className="w-full py-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 text-white"
          >
            <div>
              <Controller
                name="firstName"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <InputGroup size="md">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="New Password"
                      backgroundColor={"#252525"}
                      opacity={0.8}
                      border="none"
                      borderRadius={12}
                    />
                    <InputRightElement>
                      {showPassword ? (
                        <FaEyeSlash onClick={() => setShowPassword(false)} />
                      ) : (
                        <FaEye onClick={() => setShowPassword(true)} />
                      )}
                    </InputRightElement>
                  </InputGroup>
                )}
              />
              {errors.password && (
                <p className="text-sm text-white">{errors.password.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <InputGroup size="md">
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      backgroundColor={"#252525"}
                      opacity={0.8}
                      border="none"
                      borderRadius={12}
                    />
                    <InputRightElement>
                      {showConfirmPassword ? (
                        <FaEyeSlash
                          onClick={() => setShowConfirmPassword(false)}
                        />
                      ) : (
                        <FaEye onClick={() => setShowConfirmPassword(true)} />
                      )}
                    </InputRightElement>
                  </InputGroup>
                )}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-white">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <SWButton label="Next" onClick={nextPage} />
      </div>
    </div>
  );
};

const ResetPasswordSuccessPage = ({
  prevPage,
  nextPage,
}: ResetPasswordModuleProps) => {
  const router = useRouter();
  return (
    <div className="h-[92vh] w-screen flex justify-center items-center relative">
      <div>
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
            Password reset successful
          </div>
        </div>
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <SWButton label="Back" onClick={() => router.push("/auth/login")} />
        </div>
      </div>
    </div>
  );
};
