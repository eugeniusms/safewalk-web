import { SWButton } from "src/components/elements/Button";

export default function Home() {
  return (
    <div className="container">
      <SWButton
        label="Next"
        onClick={() => console.log("CHECK")}
        // isDisabled={true}
      />
    </div>
  );
}
