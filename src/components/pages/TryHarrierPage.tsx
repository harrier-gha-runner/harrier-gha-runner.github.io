import { useState } from "react";
import { useViewportWidth } from "@/hooks/useViewportWidth";
// import SetupForm from "@/components/utility/SetupForm";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Step = {
  id: string;
  name: string;
  images?: { alt?: string }[];
  showForm?: boolean;
};

const TryHarrierNav = ({
  steps,
  currentActiveStep,
  setCurrentActiveStep,
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
              // to={`/try-harrier#${step.id}`}
              key={step.id}
              onClick={() => setCurrentActiveStep(stepIdx)}
              className="relative"
            >
              <div
                className={`overflow-hidden whitespace-nowrap rounded-md p-2 text-xl font-medium ${
                  stepIdx === currentActiveStep
                    ? "bg-harrierBLACK text-harrierWHITE/85"
                    : "bg-quaternary/85 text-harrierBLACK"
                }`}
              >
                {step.name}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

const StepSection = ({ currentStep }: { currentStep: Step }) => {
  return (
    <>
      <section
        id={`${currentStep.id}`}
        className="flex flex-1 flex-col items-center justify-center"
      >
        {currentStep.showForm && <form>a form!</form>}
        <div className="w-full max-w-6xl">
          {currentStep?.images && (
            <Carousel>
              <CarouselContent>
                {Array.from({ length: currentStep.images.length }).map(
                  (_, index) => (
                    <CarouselItem key={`${currentStep.id}-${index}`}>
                      <figcaption
                        id={`${currentStep.id}-${index + 1}`}
                        className="text-lg font-semibold"
                      >
                        {currentStep.name} image #{index + 1}
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Voluptates accusamus illo laboriosam, fuga
                          corrupti vel suscipit totam repellat unde placeat ab
                          atque voluptas esse consequatur nisi quidem quibusdam,
                          natus eaque.
                        </p>
                      </figcaption>
                      <div className="relative">
                        <figure
                          aria-labelledby={`${currentStep.id}-${index + 1}`}
                        >
                          <img
                            src={`/src/assets/screenshots/${currentStep.id}/${index}.jpg`}
                            alt=""
                            className="h-auto w-full object-contain"
                          />
                        </figure>
                        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform rounded bg-harrierBLACK/10 px-2 py-1 text-harrierBLACK">
                        {index + 1}/{currentStep.length}
                      </div> */}
                      </div>
                    </CarouselItem>
                  ),
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
      </section>
    </>
  );
};

type TryHarrierNavProps = {
  steps: Step[];
  currentActiveStep: number;
  setCurrentActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

const TryHarrierPage = () => {
  const [steps] = useState<Step[]>([
    {
      id: "preflight-check",
      name: "Start Here",
    },
    {
      id: "identity-provider",
      name: "Step 1",
      images: Array.from({ length: 10 }),
    },
    {
      id: "personal-access-token",
      name: "Step 2",
      images: Array.from({ length: 5 }),
    },
    {
      id: "secrets-manager",
      name: "Step 3",
      images: Array.from({ length: 6 }),
    },
    {
      id: "workflow-yaml",
      name: "Step 4",
      images: Array.from({ length: 6 }),
      showForm: true,
    },
  ]);

  const [currentActiveStep, setCurrentActiveStep] = useState(0);

  return (
    <div className="w-full">
      <TryHarrierNav
        steps={steps}
        currentActiveStep={currentActiveStep}
        setCurrentActiveStep={setCurrentActiveStep}
      />
      <StepSection currentStep={steps[currentActiveStep]} />
    </div>
  );
};

export default TryHarrierPage;

