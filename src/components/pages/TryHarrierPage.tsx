import SetupForm from "@/components/utility/SetupForm";
import RenderYaml from "@/components/utility/RenderYaml";
import { useState } from "react";

const TryHarrierPage = () => {
  const [formDataJSON, setFormDataJSON] = useState("");
  return (
    <>
      <h2 className="text-center text-3xl font-bold">Get Started</h2>
      {formDataJSON === "" ? (
        <SetupForm setFormDataJSON={setFormDataJSON} />
      ) : (
        <RenderYaml formDataJSON={formDataJSON} />
      )}
    </>
  );
};

export default TryHarrierPage;
