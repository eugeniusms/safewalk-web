import Image from "next/image";
import { SWButton } from "src/components/elements/Button";
import { Layout } from "src/components/elements/Layout";
import { RegisterModuleProps } from "../../interface";

export const RegisterPhotoSuccess = ({
  prevPage,
  nextPage,
  watch,
  handleSubmit,
  onSubmit,
}: RegisterModuleProps) => {
  const photoUrl = watch("photoUrl");

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
          Upload Your Photo Profile
        </div>
        <div className="text-white text-sm font-light">
          This data will be displayed in your account profile for security
        </div>
        <div className="bg-gray-200 overflow-hidden rounded-3xl w-64 h-64 mx-auto mt-8">
          <Image
            src={photoUrl}
            alt="profile-photo"
            className="object-cover w-full h-full"
            width={290}
            height={290}
          />
        </div>
        <div className="flex justify-center pt-8">
          <SWButton label="Next" onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
    </Layout>
  );
};
