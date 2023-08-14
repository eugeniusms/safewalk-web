import { Button } from "@chakra-ui/react";
import { ButtonProps } from "./constant";

export const SWButton = ({ label, onClick, isDisabled }: ButtonProps) => {
  return (
    <Button
      variant="solid"
      color="white"
      bgGradient="linear(to-r, #4D61A3, #3E35F7)"
      _hover={{ bgGradient: "linear(to-r, #2D4491, #2E23C4)" }}
      px="10"
      py="6"
      borderRadius="8"
      onClick={onClick}
      isDisabled={isDisabled}
    >
      {label}
    </Button>
  );
};
