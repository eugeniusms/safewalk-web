import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
// import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SWButton } from "src/components/elements/Button";
import Layout from "src/components/elements/Layout";
import { useLocalStorage } from "src/components/hooks/useLocalStorage";
import { FormData, FormDefault } from "./interface";

export const AuthLoginModule = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { handleSave } = useLocalStorage();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDefault>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormDefault) => {
    const { email, password } = data;
    const sendData: FormData = {
      email,
      password,
    };
    axios
      .post("/api/auth/login", sendData)
      .then((response) => {
        handleSave("SW-EMAIL", response.data.data.email);
        handleSave("SW-PASSWORD", response.data.data.password);
        toast({
          title: "Login Success",
          status: "success",
          position: "top",
          duration: 4000,
          isClosable: true,
        });
        router.push("/maps");
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Login Failed",
          status: "error",
          position: "top",
          duration: 4000,
          isClosable: true,
        });
      });
  };

  const email = watch("email");
  const password = watch("password");

  console.log({
    email,
    password,
  });
  return (
    <Layout>
      <div className="h-[92vh] relative">
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
              Log In
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
                            <FaEyeSlash
                              onClick={() => setShowPassword(false)}
                            />
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
          <div className="text-center text-white pt-4 text-xs font-semibold">
            Or Continue With
          </div>
          <div className="flex justify-between px-8 pt-4">
            <Image
              src="/assets/images/facebook-button.png"
              width={145}
              height={120}
              alt="facebook"
            />
            <Image
              src="/assets/images/google-button.png"
              width={145}
              height={100}
              alt="google"
            />
          </div>
          <div
            className="text-center text-xs text-transparent bg-clip-text bg-gradient-to-r from-[#4D61A3] to-[#3E35F7] py-4 underline"
            onClick={() => router.push("/auth/reset-password")}
          >
            Forgot Your Password?
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <SWButton label="Login" onClick={handleSubmit(onSubmit)} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
