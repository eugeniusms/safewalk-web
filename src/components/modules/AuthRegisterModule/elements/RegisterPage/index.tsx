import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SWButton } from "src/components/elements/Button";
import Layout from "src/components/elements/Layout";
import { RegisterModuleProps } from "../../interface";

export const RegisterPage = ({
  nextPage,
  control,
  handleSubmit,
  watch,
  errors,
  onSubmit,
  showPassword,
  setShowPassword,
}: RegisterModuleProps) => {
  const router = useRouter();
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
          <div className="flex justify-center pt-8">
            <SWButton label="Create Account" onClick={nextPage} />
          </div>
          <div
            className="text-center text-xs text-transparent bg-clip-text bg-gradient-to-r from-[#4D61A3] to-[#3E35F7] py-4 underline"
            onClick={() => router.push("/auth/login")}
          >
            already have an account?
          </div>
        </div>
      </div>
    </Layout>
  );
};
