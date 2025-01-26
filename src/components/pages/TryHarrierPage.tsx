import { useState, useEffect, useContext } from "react";
import { useViewportWidth } from "@/hooks/useViewportWidth";
import { SetupStepsContext, Step } from "@/providers/SetupSteps";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import { SetupForm } from "@/components/utility/SetupForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import yaml from "js-yaml";
import { formSchema } from "@/schemas/formSchema";
import { Overview } from "../utility/Overview";
import { Callout } from "../utility/Callout";

// import ip0 from "@/assets/screenshots/identity-provider/0.jpg";

type TryHarrierNavProps = {
  steps: Step[];
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

const TryHarrierNav = ({
  steps,
  activeStep,
  setActiveStep,
}: TryHarrierNavProps) => {
  const wideEnough = useViewportWidth();

  const handleForwardClick = () => {
    setActiveStep(activeStep + 1);
    window.scrollTo(0, 0);
  };

  const handleBackwardClick = () => {
    setActiveStep(activeStep - 1);
    window.scrollTo(0, 0);
  };
  return (
    <div id="try-harrier-nav-container" className="sticky top-[100px] z-10">
      <nav
        id="try-harrier-nav"
        className={`mx-auto flex w-fit justify-center py-2`}
      >
        <div className="flex flex-row gap-4 rounded-md bg-harrierWHITE p-0.5 drop-shadow-md">
          {wideEnough ? (
            <>
              {steps?.map((step, stepIdx) => (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(stepIdx)}
                  className="relative"
                >
                  <div
                    className={`flex flex-row items-center overflow-hidden whitespace-nowrap rounded-md p-2 text-xl font-medium ${
                      stepIdx === activeStep
                        ? "bg-harrierBLACK text-harrierWHITE/85"
                        : "bg-quaternary/85 text-harrierBLACK"
                    }`}
                  >
                    Step {stepIdx}
                    <FaChevronRight className="ml-2" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div
                onClick={
                  activeStep === 0
                    ? (e) => e.preventDefault()
                    : handleBackwardClick
                }
                className={`relative ${activeStep === 0 ? "pointer-events-none opacity-50" : ""}`}
              >
                <div
                  className={`flex flex-row items-center overflow-hidden whitespace-nowrap rounded-md p-2 text-xl font-medium`}
                >
                  <FaChevronLeft size="16" className="mr-2" />
                  Back {/*  {pages[activePage - 1]?.name} */}
                </div>
              </div>

              <div
                onClick={handleForwardClick}
                className={`relative ${activeStep === steps.length - 1 ? "pointer-events-none opacity-50" : ""}`}
              >
                <div
                  className={`flex flex-row items-center overflow-hidden whitespace-nowrap rounded-md p-2 text-xl font-medium`}
                >
                  Next
                  <FaChevronRight size="16" className="ml-2" />
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

type TryHarrierContentProps = {
  steps: Step[];
  activeStep: number;
  form: ReturnType<typeof useForm>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  yamlOutput: string;
};

const TryHarrierContent = ({
  steps,
  activeStep,
  form,
  onSubmit,
  yamlOutput,
}: TryHarrierContentProps) => {
  return (
    <div id="try-harrier-content-container" className="flex flex-wrap">
      <main
        id="try-harrier-content"
        className="prose mx-auto w-full max-w-screen-xl flex-1 flex-row overflow-y-auto p-10 pt-12"
      >
        <Overview title={steps[activeStep].title}>
          {steps[activeStep].introduction}
        </Overview>
        <section
          id={`${steps[activeStep].id}`}
          className="flex flex-col justify-start"
        >
          {steps[activeStep].type === "form" && (
            <SetupForm
              form={form}
              onSubmit={onSubmit}
              yamlOutput={yamlOutput}
            />
          )}
          {steps[activeStep].type === "visual" && (
            <>
              {steps[activeStep].content?.map((item, idx) => (
                <div
                  key={`${item.alt?.replace(/ /, "")}-${idx}`}
                  className="w-full"
                >
                  <figcaption
                    id={`${steps[activeStep].id}-${idx + 1}`}
                    className="py-0 text-lg"
                  >
                    <p className="flex flex-row">{item.caption}</p>
                    {item.aside && item.aside.message && (
                      <Callout
                        title={item.aside.title}
                        message={item.aside.message}
                      />
                    )}
                  </figcaption>
                  <div className="relative pl-8">
                    <figure
                      className="goldilocks box rounded-lg"
                      aria-labelledby={`${steps[activeStep].id}-${idx + 1}`}
                    >
                      <img
                        src={`/screenshots/${steps[activeStep].id}/${idx}.jpg`}
                        alt={item.alt || ""}
                        className="h-auto rounded-lg object-contain shadow"
                      />
                    </figure>
                  </div>
                </div>
              ))}
              {steps[activeStep].conclusion && (
                <span className="flex w-full flex-row py-0 text-lg">
                  {steps[activeStep].conclusion}
                </span>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

{
  /* // this is the bottom back next buttons navigation 
        <div className="mb-4 flex items-center justify-center">
          <nav className="flex justify-start space-x-2">
            <Button
              variant="ghost"
              size="lg"
              className={`px-0 text-lg ${activeStep === 0 ? "invisible" : ""}`}
              onClick={handleBackwardClick}
            >
              <FaArrowLeft className="mr-2" />
              Back
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className={`px-0 text-lg ${activeStep === steps.length - 1 ? "invisible" : ""}`}
              onClick={handleForwardClick}
            >
              Next
              <FaArrowRight className="ml-2" />
            </Button>
          </nav>
        </div> */
}

export const TryHarrierPage = () => {
  const setupContext = useContext(SetupStepsContext);
  if (!setupContext) {
    throw new Error(
      "TryHarrierPage must be rendered within a SetupHarrierContextProvider",
    );
  }
  const { steps, activeStep, setActiveStep } = setupContext;
  const [formDataJSON, setFormDataJSON] = useState("");
  const [yamlOutput, setYamlOutput] = useState("");

  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      awsAccountId: "",
      awsRegion: "us-east-1",
      instanceType: "m8g.large",
      cacheTtlHours: "72",
      cidrBlockVPC: "10.0.0.0/24",
      cidrBlockSubnet: "10.0.0.0/24",
    },
  });

  useEffect(() => {
    if (formDataJSON) {
      try {
        const {
          awsAccountId,
          awsRegion,
          cacheTtlHours,
          cidrBlockSubnet,
          cidrBlockVPC,
          instanceType,
        } = JSON.parse(formDataJSON);

        setYamlOutput(
          yaml.dump(
            {
              name: "Harrier Setup",
              on: {
                workflow_dispatch: null,
              },
              jobs: {
                "setup-harrier": {
                  "runs-on": "ubuntu-latest",
                  permissions: {
                    "id-token": "write",
                    contents: "read",
                  },
                  steps: [
                    {
                      name: "Checkout code",
                      uses: "actions/checkout@v4",
                    },
                    {
                      name: "Set up Node.js",
                      uses: "actions/setup-node@v4",
                      with: {
                        "node-version": 20,
                      },
                    },
                    {
                      name: "Configure AWS Credentials for Harrier setup",
                      uses: "aws-actions/configure-aws-credentials@v4",
                      with: {
                        audience: "sts.amazonaws.com",
                        "aws-region": awsRegion,
                        "role-to-assume": `arn:aws:iam::${awsAccountId}:role/setup-harrier`,
                      },
                    },
                    {
                      name: "Harrier Self-Hosted Runner Setup",
                      uses: "harrier-gha-runner/harrier-self-hosted-runner@main",
                      with: {
                        "gh-owner-name": "${{ github.repository_owner }}",
                        "aws-region": awsRegion,
                        "aws-account-id": parseInt(awsAccountId),
                        "instance-type": instanceType,
                        "cache-ttl-hours": parseInt(cacheTtlHours),
                        "cidr-block-vpc": cidrBlockVPC,
                        "cidr-block-subnet": cidrBlockSubnet,
                      },
                    },
                  ],
                },
              },
            },
            {
              noRefs: true,
            },
          ),
        );
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [formDataJSON, yamlOutput]);

  function handleSubmit(values: z.infer<typeof formSchema>) {
    setFormDataJSON(JSON.stringify(values, null, 2));
  }

  return (
    <>
      <TryHarrierNav
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      <TryHarrierContent
        steps={steps}
        activeStep={activeStep}
        form={form}
        onSubmit={handleSubmit}
        yamlOutput={yamlOutput}

        // handleBackwardClick={() => setActiveStep(activeStep - 1)}
      />
    </>
  );
};
