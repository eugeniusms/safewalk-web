import Image from "next/image";
import { ToggleProps } from "./interface";

const Toggle = ({ isChecked }: ToggleProps) => {
  return (
    <div>
      {isChecked ? (
        <Image
          src="/assets/icons/toggle-active.svg"
          alt="toggle-on"
          width={40}
          height={40}
        />
      ) : (
        <Image
          src="/assets/icons/toggle-deactive.svg"
          alt="toggle-off"
          width={40}
          height={40}
        />
      )}
    </div>
  );
};

export default Toggle;
