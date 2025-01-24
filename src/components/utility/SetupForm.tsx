import { useState } from "react";
import { Copy, ClipboardCheck } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
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
  { label: "m7a.large", value: "m7a.large" },
  { label: "m7i.large", value: "m7i.large" },
  { label: "r7a.medium", value: "r7a.medium" },
  { label: "m6a.large", value: "m6a.large" },
  { label: "m6i.large", value: "m6i.large" },
  { label: "m5a.large", value: "m5a.large" },
  { label: "r6a.large", value: "r6a.large" },
  { label: "r5a.large", value: "r5a.large" },
  { label: "r6i.large", value: "r6i.large" },
  { label: "m7a.medium", value: "m7a.medium" },
  { label: "t2.micro", value: "t2.micro" },
];

export const SetupForm = ({ form, onSubmit, yamlOutput }: SetupFormProps) => {
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
};
