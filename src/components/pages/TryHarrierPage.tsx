import { useState } from "react";
import { useViewportWidth } from "@/hooks/useViewportWidth";
import { FaChevronRight } from "react-icons/fa";
import { Separator } from "../ui/separator";
import SetupForm from "@/components/utility/SetupForm";

type StepType = "form" | "visual" | "other";

type Step = {
  type: StepType;
  numericTitle: number;
  id: string;
  title: string;
  introduction: string;
  content?: {
    alt?: string;
    caption: React.ReactElement | string;
    aside?: { title: "NOTE" | "REMEMBER" | "CAUTION"; message: string };
  }[];
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

type TryHarrierContentProps = {
  steps: Step[];
  activeStep: number;
};

const TryHarrierContent = ({ steps, activeStep }: TryHarrierContentProps) => {
  return (
    <div id="try-harrier-content-container" className="flex flex-wrap">
      <main
        id="try-harrier-content"
        className="prose mx-auto w-full max-w-screen-xl flex-1 flex-row overflow-y-auto p-10 pt-12"
      >
        <h2 className="mb-4 text-2xl font-bold">{steps[activeStep].title}</h2>
        <Separator
          orientation="horizontal"
          className="my-2 w-full border-b border-harrierBLACK/10"
        />
        <p className="my-4">{steps[activeStep].introduction}</p>
        <Separator
          orientation="horizontal"
          className="my-2 w-full border-b border-harrierBLACK/10"
        />

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
                  <figcaption
                    id={`${steps[activeStep].id}-${idx + 1}`}
                    className="py-0 text-lg"
                  >
                    <p className="flex flex-row">{item.caption}</p>
                    {item.aside && (
                      <aside className="mt-4 rounded border-l-4 border-harrierBLUE bg-harrierBLUE/15 p-4">
                        <div className="flex items-center font-bold">
                          <FaChevronRight size="16" className="mr-2" />
                          {item.aside.title}
                        </div>
                        <p>{item.aside.message}</p>
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
              ))}
            </>
          )}
          {steps[activeStep].type === "other" && (
            <div>{steps[activeStep].title}</div>
          )}
        </section>
      </main>
    </div>
  );
};
export default function TryHarrierPage() {
  const [steps] = useState<Step[]>([
    {
      id: "prerequisites",
      type: "other",
      numericTitle: 0,
      introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      title: "Prerequisites",
    },
    {
      id: "identity-provider",
      type: "visual",
      numericTitle: 1,
      introduction: `To create an IAM Identity Provider in AWS, go to IAM in the console, select "Identity Providers," and add an "OpenID Connect" provider with the URL https://token.actions.githubusercontent.com and audience sts.amazonaws.com. Next, assign a role to the provider, select "Web identity," and configure the role with necessary permissions like AmazonVPCFullAccess, EC2, S3, Lambda, and more. Finally, name the role, create it, and note down the ARN for future use.`,
      title: "Create an IAM Identity Provider",
      content: [
        {
          caption: "In your AWS Console, navigate to the IAM service.",
        },
        {
          caption: "Select Identity providers from the left-hand menu.",
        },
        { caption: "Click Add provider." },
        {
          caption:
            "Select the OpenID Connect provider type, enter the provider URL as https://token.actions.githubusercontent.com, and set the audience to sts.amazonaws.com. Confirm by clicking Add Provider.",
        },
        {
          caption: "Click into your newly-created provider.",
        },
        {
          caption:
            "After confirming that the Identity Audience is: sts.amazonaws.com, click the Assign role button.",
        },
        { caption: "Choose: Create a new role and click Next." },
        {
          caption:
            "Select the Web identity as the Trusted entity type. From the drop-down menu, choose token.actions.githubusercontent.com as the Identity provider. Then, select sts.amazonaws.com as the Audience. Enter your GitHub organization or owner name, such as harrier-gha-runner. Optionally, you can restrict access to a specific GitHub repository and branch. Once completed, click the Next button to begin adding permission policies to the role.",
        },
        {
          caption:
            "In the Add permissions menu, search for and select the following policies: AmazonVPCFullAccess, AmazonEC2FullAccess, AmazonS3FullAccess, AWSLambda_FullAccess, IAMFullAccess, AmazonAPIGatewayAdministrator, AmazonEventBridgeFullAccess, AWSWAFConsoleFullAccess, SecretsManagerReadWrite.",
          aside: {
            title: "NOTE",
            message:
              "We had said we wanted to apply the principle of least privilege to our permissions. However, for the sake of this tutorial, we are granting broad permissions to the role. In a production environment, you should restrict permissions to only what is necessary.",
          },
        },
        {
          caption: "",
          aside: {
            title: "REMEMBER",
            message:
              "MISSING a slide here for step 3: Name, review, and create",
          },
        },
      ],
    },
    {
      id: "personal-access-token",
      type: "visual",
      numericTitle: 2,
      introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      title: "Personal Access Token",
      content: [
        {
          caption:
            "Identify the GitHub Organization within which you have workflows you wish to begin accelerating.",
        },
        {
          caption: "Navigate to this url: https://github.com/settings/tokens.",
        },
        {
          caption:
            "Click Generate new token and in the dropdown menu select classic as your token type.",
        },
        {
          caption:
            "Add a meaningful name in the Note field for your token and check the following boxes: repo, workflow, admin:org, and admin:org_hook. Once the selections are made, click Generate token.",
        },
        {
          caption:
            "Take heed of the blue GitHub notification and copy your freshly-minted personal access token.  You will need it later.",
        },
        {
          caption:
            "Open the AWS Console and navigate to the Secrets Manager service.",
        },
        { caption: "Click Store a new secret." },
        {
          caption:
            "In Secret type, select Other type of secret.  In Key/Value pairs, choose plaintext and paste the GH personal access token and click Next.",
        },
        {
          caption:
            "Input: github/pat/harrier into the Secret name field, optionally provide a description of the secret, and optionally add any tags or additional resource permissions. Click Next.",
        },
        {
          caption:
            "Leave the Configure automatic rotation in its default (left) position.  Click Next.",
        },
        {
          caption: "After reviewing configuration details, click Store.",
        },
      ],
    },
    {
      id: "create-setup-yaml",
      type: "form",
      numericTitle: 3,
      introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      title: "Create Setup YAML",
      form: <SetupForm />,
    },
    {
      id: "workflow-yaml",
      type: "visual",
      numericTitle: 4,
      introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      title: "Workflow YAML",
      content: [
        {
          caption:
            "Navigate to the GitHub repository you plan to setup self-hosted runners in.",
        },
        { caption: "Click Actions, then set up a workflow yourself." },
        {
          caption:
            "Give your new workflow a sensible file name, paste the YAML you just copied into the editor, and Commit changes...",
        },
        {
          caption: "CAPTION",
          aside: {
            title: "NOTE",
            message: "What makes sense to say here?",
          },
        },
        { caption: "Confirm the changes were committed successfully." },
        { caption: "Click Actions." },
        {
          caption:
            "In the left-menu, select your new workflow and click Run workflow.",
        },
      ],
    },
  ]);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <TryHarrierNav
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      <TryHarrierContent steps={steps} activeStep={activeStep} />
    </>
  );
}
