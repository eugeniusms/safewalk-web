import {
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { SWButton } from "src/components/elements/Button";
import { Layout } from "src/components/elements/Layout";
import UploadPhoto from "src/components/elements/Upload";
import { useLocalStorage } from "src/components/hooks/useLocalStorage";
import { storage } from "src/services/firebase";
import { v4 } from "uuid";
import { FormDefault } from "./interface";

export const ContactCreateModule = () => {
  const { handleLoad } = useLocalStorage();
  const router = useRouter();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormDefault>({
    defaultValues: {
      name: "",
      contact_email: "",
      photo_url: "",
      mobile_number: "",
    },
  });

  const onSubmit = (data: FormDefault) => {
    const { name, contact_email, photo_url, mobile_number } = data;
    const email = handleLoad("SW-EMAIL");
    const password = handleLoad("SW-PASSWORD");
    const sendData = {
      email,
      password,
      name,
      contact_email,
      photo_url,
      mobile_number,
    };
    axios
      .post("/api/contact/create-manual", sendData)
      .then((response) => {
        console.log(response);
        toast({
          title: "Add Contact Success",
          status: "success",
          position: "top",
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Add Contact Failed",
          status: "error",
          position: "top",
          duration: 4000,
          isClosable: true,
        });
      });
    router.push("/contact/list");
  };

  // Upload to firebase storage
  const handleUpload = (file: File) => {
    if (file == null) {
      return;
    }
    const imageRef = ref(storage, `images/contact/${file.name + v4()}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("File available at", url);
        setValue("photo_url", url);
      });
    });
  };

  return (
    <Layout>
      <div className="px-8 py-8 h-[92vh] relative">
        <div onClick={() => router.push("/contact/list")}>
          <Image
            src="/assets/icons/back.svg"
            alt="landing"
            width={50}
            height={50}
          />
        </div>
        <div className="text-white text-3xl font-bold py-4">
          Emergency Contact
        </div>
        <div className="flex justify-center">
          <div className="w-full py-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 text-white"
            >
              <div>
                <div className="pb-8">
                  <UploadPhoto
                    onUpload={handleUpload}
                    trigger={
                      <Image
                        src="/assets/icons/upload-photo.svg"
                        alt="gallery-button"
                        width={180}
                        height={180}
                      />
                    }
                  />
                </div>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <InputGroup size="md">
                      <InputLeftElement>
                        <Image
                          src="/assets/icons/menu-profile.svg"
                          width={15}
                          height={15}
                          alt="profile"
                        />
                      </InputLeftElement>
                      <Input
                        {...field}
                        placeholder="Name"
                        backgroundColor={"#252525"}
                        opacity={0.8}
                        border="none"
                        borderRadius={12}
                      />
                    </InputGroup>
                  )}
                />
                {errors.name && (
                  <p className="text-sm text-white">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Controller
                  name="contact_email"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <InputGroup size="md">
                      <InputLeftElement>
                        <Image
                          src="/assets/icons/menu-call.svg"
                          width={15}
                          height={15}
                          alt="profile"
                        />
                      </InputLeftElement>
                      <Input
                        {...field}
                        placeholder="Phone"
                        backgroundColor={"#252525"}
                        opacity={0.8}
                        border="none"
                        borderRadius={12}
                      />
                    </InputGroup>
                  )}
                />
                {errors.contact_email && (
                  <p className="text-sm text-white">
                    {errors.contact_email.message}
                  </p>
                )}
              </div>
              <div>
                <Controller
                  name="mobile_number"
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
                        placeholder="Email"
                        backgroundColor={"#252525"}
                        opacity={0.8}
                        border="none"
                        borderRadius={12}
                      />
                    </InputGroup>
                  )}
                />
                {errors.mobile_number && (
                  <p className="text-sm text-white">
                    {errors.mobile_number.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center pt-8 gap-2">
          <button
            className="bg-[#F4F4F4]/10 text-[#3E35F7] font-bold rounded-xl px-16 py-2"
            onClick={() => router.push("/contact/list")}
          >
            Cancel
          </button>
          <SWButton label="Save" onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
    </Layout>
  );
};
