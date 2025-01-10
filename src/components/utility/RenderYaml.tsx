import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Copy, ClipboardCheck } from "lucide-react";

import yaml from "js-yaml";

export default function RenderYaml({ formDataJSON }: { formDataJSON: string }) {
  const [copied, setCopied] = useState(false);
  const [yamlOutput, setYamlOutput] = useState("");

  useEffect(() => {
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
                    "node-version": "20",
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
                  uses: "2408-capstone-team5/harrier-runner-public@main",
                  with: {
                    "gh-owner-name": "${{ github.repository_owner }}",
                    "aws-region": awsRegion,
                    "aws-account-id": awsAccountId,
                    "instance-type": instanceType,
                    "cache-ttl-hours": cacheTtlHours,
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

    return () => {};
  }, [formDataJSON]);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(yamlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 3_000);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="relative mt-6 w-full max-w-4xl">
        <Button
          onClick={copyToClipboard}
          variant="default"
          className="absolute right-0 top-9 mr-3 mt-3"
        >
          {copied ? <ClipboardCheck /> : <Copy />}
        </Button>
        <h3 className="text-xl font-semibold">Generated YAML:</h3>
        {/* <SyntaxHighlighter
          language="yaml"
          style={dracula}
          showLineNumbers={true}
          wrapLongLines={true}
          className="rounded-lg p-4"
        >
          {yamlOutput}
        </SyntaxHighlighter> */}
      </div>
    </div>
  );
}
