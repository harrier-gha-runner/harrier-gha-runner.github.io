import { useState } from "react";

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
  length: number;
  content?: React.ReactNode;
};

const StepSection = ({ currentStep }: { currentStep: Step }) => {
  return (
    <>
      <section
        id={`${currentStep.id}`}
        className="flex flex-1 flex-col items-center justify-center"
      >
        <div className="w-full max-w-7xl">
          {currentStep.length > 0 && (
            <Carousel>
              <CarouselContent>
                {Array.from({ length: currentStep.length }).map((_, index) => (
                  <CarouselItem key={`${currentStep.id}-${index}`}>
                    <img
                      src={`/src/assets/screenshots/${currentStep.id}/${index}.jpg`}
                      alt=""
                      className="h-auto w-full object-contain"
                    />
                    <span className="prose text-xl font-semibold">
                      {currentStep.name} image #{index}
                    </span>
                  </CarouselItem>
                ))}
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

const TryHarrierPage = () => {
  const [steps] = useState<Step[]>([
    { id: "preflight-check", name: "Preflight Check", length: 0 },
    { id: "identity-provider", name: "Identity Provider", length: 10 },
    { id: "personal-access-token", name: "Personal Access Token", length: 5 },
    { id: "secrets-manager", name: "Secrets Manager", length: 6 },
    { id: "workflow-yaml", name: "Workflow Yaml", length: 7 },
  ]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  return (
    <div className="flex min-h-screen flex-col">
      <h2 className="mt-6 text-center text-3xl font-bold">Try Harrier</h2>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-center">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStepIndex(index)}
                className={`mx-2 rounded-lg px-4 py-2 ${
                  currentStepIndex === index
                    ? "bg-harrierBLACK text-harrierWHITE"
                    : "bg-harrierWHITE text-harrierBLACK"
                }`}
              >
                {step.name}
              </button>
            ))}
          </div>
          <StepSection currentStep={steps[currentStepIndex]} />
        </div>
      </div>
    </div>
  );
};

export default TryHarrierPage;
