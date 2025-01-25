import { useState, useEffect } from "react";
import { useViewportWidth } from "@/hooks/useViewportWidth";
import { FaChevronRight, FaArrowRight, FaArrowLeft } from "react-icons/fa";

import { SetupForm } from "@/components/utility/SetupForm";
import { ExternalLink } from "@/components/utility/ExternalLink";
import { BoldText as BT } from "@/components/utility/BoldText";
import { CodeBlock as CB } from "@/components/utility/CodeBlock";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import yaml from "js-yaml";
import { formSchema } from "@/schemas/formSchema";
import { Button } from "../ui/button";
import { Overview } from "../utility/Overview";
import { Callout } from "../utility/Callout";

// import ip0 from "@/assets/screenshots/identity-provider/0.jpg";

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

  return (
    <div id="try-harrier-nav-container" className="sticky top-[88px] z-10">
      <nav
        id="try-harrier-nav"
        className={`mx-auto flex w-fit justify-center py-2 ${wideEnough ? "" : "hidden"}`}
      >
        <div className="flex flex-row gap-4 rounded-md bg-harrierWHITE p-0.5 drop-shadow-md">
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
                <div>Step {step.numericTitle}</div>
                <FaChevronRight className="ml-2" />
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
        <div className="mb-4 flex items-center justify-end">
          <nav className="flex justify-start space-x-2">
            <Button
              variant="ghost"
              size="lg"
              className={`px-0 text-lg ${activeStep === 0 ? "invisible" : ""}`}
              onClick={handleBackwardClick}
            >
              <FaArrowLeft className="mr-2" />
              Prev
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
        </div>
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
            </>
          )}
        </section>

        <nav className="flex justify-end">
          <Button
            variant="ghost"
            size="lg"
            className={`px-0 text-lg ${activeStep === steps.length - 1 ? "invisible" : ""}`}
            onClick={handleForwardClick}
          >
            <FaArrowRight className="ml-2" />
          </Button>
        </nav>
      </main>
    </div>
  );
};

export const TryHarrierPage = () => {
  const [activeStep, setActiveStep] = useState(0);
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
        <span>
          <p>
            Before proceeding, ensure you have a <BT> AWS Account</BT> and an{" "}
            <BT>Github Organization</BT>. If you don't yet have these, you can
            create them by following the links below. If you already have these,
            you can skip this step and continue to step 1.
          </p>
          <ol className="flex flex-col align-middle">
            <li>
              <ExternalLink
                href="https://aws.amazon.com/"
                children="Create a paid AWS Account"
              />
            </li>
            {/* <FaAws size="30" className="mr-2 inline-block" /> */}
            <li>
              <ExternalLink
                href="https://github.com/organizations/plan"
                children="Create a GitHub Organization"
              />
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
          <p>
            <ExternalLink
              href="https://openid.net/developers/how-connect-works/"
              children="OpenID Connect"
            />{" "}
            (OIDC) is an authentication protocol built on top of OAuth 2.0,
            allowing applications to verify user identities through an identity
            provider like GitHub. OIDC issues ID tokens (usually JSON Web
            Tokens) that authenticate users and provide profile information,
            enabling{" "}
            <ExternalLink
              href="https://auth0.com/docs/authenticate/login/oidc-conformant-authentication/oidc-adoption-sso"
              children="single sign-on"
            />
            . OIDC is widely used for secure authentication, and in the context
            of GitHub, facilitates connections with external services by
            enabling secure, temporary credentials through OIDC tokens. This
            allows GitHub Actions to authenticate with cloud providers without
            requiring static credentials, thus offering enhanced security and
            seamless integration for CI/CD workflows.
          </p>
        </span>
      ),
      conclusion: "conclusion",
      content: [
        {
          caption: (
            <span>
              In AWS Console, navigate to the <BT>IAM service</BT>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Select <BT>Identity providers</BT> from the left-hand menu.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Click <BT>Add Provider.</BT>
            </span>
          ),
        },
        {
          caption: (
            <span>
              Select <BT>OpenID Connect</BT> as the provider type, set Provider
              URL to <CB>token.actions.githubusercontent.com</CB>, and Audience
              to: <CB>sts.amazonaws.com</CB>. Confirm by clicking{" "}
              <BT>Add Provider.</BT>
            </span>
          ),
        },
        {
          caption: (
            <span>
              Click into your new <BT>Identity provider</BT>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              After confirming that the <BT>Audience</BT> of the created
              Identity is: <CB>sts.amazonaws.com</CB>, click{" "}
              <BT>Assign role</BT>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Select <BT>Create a new role</BT> then click <BT>Next</BT>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Select <BT>Web identity</BT> as Trusted entity type. Then, from
              the drop-down menu, choose{" "}
              <CB>token.actions.githubusercontent.com</CB> as the Identity
              provider and <CB>sts.amazonaws.com </CB> as Audience. Set the{" "}
              <BT>GitHub Organization</BT> field to the GH organization or owner
              name, such as "Mock-Org". Optionally, choose to restrict access to
              a specific GitHub repository and branch. Once completed, click{" "}
              <BT>Next</BT> to begin adding permissions to the role.
            </span>
          ),
        },
        {
          caption: (
            <span>
              In <BT>Add permissions</BT> menu, search for and select the
              following policies: <CB>AmazonVPCFullAccess</CB>,
              <CB>AmazonEC2FullAccess</CB>, <CB>AmazonS3FullAccess</CB>,{" "}
              <CB>AWSLambda_FullAccess</CB>,<CB>IAMFullAccess</CB>,{" "}
              <CB>AmazonAPIGatewayAdministrator</CB>,
              <CB>AmazonEventBridgeFullAccess</CB>,{" "}
              <CB>AWSWAFConsoleFullAccess</CB>, and
              <CB>SecretsManagerReadWrite</CB>.
            </span>
          ),
          aside: {
            title: "Note",
            message: "Principle of least privilege",
          },
        },
        {
          caption: (
            <span>
              After selecting the above policies, click <BT>Next.</BT>
            </span>
          ),
        },
        {
          caption: (
            <span>
              Name the role, review permissions, and click <BT>Create role</BT>.
            </span>
          ),
        },
      ],
    },
    {
      id: "personal-access-token",
      type: "visual",
      numericTitle: 2,

      title: "Create a personal access token on GitHub",
      introduction: (
        <span>
          <p>
            <ExternalLink
              href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#about-personal-access-tokens"
              children="Personal Access Tokens"
            />{" "}
            (PAT) are used to securely authenticate and authorize access to a
            platform's APIs, enabling actions like managing resources and
            automating tasks without exposing sensitive credentials. Harrier
            requires a PAT to facilitate the authentication of{" "}
            <ExternalLink
              href="https://docs.github.com/en/rest/about-the-rest-api/about-the-rest-api?apiVersion=2022-11-28"
              children="API request/response cycles."
            />{" "}
            By securely storing the token in AWS Secrets Manager, Harrier
            ensures it remains protected and accessible only when required,
            reducing the risk of unauthorized access and maintaining strict
            control over sensitive credentials.
          </p>
        </span>
      ),
      conclusion: "conclusion",
      content: [
        {
          caption: (
            <span>
              Identify and navigate to a <BT>GitHub Organization.</BT>
            </span>
          ),
        },
        {
          caption: (
            <span>
              Click on the following link:{" "}
              <ExternalLink
                href="https://github.com/settings/tokens"
                children="github.com/settings/tokens"
              />{" "}
              to create a new personal access token.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Click <BT>Generate new token</BT> and token type <BT>classic</BT>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Add a memorable name in the <BT>Note</BT> field for your token,
              choose a sensible <BT>Expiration</BT> and check the following
              boxes: <CB>repo</CB>, <CB>workflow</CB>, <CB>admin:org</CB>, and{" "}
              <CB copy={false}>admin:org_hook</CB>. Once the required selections
              are made, click <BT>Generate token</BT>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Take heed of the GitHub notification and{" "}
              <BT className="text-harrierBLACK">
                copy the freshly-minted personal access token.
              </BT>
            </span>
          ),
        },
        {
          caption: (
            <span>
              Open <BT>AWS Console</BT> and navigate to the{" "}
              <BT>Secrets Manager</BT> service.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Click <BT>Store a new secret</BT>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              In Secret type, select Other type of secret. Choose{" "}
              <BT>plaintext</BT> in Key/value pairs and paste the GH personal
              access token from before into the editor. Click <BT>Next</BT>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Input: <CB>github/pat/harrier</CB> into the Secret name field and
              optionally provide a description of the secret, any tags, and any
              additional resource permissions. Click <BT>Next</BT>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Leave Configure automatic rotation in its default position and
              click <BT>Next</BT>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              After reviewing configuration details, click <BT>Store</BT>.
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
          <p>
            {" "}
            Fill out the form fields below to and click <BT>Generate</BT> to
            render a your <CB>harrier_setup.yaml</CB>. Executing this workflow
            will deploy a fleet of self-hosted runners into your AWS account,
            enabling you to run your GitHub Actions workflows on your own AWS
            infrastructure. If you would like to learn more about the specific
            field, simply hover the respective label.
          </p>
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
          <p>
            With <CB>harrier_setup.yaml</CB> in tow, all that's left to do is
            add the yaml to a GitHub repository and execute the workflow.
          </p>
        </span>
      ),
      conclusion: "conclusion",
      content: [
        {
          caption: (
            <span>
              Navigate to a <BT>GitHub repository.</BT>
            </span>
          ),
        },
        {
          caption: (
            <span>
              Click <BT>Actions</BT>, then <BT>set up a workflow.</BT>
            </span>
          ),
        },
        {
          caption: (
            <span>
              Name the file, paste the content of <CB>harrier_setup.yaml</CB>{" "}
              into the editor, and click <BT>Commit changes...</BT>
            </span>
          ),
        },
        {
          caption: (
            <span>
              Confirm <CB>.github/workflows</CB> is present.
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
              Double-check <CB>harrier_setup.yaml</CB> was committed
              successfully.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Navigate to <BT>Actions</BT>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              In the left-menu, select the new workflow and click{" "}
              <BT>Run workflow</BT>.
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
};
