import { Input, InputGroup, useToast } from "@chakra-ui/react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { SWButton } from "src/components/elements/Button";
import Layout from "src/components/elements/Layout";
import {
  isMobileNumberFormat,
  isPersonNameFormat,
} from "src/components/utils/format";
import { RegisterModuleProps } from "../../interface";

export const RegisterBio = ({
  prevPage,
  nextPage,
  control,
  handleSubmit,
  watch,
  errors,
  onSubmit,
  setValue,
}: RegisterModuleProps) => {
  const toast = useToast();

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const mobileNumber = watch("mobileNumber");

  const handleNextPage = () => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedMobileNumber = mobileNumber.trim();

    if (!(trimmedFirstName && trimmedLastName && trimmedMobileNumber)) {
      setValue("firstName", trimmedFirstName);
      setValue("lastName", trimmedLastName);
      setValue("mobileNumber", trimmedMobileNumber);
      toast({
        title: "Please fill all the fields",
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    } else if (!isPersonNameFormat(trimmedFirstName)) {
      toast({
        title: "Only alphabet characters are allowed for first name",
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    } else if (!isPersonNameFormat(trimmedLastName)) {
      toast({
        title: "Only alphabet characters are allowed for last name",
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    } else if (!isMobileNumberFormat(trimmedMobileNumber)) {
      toast({
        title: "Only numeric characters are allowed for mobile number",
        status: "error",
        position: "top",
        duration: 4000,
        isClosable: true,
      });
    } else {
    nextPage();
    }
  };

  return (
    <Layout>
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
          Fill in your bio to get started
        </div>
        <div className="text-white text-sm font-light">
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
                  <p className="text-sm text-white">
                    {errors.firstName.message}
                  </p>
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
                  <p className="text-sm text-white">
                    {errors.lastName.message}
                  </p>
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
        <div className="flex justify-center pt-16">
          <SWButton label="Next" onClick={handleNextPage} />
        </div>
      </div>
    </Layout>
  );
};
