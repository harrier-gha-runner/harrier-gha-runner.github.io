import SetupForm from "@/components/utility/SetupForm";
import { useViewportWidth } from "@/hooks/useViewportWidth";
import {
  FaChevronRight,
  FaArrowRight,
  FaArrowLeft,
  //   FaAws,
  //   FaGithub,
} from "react-icons/fa";
import { Separator } from "../ui/separator";
import { ExternalLink } from "@/components/utility/ExternalLink";
import { BoldText } from "@/components/utility/BoldText";
import { CodeBlock } from "@/components/utility/CodeBlock";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import yaml from "js-yaml";
import { formSchema } from "@/schemas/formSchema";
import { Button } from "../ui/button";

type StepType = "form" | "visual" | "other";

type Step = {
  type: StepType;
  numericTitle: number;
  id: string;
  title: string;
  introduction: React.ReactElement | string;
  conclusion?: React.ReactElement | string;
  content?: {
    alt?: string;
    caption: React.ReactElement | string;
    aside?: {
      title: "Note" | "Remember" | "Caution";
      message: string;
    };
  }[];
  form?: React.ReactNode;
};

const Callout = ({
  title,
  message,
  color = "BLUE",
}: {
  title: string;
  message: string;
  color: "BLUE" | "PINK" | "BLACK" | "YELLOW" | "WHITE" | "OFFWHITE";
}) => {
  return (
    <aside
      className={`mx-10 mt-4 rounded border-l-4 border-harrier${color} bg-harrier${color}/15 p-4`}
    >
      <div className="flex items-center">
        <FaChevronRight size="16" className="mr-2" />
        <span className="font-bold">{title}</span>: {message}
      </div>
    </aside>
  );
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
  handleForwardClick: () => void;
  handleBackwardClick: () => void;
  yamlOutput: string;
};

const TryHarrierContent = ({
  steps,
  activeStep,
  form,
  onSubmit,
  yamlOutput,
  handleForwardClick,
  handleBackwardClick,
}: TryHarrierContentProps) => {
  return (
    <div id="try-harrier-content-container" className="flex flex-wrap">
      <main
        id="try-harrier-content"
        className="prose mx-auto w-full max-w-screen-xl flex-1 flex-row overflow-y-auto p-10 pt-12"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{steps[activeStep].title}</h2>
          <div className="flex justify-start">
            <Button
              variant="ghost"
              size="lg"
              className={`px-0 text-lg ${activeStep === 0 ? "invisible" : ""}`}
              onClick={handleBackwardClick}
            >
              <FaArrowLeft className="mr-2" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className={`px-0 text-lg ${activeStep === steps.length - 1 ? "invisible" : ""}`}
              onClick={handleForwardClick}
            >
              <FaArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
        <Separator
          orientation="horizontal"
          className="my-2 w-full border-b border-harrierBLACK/10"
        />
        <div className="my-4">{steps[activeStep].introduction}</div>
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
                    {item.aside && item.aside.message && (
                      <Callout
                        title={item.aside.title}
                        message={item.aside.message}
                        color="YELLOW"
                      />
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
        </section>

        <div className="flex justify-between">
          <Button
            variant="ghost"
            size="lg"
            className={`px-0 text-lg ${activeStep === 0 ? "invisible" : ""}`}
            onClick={handleBackwardClick}
          >
            <FaArrowLeft className="mr-2" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className={`px-0 text-lg ${activeStep === steps.length - 1 ? "invisible" : ""}`}
            onClick={handleForwardClick}
          >
            <FaArrowRight className="ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default function TryHarrierPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [formDataJSON, setFormDataJSON] = useState("");
  const [yamlOutput, setYamlOutput] = useState("");

  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      awsAccountId: "",
      awsRegion: "us-east-1",
      instanceType: "",
      cacheTtlHours: "72",
      cidrBlockVPC: "10.0.0.0/24",
      cidrBlockSubnet: "10.0.0.0/24",
    },
  });

  const [steps] = useState<Step[]>([
    {
      id: "prerequisites",
      type: "other",
      numericTitle: 0,
      title: "Prerequisites",
      introduction: (
        <span className="">
          Before proceeding, ensure you have a <BoldText> AWS Account</BoldText>{" "}
          and an <BoldText>Github Organization</BoldText>. If you don't yet have
          these, you can create them by following the links below. If you
          already have these, you can skip this step and continue to step 1.
          <ol className="flex flex-col align-middle">
            <li>
              <ExternalLink href="https://aws.amazon.com/">
                Create a paid AWS Account
              </ExternalLink>
            </li>
            {/* <FaAws size="30" className="mr-2 inline-block" /> */}
            <li>
              <ExternalLink href="https://github.com/organizations/plan">
                Create a GitHub Organization
              </ExternalLink>
            </li>

            {/* <FaGithub size="30" className="mr-2 inline-block" /> */}
          </ol>
        </span>
      ),
      conclusion: "conclusion",
      //   content: [
      //     { caption: "Paid AWS account" },
      //     { caption: "GitHub Organization" },
      //   ],
    },
    {
      id: "identity-provider",
      type: "visual",
      numericTitle: 1,
      title: "Create an OpenID Connect identity provider in IAM",
      introduction: (
        <span>
          <ExternalLink href="https://openid.net/developers/how-connect-works/">
            OpenID Connect
          </ExternalLink>{" "}
          (OIDC) is an authentication protocol built on top of OAuth 2.0,
          allowing applications to verify user identities through an identity
          provider like GitHub. OIDC issues ID tokens (usually JWTs) that
          authenticate users and provide profile information, enabling{" "}
          <ExternalLink href="https://auth0.com/docs/authenticate/login/oidc-conformant-authentication/oidc-adoption-sso">
            single sign-on
          </ExternalLink>
          . OIDC is widely used for secure authentication, and in the context of
          GitHub, facilitates connections with external services by enabling
          secure, temporary credentials through OIDC tokens. This allows GitHub
          Actions to authenticate with cloud providers without requiring static
          credentials, thus offering enhanced security and seamless integration
          for CI/CD workflows.
        </span>
      ),
      conclusion: "conclusion",
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
              Provider URL to{" "}
              <CodeBlock>https://token.actions.githubusercontent.com</CodeBlock>{" "}
              and Audience to: <CodeBlock>sts.amazonaws.com</CodeBlock>. Confirm
              by clicking <BoldText>Add Provider</BoldText>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Click into your new <BoldText>Identity provider</BoldText>.
            </span>
          ),
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
              Audience. Set the <BoldText>GitHub Organization</BoldText> field
              to the GH organization or owner name, such as harrier-gha-runner.
              Optionally, choose to restrict access to a specific GitHub
              repository and branch. Once completed, click{" "}
              <BoldText>Next</BoldText> to begin adding permissions to the role.
            </span>
          ),
        },
        {
          caption: (
            <span>
              In <BoldText>Add permissions</BoldText> menu, search for and
              select the following policies:{" "}
              {/* <ul>
                {[
                  "AmazonVPCFullAccess",
                  "AmazonEC2FullAccess",
                  "AmazonS3FullAccess",
                  "AWSLambda_FullAccess",
                  "IAMFullAccess",
                  "AmazonAPIGatewayAdministrator",
                  "AmazonEventBridgeFullAccess",
                  "AWSWAFConsoleFullAccess",
                  "SecretsManagerReadWrite",
                ].map((policy) => (
                  <li>
                    <CodeBlock>{policy}</CodeBlock>
                  </li>
                ))}
              </ul> */}
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
            title: "Note",
            message: "Principle of least privilege",
          },
        },
        {
          caption: "",
          aside: {
            title: "Remember",
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
      title: "Create a Personal Access Token on GitHub",
      introduction: (
        <span>
          A{" "}
          <ExternalLink href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#about-personal-access-tokens">
            Personal Access Tokens
          </ExternalLink>{" "}
          (PAT) are used to securely authenticate and authorize access to a
          platform's APIs, enabling actions like managing resources and
          automating tasks without exposing sensitive credentials. Harrier
          requires a PAT to facilitate the authentication of{" "}
          <ExternalLink href="https://docs.github.com/en/rest/about-the-rest-api/about-the-rest-api?apiVersion=2022-11-28">
            API request/response cycles.
          </ExternalLink>{" "}
          By securely storing the token in AWS Secrets Manager, Harrier ensures
          it remains protected and accessible only when required, reducing the
          risk of unauthorized access and maintaining strict control over
          sensitive credentials.
        </span>
      ),
      conclusion: "conclusion",

      content: [
        {
          caption: (
            <span>
              Identify and navigate to a{" "}
              <BoldText>GitHub Organization.</BoldText>
            </span>
          ),
        },
        {
          caption: (
            <span>
              Click on the following link:{" "}
              <ExternalLink href="https://github.com/settings/tokens">
                github.com/settings/tokens
              </ExternalLink>{" "}
              to create a new personal access token.
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
              and <CodeBlock>admin:org_hook</CodeBlock>. Once the required
              selections are made, click <BoldText>Generate token</BoldText>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Take heed of the GitHub notification and{" "}
              <BoldText className="text-harrierBLACK">
                copy the freshly-minted personal access token.
              </BoldText>
            </span>
          ),
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
          caption: (
            <span>
              In Secret type, select Other type of secret. Choose{" "}
              <BoldText>plaintext</BoldText> in Key/value pairs and paste the GH
              personal access token from before into the editor. Click{" "}
              <BoldText>Next</BoldText>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Input: <CodeBlock>github/pat/harrier</CodeBlock> into the Secret
              name field and optionally provide a description of the secret, any
              tags, and any additional resource permissions. Click{" "}
              <BoldText>Next</BoldText>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Leave Configure automatic rotation in its default position and
              click <BoldText>Next</BoldText>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              After reviewing configuration details, click{" "}
              <BoldText>Store</BoldText>.
            </span>
          ),
        },
      ],
    },
    {
      id: "create-setup-yaml",
      type: "form",
      numericTitle: 3,
      title: "Select your runner configuration settings",
      introduction: (
        <span>
          Fill out the form fields below to and click{" "}
          <BoldText>Generate</BoldText> to render a your{" "}
          <CodeBlock>harrier_setup.yaml</CodeBlock>. Executing this workflow
          will deploy a fleet of self-hosted runners into your AWS account,
          enabling you to run your GitHub Actions workflows on your own AWS
          infrastructure. If you would like to learn more about the specific
          field, simply hover the respective label.
        </span>
      ),
      conclusion: "conclusion",
    },
    {
      id: "workflow-yaml",
      type: "visual",
      numericTitle: 4,
      title: "Auto-deploy self-hosted runner fleet into AWS account",
      introduction: (
        <span>
          With <CodeBlock>harrier_setup.yaml</CodeBlock> in tow, all that's left
          to do is add the yaml to a GitHub repository and execute the workflow.
        </span>
      ),
      conclusion: "conclusion",
      content: [
        {
          caption: (
            <span>
              Navigate to a <BoldText>GitHub repository.</BoldText>
            </span>
          ),
        },
        {
          caption: (
            <span>
              Click <BoldText>Actions</BoldText>, then{" "}
              <BoldText>set up a workflow yourself</BoldText>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Name the file, paste the content of{" "}
              <CodeBlock>harrier_setup.yaml</CodeBlock> into the editor, and
              click <BoldText>Commit changes...</BoldText>
            </span>
          ),
        },
        {
          caption: (
            <span>
              Confirm <CodeBlock>.github/workflows</CodeBlock> is present.
            </span>
          ),
          //   aside: {
          //     title: "Note",
          //     message: "If ",
          //   },
        },
        {
          caption: (
            <span>
              Double-check <CodeBlock>harrier_setup.yaml</CodeBlock> was
              committed successfully.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Navigate to <BoldText>Actions</BoldText>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              In the left-menu, select the new workflow and click{" "}
              <BoldText>Run workflow</BoldText>.
            </span>
          ),
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
        handleForwardClick={() => setActiveStep(activeStep + 1)}
        handleBackwardClick={() => setActiveStep(activeStep - 1)}
      />
    </>
  );
}
