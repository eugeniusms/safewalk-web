import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SWButton } from "src/components/elements/Button";
import { FormData, FormDefault, RegisterModuleProps } from "./interface";

export const AuthRegisterModule: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [page, setPage] = useState(1);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDefault>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      mobileNumber: "",
      photoUrl: "",
    },
  });

  const onSubmit = (data: FormDefault) => {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      mobileNumber,
      photoUrl,
    } = data;
    const sendData: FormData = {
      username,
      email,
      password,
      firstName,
      lastName,
      mobileNumber,
      photoUrl,
    };
    axios.post("/api/auth/register", sendData).then((response) => {
      Cookies.set("token", response.data.token);
    });
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  switch (page) {
    case 1:
      return (
        <RegisterPage
          nextPage={nextPage}
          control={control}
          handleSubmit={handleSubmit}
          watch={watch}
          errors={errors}
          onSubmit={onSubmit}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      );
    case 2:
      return (
        <RegisterBio
          nextPage={nextPage}
          control={control}
          handleSubmit={handleSubmit}
          watch={watch}
          errors={errors}
          onSubmit={onSubmit}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      );
    case 3:
      return (
        <RegisterPhoto
          nextPage={nextPage}
          control={control}
          handleSubmit={handleSubmit}
          watch={watch}
          errors={errors}
          onSubmit={onSubmit}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      );
    default:
      return (
        <RegisterPage
          nextPage={nextPage}
          control={control}
          handleSubmit={handleSubmit}
          watch={watch}
          errors={errors}
          onSubmit={onSubmit}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      );
  }
};

const RegisterPage = ({
  nextPage,
  control,
  handleSubmit,
  watch,
  errors,
  onSubmit,
  showPassword,
  setShowPassword,
}: RegisterModuleProps) => {
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
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <label>Username</label>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Input {...field} placeholder="Enter your username" />
                )}
              />
              {errors.username && (
                <p className="text-sm text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div>
              <label>Password</label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <InputGroup>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
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
                <p className="text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
          </form>
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
