import { useViewportWidth } from "@/hooks/useViewportWidth";
import { FaChevronRight } from "react-icons/fa";
import { Separator } from "../ui/separator";
import SetupForm from "@/components/utility/SetupForm";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import yaml from "js-yaml";
import { Link } from "react-router-dom";
import { Bold } from "lucide-react";

const formSchema = z.object({
  awsRegion: z.enum(["us-east-1", "us-east-2", "us-west-1", "us-west-2", ""], {
    errorMap: () => ({
      message:
        "AWS Region must be one of the following: us-east-1, us-east-2, us-west-1, us-west-2",
    }),
  }),
  awsAccountId: z.string().regex(/^\d{12}$/, {
    message: "AWS Account ID must consist of exactly 12 digit characters.",
  }),
  instanceType: z.string().min(1, { message: "Instance Type is required." }),
  cacheTtlHours: z.string().min(1, {
    message: "Cache TTL Hours must be a number greater than or equal to 1.",
  }),
  cidrBlockVPC: z.string().min(1, { message: "CIDR Block VPC is required." }),
  cidrBlockSubnet: z
    .string()
    .min(1, { message: "CIDR Block Subnet is required." }),
});

type StepType = "form" | "visual" | "other";

type Step = {
  type: StepType;
  numericTitle: number;
  id: string;
  title: string;
  introduction: React.ReactElement | string;
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

const BoldText = ({ children }: { children: React.ReactNode }) => (
  <span className="font-semibold">{children}</span>
);

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <span className="code-block">{children}</span>
);
export default function TryHarrierPage() {
  const [activeStep, setActiveStep] = useState(2);
  const [formDataJSON, setFormDataJSON] = useState("");
  const [yamlOutput, setYamlOutput] = useState("");

  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      awsAccountId: "",
      awsRegion: "us-east-1",
      instanceType: "",
      cacheTtlHours: 72,
      cidrBlockVPC: "10.0.0.0/24",
      cidrBlockSubnet: "10.0.0.0/24",
    },
  });

  const [steps] = useState<Step[]>([
    {
      id: "prerequisites",
      type: "other",
      numericTitle: 0,
      introduction: (
        <>
          <span className="code-block">aws configure</span> more text{" "}
          <span className="font-semibold">bold text</span>
        </>
      ),
      title: "Prerequisites",
    },
    {
      id: "identity-provider",
      type: "visual",
      numericTitle: 1,
      introduction: `OpenID Connect (OIDC) is an authentication protocol built on top of OAuth 2.0, allowing applications to verify user identities through an identity provider like GitHub. It issues ID tokens (usually JWTs) that authenticate users and provide profile information, enabling single sign-on (SSO). OIDC is widely used for secure authentication, and in the context of GitHub, it facilitates connections with external services (e.g., AWS) by enabling secure, temporary credentials through OIDC tokens. This allows GitHub Actions, for instance, to authenticate with cloud providers without requiring static credentials, offering enhanced security and seamless integration for CI/CD workflows.`,
      title: "Create an OpenID Connect (OIDC) identity provider in IAM",
      content: [
        {
          caption: (
            <span>
              In AWS Console, navigate to the <BoldText>IAM service</BoldText>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Select <BoldText>Identity providers</BoldText> from the left-hand
              menu.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Click <BoldText>Add Provider.</BoldText>
            </span>
          ),
        },
        {
          caption: (
            <span>
              Select the <BoldText>OpenID Connect</BoldText> provider type, set
              provider URL to{" "}
              <CodeBlock>https://token.actions.githubusercontent.com</CodeBlock>{" "}
              and audience to: <CodeBlock>sts.amazonaws.com</CodeBlock>. Confirm
              by clicking <BoldText>Add Provider</BoldText>.
            </span>
          ),
        },
        {
          caption: "Click into your newly-created provider.",
        },
        {
          caption: (
            <span>
              After confirming that the Audience of the created Identity is:{" "}
              <CodeBlock>sts.amazonaws.com</CodeBlock>, click{" "}
              <BoldText>Assign role</BoldText>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Select <BoldText>Create a new role</BoldText> and click{" "}
              <BoldText>Next</BoldText>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Select <BoldText>Web identity</BoldText> as Trusted entity type.
              Then, from the drop-down menu, choose{" "}
              <CodeBlock>token.actions.githubusercontent.com</CodeBlock> as the
              Identity provider and <CodeBlock>sts.amazonaws.com </CodeBlock> as
              Audience. Set the GitHub Organization field to the GH organization
              or owner name, such as harrier-gha-runner. Optionally, you can
              choose to restrict access to a specific GitHub repository and
              branch. Once completed, click <BoldText>Next</BoldText> to begin
              adding permissions to the role.
            </span>
          ),
        },
        {
          caption: (
            <span>
              In <BoldText>Add permissions</BoldText> menu, search for and
              select the following policies:{" "}
              <CodeBlock>AmazonVPCFullAccess</CodeBlock>,
              <CodeBlock>AmazonEC2FullAccess</CodeBlock>,{" "}
              <CodeBlock>AmazonS3FullAccess</CodeBlock>,{" "}
              <CodeBlock>AWSLambda_FullAccess</CodeBlock>,
              <CodeBlock>IAMFullAccess</CodeBlock>,{" "}
              <CodeBlock>AmazonAPIGatewayAdministrator</CodeBlock>,
              <CodeBlock>AmazonEventBridgeFullAccess</CodeBlock>,{" "}
              <CodeBlock>AWSWAFConsoleFullAccess</CodeBlock>, and
              <CodeBlock>SecretsManagerReadWrite</CodeBlock>.
            </span>
          ),
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
      title: "Create a GitHub Personal Access Token (PAT)",
      content: [
        {
          caption:
            "Identify the GitHub Organization within which you have workflows you wish to begin accelerating.",
        },
        {
          caption: (
            <span>
              Navigate to this url:{" "}
              <a
                href="https://github.com/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CodeBlock>github.com/settings/tokens</CodeBlock>
              </a>
              .
            </span>
          ),
        },
        {
          caption: (
            <span>
              Click <BoldText>Generate new token</BoldText> and token type{" "}
              <BoldText>classic</BoldText>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Add a memorable name in the <BoldText>Note</BoldText> field for
              your token, choose a sensible <BoldText>Expiration</BoldText> and
              check the following boxes: <CodeBlock>repo</CodeBlock>,{" "}
              <CodeBlock>workflow</CodeBlock>, <CodeBlock>admin:org</CodeBlock>,
              and
              <CodeBlock>admin:org_hook</CodeBlock>. Once the required
              selections are made, click <BoldText>Generate token</BoldText>.
            </span>
          ),
        },
        {
          caption:
            "Take heed of the GitHub notification and copy your freshly-minted personal access token.  You will need it soon.",
        },
        {
          caption: (
            <span>
              Open <BoldText>AWS Console</BoldText> and navigate to the{" "}
              <BoldText>Secrets Manager</BoldText> service.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Click <BoldText>Store a new secret</BoldText>.
            </span>
          ),
        },
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
      title: "Select your runner configuration settings",
    },
    {
      id: "workflow-yaml",
      type: "visual",
      numericTitle: 4,
      introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      title: "Auto-deploy self-hosted runner fleet into AWS account",
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
              name: "Set Harrier on AWS infrastructure and GitHub webhooks",
              on: {
                workflow_dispatch: null,
              },
              jobs: {
                "setup-harrier-runner": {
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
      />
    </>
  );
}
