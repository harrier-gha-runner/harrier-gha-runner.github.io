import { z } from "zod";

export const formSchema = z.object({
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
