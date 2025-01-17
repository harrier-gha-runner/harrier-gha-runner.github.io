import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ghcolors } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, ClipboardCheck } from "lucide-react";
import yaml from "js-yaml";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";

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
  cacheTtlHours: z.string().min(1, { message: "Cache TTL Hours is required." }),
  cidrBlockVpc: z.string().min(1, { message: "CIDR Block VPC is required." }),
  cidrBlockSubnet: z
    .string()
    .min(1, { message: "CIDR Block Subnet is required." }),
});

const INSTANCE_TYPES = [
  { value: "t2.micro", label: "t2.micro" },
  { value: "t2.small", label: "t2.small" },
  { value: "t2.medium", label: "t2.medium" },
  { value: "t2.large", label: "t2.large" },
  { value: "t2.xlarge", label: "t2.xlarge" },
  { value: "t2.2xlarge", label: "t2.2xlarge" },
  { value: "t3.micro", label: "t3.micro" },
  { value: "t3.small", label: "t3.small" },
  { value: "t3.medium", label: "t3.medium" },
  { value: "t3.large", label: "t3.large" },
  { value: "t3.xlarge", label: "t3.xlarge" },
  { value: "t3.2xlarge", label: "t3.2xlarge" },
  { value: "t3a.micro", label: "t3a.micro" },
  { value: "t3a.small", label: "t3a.small" },
  { value: "t3a.medium", label: "t3a.medium" },
  { value: "t3a.large", label: "t3a.large" },
  { value: "t3a.xlarge", label: "t3a.xlarge" },
  { value: "t3a.2xlarge", label: "t3a.2xlarge" },
  { value: "m5.large", label: "m5.large" },
  { value: "m5.xlarge", label: "m5.xlarge" },
  { value: "m5.2xlarge", label: "m5.2xlarge" },
  { value: "m5.4xlarge", label: "m5.4xlarge" },
  { value: "m5.12xlarge", label: "m5.12xlarge" },
  { value: "m5.24xlarge", label: "m5.24xlarge" },
  { value: "m5a.large", label: "m5a.large" },
  { value: "m5a.xlarge", label: "m5a.xlarge" },
  { value: "m5a.2xlarge", label: "m5a.2xlarge" },
  { value: "m5a.4xlarge", label: "m5a.4xlarge" },
  { value: "m5a.12xlarge", label: "m5a.12xlarge" },
  { value: "m5a.24xlarge", label: "m5a.24xlarge" },
  { value: "m5d.large", label: "m5d.large" },
  { value: "m5d.xlarge", label: "m5d.xlarge" },
  { value: "m5d.2xlarge", label: "m5d.2xlarge" },
  { value: "m5d.4xlarge", label: "m5d.4xlarge" },
  { value: "m5d.12xlarge", label: "m5d.12xlarge" },
  { value: "m5d.24xlarge", label: "m5d.24xlarge" },
  { value: "m5ad.large", label: "m5ad.large" },
  { value: "m5ad.xlarge", label: "m5ad.xlarge" },
  { value: "m5ad.2xlarge", label: "m5ad.2xlarge" },
  { value: "m5ad.4xlarge", label: "m5ad.4xlarge" },
  { value: "m5ad.12xlarge", label: "m5ad.12xlarge" },
  { value: "m5ad.24xlarge", label: "m5ad.24xlarge" },
  { value: "c5.large", label: "c5.large" },
  { value: "c5.xlarge", label: "c5.xlarge" },
  { value: "c5.2xlarge", label: "c5.2xlarge" },
  { value: "c5.4xlarge", label: "c5.4xlarge" },
  { value: "c5.9xlarge", label: "c5.9xlarge" },
  { value: "c5.18xlarge", label: "c5.18xlarge" },
  { value: "c5a.large", label: "c5a.large" },
  { value: "c5a.xlarge", label: "c5a.xlarge" },
  { value: "c5a.2xlarge", label: "c5a.2xlarge" },
  { value: "c5a.4xlarge", label: "c5a.4xlarge" },
  { value: "c5a.8xlarge", label: "c5a.8xlarge" },
  { value: "c5a.12xlarge", label: "c5a.12xlarge" },
  { value: "c5a.16xlarge", label: "c5a.16xlarge" },
  { value: "c5a.24xlarge", label: "c5a.24xlarge" },
  { value: "c5d.large", label: "c5d.large" },
  { value: "c5d.xlarge", label: "c5d.xlarge" },
  { value: "c5d.2xlarge", label: "c5d.2xlarge" },
  { value: "c5d.4xlarge", label: "c5d.4xlarge" },
  { value: "c5d.9xlarge", label: "c5d.9xlarge" },
  { value: "c5d.18xlarge", label: "c5d.18xlarge" },
  { value: "c5n.large", label: "c5n.large" },
  { value: "c5n.xlarge", label: "c5n.xlarge" },
  { value: "c5n.2xlarge", label: "c5n.2xlarge" },
  { value: "c5n.4xlarge", label: "c5n.4xlarge" },
  { value: "c5n.9xlarge", label: "c5n.9xlarge" },
  { value: "c5n.18xlarge", label: "c5n.18xlarge" },
  { value: "r5.large", label: "r5.large" },
  { value: "r5.xlarge", label: "r5.xlarge" },
  { value: "r5.2xlarge", label: "r5.2xlarge" },
  { value: "r5.4xlarge", label: "r5.4xlarge" },
  { value: "r5.12xlarge", label: "r5.12xlarge" },
  { value: "r5.24xlarge", label: "r5.24xlarge" },
  { value: "r5a.large", label: "r5a.large" },
  { value: "r5a.xlarge", label: "r5a.xlarge" },
  { value: "r5a.2xlarge", label: "r5a.2xlarge" },
  { value: "r5a.4xlarge", label: "r5a.4xlarge" },
  { value: "r5a.12xlarge", label: "r5a.12xlarge" },
  { value: "r5a.24xlarge", label: "r5a.24xlarge" },
  { value: "r5d.large", label: "r5d.large" },
  { value: "r5d.xlarge", label: "r5d.xlarge" },
  { value: "r5d.2xlarge", label: "r5d.2xlarge" },
  { value: "r5d.4xlarge", label: "r5d.4xlarge" },
  { value: "r5d.12xlarge", label: "r5d.12xlarge" },
  { value: "r5d.24xlarge", label: "r5d.24xlarge" },
  { value: "r5ad.large", label: "r5ad.large" },
  { value: "r5ad.xlarge", label: "r5ad.xlarge" },
  { value: "r5ad.2xlarge", label: "r5ad.2xlarge" },
  { value: "r5ad.4xlarge", label: "r5ad.4xlarge" },
  { value: "r5ad.12xlarge", label: "r5ad.12xlarge" },
  { value: "r5ad.24xlarge", label: "r5ad.24xlarge" },
  { value: "i3.large", label: "i3.large" },
  { value: "i3.xlarge", label: "i3.xlarge" },
  { value: "i3.2xlarge", label: "i3.2xlarge" },
  { value: "i3.4xlarge", label: "i3.4xlarge" },
  { value: "i3.8xlarge", label: "i3.8xlarge" },
  { value: "i3.16xlarge", label: "i3.16xlarge" },
  { value: "i3en.large", label: "i3en.large" },
  { value: "i3en.xlarge", label: "i3en.xlarge" },
  { value: "i3en.2xlarge", label: "i3en.2xlarge" },
  { value: "i3en.3xlarge", label: "i3en.3xlarge" },
  { value: "i3en.6xlarge", label: "i3en.6xlarge" },
  { value: "i3en.12xlarge", label: "i3en.12xlarge" },
  { value: "i3en.24xlarge", label: "i3en.24xlarge" },
];

export default function SetupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      awsAccountId: "",
      awsRegion: "us-east-1",
      instanceType: "",
      cacheTtlHours: "72",
      cidrBlockVpc: "10.0.0.0/24",
      cidrBlockSubnet: "10.0.0.0/24",
    },
  });
  const [copied, setCopied] = useState(false);
  const [formDataJSON, setFormDataJSON] = useState("");
  const [yamlOutput, setYamlOutput] = useState("");

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

    return () => {};
  }, [formDataJSON]);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(yamlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 3_000);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormDataJSON(JSON.stringify(values, null, 2));
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <div className="mt-8 flex flex-row flex-wrap">
            <div className="h-20 min-w-40 flex-grow object-contain">
              <FormField
                control={form.control}
                name="awsAccountId"
                render={({ field }) => (
                  <FormItem className="w-40 min-w-40">
                    <FormLabel className="text-left">AWS Account ID</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} className="w-full border" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="h-20 min-w-40 flex-grow object-contain">
              <FormField
                control={form.control}
                name="awsRegion"
                render={({ field }) => (
                  <FormItem className="w-40 min-w-40">
                    <FormLabel className="text-left">AWS Region</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                          aria-expanded={!!field.value}
                        >
                          {field.value ? field.value : "Select AWS Region..."}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search AWS Regions..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No region found.</CommandEmpty>
                            <CommandGroup>
                              {[
                                "us-east-1",
                                "us-east-2",
                                "us-west-1",
                                "us-west-2",
                              ].map((region) => (
                                <CommandItem
                                  key={region}
                                  value={region}
                                  onSelect={(currentValue) => {
                                    field.onChange(currentValue); // Update the form state
                                  }}
                                >
                                  {region}
                                  <Check
                                    className={`ml-auto ${field.value === region ? "opacity-100" : "opacity-0"}`}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="h-20 min-w-40 flex-grow object-contain">
              <FormField
                control={form.control}
                name="instanceType"
                render={({ field }) => (
                  <FormItem className="w-40 min-w-40">
                    <FormLabel className="text-left">Instance Type</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                          aria-expanded={!!field.value}
                        >
                          {field.value
                            ? INSTANCE_TYPES.find(
                                (type) => type.value === field.value,
                              )?.label
                            : "Select Instance Type..."}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search instance type..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No instance type found.</CommandEmpty>
                            <CommandGroup>
                              {INSTANCE_TYPES.map((type) => (
                                <CommandItem
                                  key={type.value}
                                  value={type.value}
                                  onSelect={(currentValue) => {
                                    field.onChange(currentValue); // Update the form state
                                  }}
                                >
                                  {type.label}
                                  <Check
                                    className={`ml-auto ${field.value === type.value ? "opacity-100" : "opacity-0"}`}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="h-20 min-w-40 flex-grow object-contain">
              <FormField
                control={form.control}
                name="cacheTtlHours"
                render={({ field }) => (
                  <FormItem className="w-40 min-w-40">
                    <FormLabel className="text-left">
                      Cache Time To Live
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} className="w-full border" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button variant="ghost" type="submit">
            Submit
          </Button>
        </form>
      </Form>

      {yamlOutput && (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="relative w-full max-w-7xl">
            <Button
              onClick={copyToClipboard}
              variant="default"
              className="absolute right-0 top-9 mr-3 mt-3"
            >
              {copied ? <ClipboardCheck /> : <Copy />}
            </Button>
            <h3 className="text-xl font-semibold">Setup Harrier YAML:</h3>
            <SyntaxHighlighter
              language="yaml"
              style={ghcolors}
              showLineNumbers={true}
              wrapLongLines={true}
              className="rounded-lg p-4"
            >
              {yamlOutput}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </>
  );
}
