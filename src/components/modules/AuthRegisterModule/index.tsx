import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
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

  const prevPage = () => {
    setPage(page - 1);
  };

  const username = watch("username");
  const email = watch("email");
  const password = watch("password");
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const mobileNumber = watch("mobileNumber");

  console.log({
    username,
    email,
    password,
    firstName,
    lastName,
    mobileNumber,
  });

  switch (page) {
    case 1:
      return (
        <RegisterPage
          prevPage={prevPage}
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
          prevPage={prevPage}
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
          prevPage={prevPage}
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
          prevPage={prevPage}
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
    <div className="h-screen relative">
      <div>
        <div className="flex justify-center pt-6">
          <Image
            src="/assets/images/safewalk-logo.svg"
            alt="landing"
            width={140}
            height={140}
          />
        </div>
        <div className="pt-4 pb-10">
          <div className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4D61A3] to-[#3E35F7]">
            SafeWalk
          </div>
          <div className="text-center text-white text-xs font-semibold">
            Your Safety Companion
          </div>
          <div className="text-center text-xl font-bold text-white pt-6">
            Sign Up For Free
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-5/6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 text-white"
            >
              <div>
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <InputGroup size="md">
                      <InputLeftElement>
                        <Image
                          src="/assets/icons/profile.svg"
                          width={20}
                          height={20}
                          alt="profile"
                        />
                      </InputLeftElement>
                      <Input
                        {...field}
                        placeholder="Enter your username"
                        backgroundColor={"#252525"}
                        opacity={0.8}
                        border="none"
                        borderRadius={12}
                      />
                    </InputGroup>
                  )}
                />
                {errors.username && (
                  <p className="text-sm text-white">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <InputGroup size="md">
                      <InputLeftElement>
                        <Image
                          src="/assets/icons/mail.svg"
                          width={20}
                          height={20}
                          alt="profile"
                        />
                      </InputLeftElement>
                      <Input
                        {...field}
                        placeholder="Enter your email"
                        backgroundColor={"#252525"}
                        opacity={0.8}
                        border="none"
                        borderRadius={12}
                      />
                    </InputGroup>
                  )}
                />
                {errors.email && (
                  <p className="text-sm text-white">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <InputGroup size="md">
                      <InputLeftElement>
                        <Image
                          src="/assets/icons/lock.svg"
                          width={20}
                          height={20}
                          alt="profile"
                        />
                      </InputLeftElement>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
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
                  <p className="text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <SWButton label="Create Account" onClick={nextPage} />
          <div className="text-center text-xs text-transparent bg-clip-text bg-gradient-to-r from-[#4D61A3] to-[#3E35F7] py-4 underline">
            already have an account?
          </div>
        </div>
      </div>
    </div>
  );
};

const RegisterBio = ({
  prevPage,
  nextPage,
  control,
  handleSubmit,
  watch,
  errors,
  onSubmit,
}: RegisterModuleProps) => {
  return (
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
        Fill in your bio to get started
      </div>
      <div className="text-white text-sm">
        This data will be displayed in your account profile for security
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
                      placeholder="First Name"
                      backgroundColor={"#252525"}
                      opacity={0.8}
                      border="none"
                      borderRadius={12}
                    />
                  </InputGroup>
                )}
              />
              {errors.firstName && (
                <p className="text-sm text-white">{errors.firstName.message}</p>
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
                      placeholder="Last Name"
                      backgroundColor={"#252525"}
                      opacity={0.8}
                      border="none"
                      borderRadius={12}
                    />
                  </InputGroup>
                )}
              />
              {errors.lastName && (
                <p className="text-sm text-white">{errors.lastName.message}</p>
              )}
            </div>
            <div>
              <Controller
                name="mobileNumber"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <InputGroup size="md">
                    <Input
                      {...field}
                      placeholder="Mobile Number"
                      backgroundColor={"#252525"}
                      opacity={0.8}
                      border="none"
                      borderRadius={12}
                    />
                  </InputGroup>
                )}
              />
              {errors.mobileNumber && (
                <p className="text-sm text-white">
                  {errors.mobileNumber.message}
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

const RegisterPhoto = ({ nextPage }: RegisterModuleProps) => {
  return <div></div>;
};
