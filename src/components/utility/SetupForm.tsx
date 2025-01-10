import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  awsRegion: z.enum(["us-east-1", "us-east-2", "eu-west-1", "us-west-2"], {
    errorMap: () => ({
      message:
        "AWS Region must be one of the following: us-east-1, us-east-2, eu-west-1, us-west-2",
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

type SetupFormProps = {
  setFormDataJSON: (input: string) => void;
};

export default function SetupForm({ setFormDataJSON }: SetupFormProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      awsRegion: "us-east-1",
      awsAccountId: "536697269866",
      instanceType: "t2.micro",
      cacheTtlHours: "72",
      cidrBlockVpc: "10.0.0.0/24",
      cidrBlockSubnet: "10.0.0.0/24",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setFormDataJSON(JSON.stringify(values, null, 2));
    }
  }

  const steps = [
    { name: "awsRegion", label: "AWS Region", placeholder: "us-east-1" },
    {
      name: "awsAccountId",
      label: "AWS Account ID",
      placeholder: "536697269866",
    },
    { name: "instanceType", label: "Instance Type", placeholder: "t2.micro" },
    { name: "cacheTtlHours", label: "Cache TTL Hours", placeholder: "72" },
    {
      name: "cidrBlockVpc",
      label: "CIDR Block VPC",
      placeholder: "10.0.0.0/16",
    },
    {
      name: "cidrBlockSubnet",
      label: "CIDR Block Subnet",
      placeholder: "10.0.0.0/24",
    },
  ];

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4"
        >
          {steps.map((step, index) => (
            <FormField
              key={step.name}
              control={form.control}
              name={step.name as keyof z.infer<typeof formSchema>}
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel className="text-center">{step.label}</FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormMessage className="mr-2" />
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={step.placeholder}
                        {...field}
                        className="w-36 border"
                      />
                    </FormControl>
                    {currentStep > 0 && currentStep - 1 === index && (
                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        onClick={() => setCurrentStep(currentStep - 1)}
                      >
                        <ArrowLeft />
                      </Button>
                    )}
                    {currentStep === index && (
                      <Button type="submit" variant="default">
                        {currentStep < steps.length - 1 ? "Next" : "Submit"}
                      </Button>
                    )}
                  </div>
                </FormItem>
              )}
            />
          ))}
        </form>
      </Form>
    </div>
  );
}
