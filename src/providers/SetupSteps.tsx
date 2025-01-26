import { useState, createContext, ReactNode } from "react";
import { BoldText as BT } from "@/components/utility/BoldText";
import { CodeBlock as CB } from "@/components/utility/CodeBlock";
import { ExternalLink } from "@/components/utility/ExternalLink";

type StepType = "form" | "visual" | "other";

export type Step = {
  type: StepType;
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

interface SetupStepsContextProps {
  steps: Step[];
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const SetupStepsContext = createContext<SetupStepsContextProps | null>(null);

const SetupStepsProvider = ({ children }: { children: ReactNode }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [steps] = useState<Step[]>([
    {
      id: "prerequisites",
      type: "other",
      title: "Prerequisites",
      introduction: (
        <span>
          <p>
            Before proceeding, ensure you have a <BT> AWS Account</BT> and an{" "}
            <BT>Github Organization</BT>. If you don't yet have these, you can
            create them by following the links below.
          </p>
          <ol className="flex flex-col align-middle">
            <li>
              <ExternalLink
                href="https://aws.amazon.com/"
                children="Create a paid AWS Account"
              />
            </li>
            <li>
              <ExternalLink
                href="https://github.com/organizations/plan"
                children="Create a GitHub Organization"
              />
            </li>
          </ol>
          If you already have these, you can skip this step and continue to{" "}
          <BT>step 1.</BT>
        </span>
      ),
    },
    {
      id: "identity-provider",
      type: "visual",

      title: "Create an OpenID Connect identity provider in IAM",
      introduction: (
        <span>
          <p>
            <ExternalLink
              href="https://openid.net/developers/how-connect-works/"
              children="OpenID Connect"
            />{" "}
            (OIDC) is an authentication protocol built on top of OAuth 2.0,
            allowing applications like GitHub to verify user identities through
            an identity provider . OIDC issues ID tokens (usually JSON Web
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
            requiring static credentials, offering enhanced security and
            seamless integration for CI/CD workflows.
          </p>
        </span>
      ),
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
            message: "hi mom",
          },
        },
        {
          caption: (
            <span>
              After selecting the above <BT>9 policies</BT>, click{" "}
              <BT>Next.</BT>
            </span>
          ),
        },
        {
          caption: <span>Name the role and add a brief description.</span>,
        },
        {
          caption: (
            <span>
              After carefully reviewing the list of permissions, click{" "}
              <BT>Create role</BT>.
            </span>
          ),
        },
      ],
      conclusion: (
        <span>
          With the identity provider created, we can now move on to step 2:{" "}
          <BT>creating a personal access token on GitHub</BT>.
        </span>
      ),
    },
    {
      id: "personal-access-token",
      type: "visual",
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
              Select <BT>Other type of secret</BT> for Secret type and{" "}
              <BT>plaintext</BT> for Key/value pairs.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Paste you personal access token into the editor. Click{" "}
              <BT>Next</BT>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Input <CB>github/pat/harrier</CB> into the Secret name field and
              optionally provide a description of the secret, any tags, and any
              additional resource permissions. Click <BT>Next</BT>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              Leave <BT>Configure automatic rotation</BT> in its default
              position and click <BT>Next</BT>.
            </span>
          ),
        },
        {
          caption: (
            <span>
              After reviewing all relevant configuration details, click{" "}
              <BT>Store</BT>.
            </span>
          ),
        },
      ],
      conclusion: (
        <span>
          With the personal access token safely managed by AWS Secrets Manager,
          we can now move on to step 3: <BT>configuring your runner setup </BT>{" "}
          and generating a <CB>harrier_setup.yaml</CB>.
        </span>
      ),
    },
    {
      id: "create-setup-yaml",
      type: "form",
      title: "Select your runner configuration settings",
      introduction: (
        <p>
          Fill out the configuration details below and click <BT>Generate</BT>{" "}
          to render the <CB>harrier_setup.yaml</CB> file. Executing this
          workflow will deploy a fleet of self-hosted runners into your AWS
          account, enabling you to run your GitHub Actions workflows on your own
          AWS infrastructure and leverage caching. If you have a question about
          a specific configuration setting, simply hover over the respective
          label for details.
        </p>
      ),
    },
    {
      id: "execute-workflow",
      type: "visual",
      title: "Auto-deploy self-hosted runner fleet into AWS account",
      introduction: (
        <span>
          <p>
            With <CB>harrier_setup.yaml</CB> in tow, all that's left to do is
            add the yaml to a GitHub repository and execute the workflow.
          </p>
        </span>
      ),
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

  return (
    <SetupStepsContext.Provider value={{ steps, activeStep, setActiveStep }}>
      {children}
    </SetupStepsContext.Provider>
  );
};

export { SetupStepsProvider, SetupStepsContext };
