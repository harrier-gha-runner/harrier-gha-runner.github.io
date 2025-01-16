import { useState } from "react";
import { useViewportWidth } from "@/hooks/useViewportWidth";
import SetupForm from "@/components/utility/SetupForm";
import { FaChevronRight } from "react-icons/fa";
import { Separator } from "../ui/separator";

type StepType = "form" | "visual" | "other";

type Step = {
  type: StepType;
  numericTitle: number;
  id: string;
  title: string;
  content?: { alt?: string; caption: string; aside?: string }[];
  form?: React.ReactNode;
};

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
  const viewportWideEnough = useViewportWidth();

  return (
    <div id="try-harrier-nav-container" className="sticky top-[88px] z-10">
      <nav
        id="try-harrier-nav"
        className={`mx-auto flex w-fit justify-center py-2 ${viewportWideEnough ? "" : "hidden"}`}
      >
        <div className="flex flex-row gap-4 rounded-md bg-harrierWHITE p-0.5 drop-shadow-md">
          {steps?.map((step, stepIdx) => (
            <div
              key={step.id}
              onClick={() => setActiveStep(stepIdx)}
              className="relative"
            >
              <div
                className={`flex items-center overflow-hidden whitespace-nowrap rounded-md p-2 text-xl font-medium ${
                  stepIdx === activeStep
                    ? "bg-harrierBLACK text-harrierWHITE/85"
                    : "bg-quaternary/85 text-harrierBLACK"
                }`}
              >
                Step {step.numericTitle}
                {<FaChevronRight className="ml-2" />}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

const TryHarrierPage = () => {
  const [steps] = useState<Step[]>([
    {
      id: "prerequisites",
      type: "other",
      numericTitle: 0,
      title: "Prerequisites ",
    },
    {
      id: "identity-provider",
      type: "visual",
      numericTitle: 1,
      title: "Identity Provider ",
      content: [
        { caption: "image 0", aside: "aside 0" },
        { caption: "image 1" },
        { caption: "image 2" },
        { caption: "image 3" },
        { caption: "image 4" },
        { caption: "image 5", aside: "aside 5" },
        { caption: "image 6" },
        { caption: "image 7" },
        { caption: "image 8", aside: "aside 8" },
        { caption: "image 9" },
      ],
    },
    {
      id: "personal-access-token",
      type: "visual",
      numericTitle: 2,
      title: "Personal Access Token ",
      content: [
        { caption: "image 0" },
        { caption: "image 1" },
        { caption: "image 2" },
        { caption: "image 3" },
        { caption: "image 4" },
        { caption: "image 5" },
        { caption: "image 6" },
        { caption: "image 7" },
        { caption: "image 8" },
        { caption: "image 9" },
        { caption: "image 10" },
      ],
    },
    {
      id: "create-setup-yaml",
      type: "form",
      numericTitle: 3,
      title: "Create Setup YAML ",
      form: <SetupForm />,
    },
    {
      id: "workflow-yaml",
      type: "visual",
      numericTitle: 4,
      title: "Workflow YAML ",
      content: [
        { caption: "image 0" },
        { caption: "image 1" },
        { caption: "image 2" },
        { caption: "image 3" },
        { caption: "image 4" },
        { caption: "image 5" },
        { caption: "image 6" },
      ],
    },
  ]);

  const [activeStep, setActiveStep] = useState(0);

  return (
    <div>
      <div className="flex h-screen flex-col">
        <TryHarrierNav
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
        <div className="flex flex-1 items-center justify-center p-10">
          <div className="w-full max-w-7xl">
            <h2 className="mb-10 text-2xl font-bold">
              {steps[activeStep].title}
            </h2>
            <Separator
              orientation="horizontal"
              className="my-2 w-full border-b border-harrierBLACK/10"
            />
            <main>
              <section
                id={`${steps[activeStep].id}`}
                className="flex flex-col justify-start"
              >
                {steps[activeStep].type === "form" && (
                  <div>{steps[activeStep].form}</div>
                )}
                {steps[activeStep].type === "visual" && (
                  <>
                    {steps[activeStep].content?.map((item, idx) => (
                      <div
                        key={`${item.alt?.replace(/ /, "")}-${idx}`}
                        className="w-full"
                      >
                        <div>
                          <figcaption
                            id={`${steps[activeStep].id}-${idx + 1}`}
                            className="py-16 text-lg"
                          >
                            <p>
                              Step-{steps[activeStep].numericTitle}-
                              {item.caption}
                            </p>
                            {item.aside && (
                              <aside className="my-4 rounded border-l-4 border-harrierBLUE bg-harrierBLUE/15 p-4">
                                <strong>NOTE: </strong>
                                {item.aside}
                              </aside>
                            )}
                          </figcaption>
                          <div className="relative pl-8">
                            <figure
                              className="goldilocks box rounded-xl"
                              aria-labelledby={`${steps[activeStep].id}-${idx + 1}`}
                            >
                              <img
                                src={`/src/assets/screenshots/${steps[activeStep].id}/${idx}.jpg`}
                                alt={item.alt || ""}
                                className="h-auto rounded-lg object-contain shadow"
                              />
                            </figure>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {steps[activeStep].type === "other" && (
                  <div>{steps[activeStep].title}</div>
                )}
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryHarrierPage;
