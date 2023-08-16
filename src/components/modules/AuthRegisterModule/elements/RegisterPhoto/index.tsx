import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { SWButton } from "src/components/elements/Button";
import { Layout } from "src/components/elements/Layout";
import UploadPhoto from "src/components/elements/Upload";
import { storage } from "src/services/firebase";
import { v4 } from "uuid";
import { RegisterModuleProps } from "../../interface";

export const RegisterPhoto = ({
  prevPage,
  nextPage,
  control,
  setValue,
}: RegisterModuleProps) => {
  // Upload to firebase storage
  const handleUpload = (file: File) => {
    if (file == null) {
      return;
    }
    const imageRef = ref(storage, `images/profile/${file.name + v4()}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("File available at", url);
        setValue("photoUrl", url);
      });
      nextPage();
    });
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
          Upload Your Photo Profile
        </div>
        <div className="text-white text-sm font-light">
          This data will be displayed in your account profile for security
        </div>
        <div className="scale-125 pt-6">
          <UploadPhoto
            onUpload={handleUpload}
            trigger={
              <Image
                src="/assets/images/gallery-button.svg"
                alt="gallery-button"
                width={290}
                height={290}
              />
            }
          />
        </div>
        <div className="flex justify-center pt-16">
          <SWButton label="Next" onClick={nextPage} />
        </div>
      </div>
    </Layout>
  );
};
