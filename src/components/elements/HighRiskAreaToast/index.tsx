import { Box, useToast } from "@chakra-ui/react";
import Image from "next/image";

export const HighRiskAreaToast = () => {
  const toast = useToast({
    position: "top",
    duration: 6000,
    render: () => {
      return (
        <Box
          className={`
          transition-all flex justify-between items-center gap-2 py-3 px-5
          md:text-base text-sm font-semibold 
        `}
        >
          <>
            <Image
              src="/assets/icons/caution.svg"
              width={100}
              height={100}
              alt="caution"
            />
            <p>Caution! Entering High Risk Area</p>
            <Image
              src="/assets/icons/caution.svg"
              width={100}
              height={100}
              alt="caution"
            />
          </>
        </Box>
      );
    },
  });

  return toast;
};
