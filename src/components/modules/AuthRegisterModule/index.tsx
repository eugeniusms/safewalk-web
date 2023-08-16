import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BufferModule } from "../BufferModule";
import { RegisterBio } from "./elements/RegisterBio";
import { RegisterPage } from "./elements/RegisterPage";
import { RegisterPhoto } from "./elements/RegisterPhoto";
import { RegisterPhotoSuccess } from "./elements/RegisterPhotoSuccess";
import { RegisterSuccess } from "./elements/RegisterSuccess";
import { FormData, FormDefault } from "./interface";

export const AuthRegisterModule: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [page, setPage] = useState(1);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
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
  const photoUrl = watch("photoUrl");

  console.log({
    username,
    email,
    password,
    firstName,
    lastName,
    mobileNumber,
    photoUrl,
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
          setValue={setValue}
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
          setValue={setValue}
        />
      );
    case 4:
      return (
        <RegisterPhotoSuccess
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
    case 5:
      return (
        <RegisterSuccess
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
    case 6:
      return <BufferModule />;
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
