import { Box, Button, Center } from "@chakra-ui/react";
import { useState } from "react";
import { UploadPhotoProps } from "./interface";

const UploadPhoto: React.FC<UploadPhotoProps> = ({ onUpload, trigger }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  return (
    <Box>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        ref={(input) => input && input.setAttribute("multiple", "false")}
      />
      <Center flexDirection="column">
        <div onClick={() => document.querySelector("input")?.click()}>
          {trigger}
        </div>
        {selectedFile && (
          <div className="flex justify-center">
            <div>
              <p className="text-center text-white text-xs pb-4">
                Selected File: {selectedFile.name.slice(0, 20)}
              </p>
              <div className="flex justify-center">
                <Button size="md" onClick={handleUpload}>
                  Upload
                </Button>
              </div>
            </div>
          </div>
        )}
      </Center>
    </Box>
  );
};

export default UploadPhoto;
