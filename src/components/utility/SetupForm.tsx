import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, ClipboardCheck } from "lucide-react";
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

interface SetupFormProps {
  form: any;
  onSubmit: (values: any) => void;
  yamlOutput: string;
}

const INSTANCE_TYPES = [
  { label: "t2.micro", value: "t2.micro" },
  { label: "t2.small", value: "t2.small" },
  { label: "t2.medium", value: "t2.medium" },
  { label: "t2.large", value: "t2.large" },
  { label: "t3.micro", value: "t3.micro" },
  { label: "t3.small", value: "t3.small" },
  { label: "t3.medium", value: "t3.medium" },
  { label: "t3.large", value: "t3.large" },
  { label: "t3.xlarge", value: "t3.xlarge" },
  { label: "t3.2xlarge", value: "t3.2xlarge" },
  { label: "t3a.micro", value: "t3a.micro" },
  { label: "t3a.small", value: "t3a.small" },
  { label: "t3a.medium", value: "t3a.medium" },
  { label: "t3a.large", value: "t3a.large" },
  { label: "t3a.xlarge", value: "t3a.xlarge" },
  { label: "t3a.2xlarge", value: "t3a.2xlarge" },
  { label: "m3.medium", value: "m3.medium" },
  { label: "m3.large", value: "m3.large" },
  { label: "m3.xlarge", value: "m3.xlarge" },
  { label: "m3.2xlarge", value: "m3.2xlarge" },
  { label: "m4.large", value: "m4.large" },
  { label: "m4.xlarge", value: "m4.xlarge" },
  { label: "m4.2xlarge", value: "m4.2xlarge" },
  { label: "m4.4xlarge", value: "m4.4xlarge" },
  { label: "m4.10xlarge", value: "m4.10xlarge" },
  { label: "m4.16xlarge", value: "m4.16xlarge" },
  { label: "m5.large", value: "m5.large" },
  { label: "m5.xlarge", value: "m5.xlarge" },
  { label: "m5.2xlarge", value: "m5.2xlarge" },
  { label: "m5.4xlarge", value: "m5.4xlarge" },
  { label: "m5.12xlarge", value: "m5.12xlarge" },
  { label: "m5.24xlarge", value: "m5.24xlarge" },
  { label: "m5a.large", value: "m5a.large" },
  { label: "m5a.xlarge", value: "m5a.xlarge" },
  { label: "m5a.2xlarge", value: "m5a.2xlarge" },
  { label: "m5a.4xlarge", value: "m5a.4xlarge" },
  { label: "m5a.12xlarge", value: "m5a.12xlarge" },
  { label: "m5a.24xlarge", value: "m5a.24xlarge" },
  { label: "m5n.large", value: "m5n.large" },
  { label: "m5n.xlarge", value: "m5n.xlarge" },
  { label: "m5n.2xlarge", value: "m5n.2xlarge" },
  { label: "m5n.4xlarge", value: "m5n.4xlarge" },
  { label: "m5n.12xlarge", value: "m5n.12xlarge" },
  { label: "m5n.24xlarge", value: "m5n.24xlarge" },
  { label: "m5zn.large", value: "m5zn.large" },
  { label: "m5zn.xlarge", value: "m5zn.xlarge" },
  { label: "m5zn.2xlarge", value: "m5zn.2xlarge" },
  { label: "m5zn.3xlarge", value: "m5zn.3xlarge" },
  { label: "m5zn.6xlarge", value: "m5zn.6xlarge" },
  { label: "m5zn.12xlarge", value: "m5zn.12xlarge" },
  { label: "c4.large", value: "c4.large" },
  { label: "c4.xlarge", value: "c4.xlarge" },
  { label: "c4.2xlarge", value: "c4.2xlarge" },
  { label: "c4.4xlarge", value: "c4.4xlarge" },
  { label: "c4.8xlarge", value: "c4.8xlarge" },
  { label: "c5.large", value: "c5.large" },
  { label: "c5.xlarge", value: "c5.xlarge" },
  { label: "c5.2xlarge", value: "c5.2xlarge" },
  { label: "c5.4xlarge", value: "c5.4xlarge" },
  { label: "c5.9xlarge", value: "c5.9xlarge" },
  { label: "c5.18xlarge", value: "c5.18xlarge" },
  { label: "c5n.large", value: "c5n.large" },
  { label: "c5n.xlarge", value: "c5n.xlarge" },
  { label: "c5n.2xlarge", value: "c5n.2xlarge" },
  { label: "c5n.4xlarge", value: "c5n.4xlarge" },
];

export default function SetupForm({
  form,
  onSubmit,
  yamlOutput,
}: SetupFormProps) {
  const [copied, setCopied] = useState(false);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(yamlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <div className="mt-8 flex flex-wrap justify-center">
            <FormField
              control={form.control}
              name="awsAccountId"
              render={({ field }) => (
                <FormItem className="h-32 w-52 p-4">
                  <FormLabel className="text-left">AWS Account ID</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} className="w-full border" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="awsRegion"
              render={({ field }) => (
                <FormItem className="h-32 w-52 p-4">
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
                    <PopoverContent className="w-full bg-harrierWHITE p-0">
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
                                  className={`ml-auto ${field.value === region ? "opacity-100" : "opacity-0"} text-harrierPINK`}
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

            <FormField
              control={form.control}
              name="instanceType"
              render={({ field }) => (
                <FormItem className="h-32 w-52 p-4">
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
                    <PopoverContent className="w-full bg-harrierWHITE p-0">
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
                                  className={`ml-auto ${field.value === type.value ? "opacity-100" : "opacity-0"} text-harrierPINK`}
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

            <FormField
              control={form.control}
              name="cacheTtlHours"
              render={({ field }) => (
                <FormItem className="h-32 w-52 p-4">
                  <FormLabel className="text-left">Cache TTL (hrs)</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} className="w-full border" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="mr-2 flex justify-center">
            <Button
              type="submit"
              className="inline-flex items-center p-6 text-white"
              variant="secondary"
            >
              Generate
            </Button>
          </div>
        </form>
      </Form>

      {yamlOutput && (
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full max-w-7xl">
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="absolute right-0 top-20 mr-2 text-harrierGRAY"
            >
              {copied ? <ClipboardCheck /> : <Copy />}
            </Button>
            <h3 className="text-xl font-semibold">Copy this workflow YAML:</h3>
            <SyntaxHighlighter
              language="yaml"
              style={dracula}
              showLineNumbers={true}
              wrapLongLines={true}
              className="rounded-lg p-4"
              lineNumberStyle={{ color: "#888", fontSize: "12px" }}
              useInlineStyles={true}
            >
              {yamlOutput}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </>
  );
}
