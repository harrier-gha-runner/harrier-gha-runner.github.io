"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  {
    step: "Set Up Job",
    gha: 2.5,
    harrier: 5.8,
  },
  {
    step: "Checkout Code",
    gha: 3.5,
    harrier: 7,
  },
  {
    step: "Set Up Node",
    gha: 4.7,
    harrier: 11.5,
  },
  {
    step: "Load Cache",
    gha: 4.7,
    harrier: 13.7,
  },
  {
    step: "Install Dependencies",
    gha: 21.3,
    harrier: 19.8,
  },
  {
    step: "Store Cache",
    gha: 21.3,
    harrier: 23.8,
  },
  {
    step: "Login to Docker",
    gha: 23.3,
    harrier: 24.0,
  },
  {
    step: "Set Up Docker Buildx",
    gha: 29,
    harrier: 34.2,
  },
  {
    step: "Build and Push Docker Image",
    gha: 29,
    harrier: 34.2,
  },
  {
    step: "Post Build and Push Docker",
    gha: 59,
    harrier: 55.2,
  },
  {
    step: "Complete Job",
    gha: 60.3,
    harrier: 56,
  },
];

const chartConfig = {
  gha: {
    label: "GitHub Actions",
    color: "hsl(var(--chart-1))",
  },
  harrier: {
    label: "Harrier",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function AxiosChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-center">
          Small Repo, Time to Complete Workflow
        </CardTitle>
        <CardDescription className="flex justify-center">
          17.3 MB, 59 dependencies, open-source
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="step"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />

            <Line
              dataKey="gha"
              type="monotone"
              stroke="var(--color-gha)"
              strokeWidth={2}
              dot={{ fill: "var(--color-gha)" }}
              activeDot={{ r: 2 }}
            />
            <Line
              dataKey="harrier"
              type="monotone"
              stroke="var(--color-harrier)"
              strokeWidth={3}
              dot={{ fill: "var(--color-harrier)" }}
              activeDot={{ r: 2 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-center text-sm">
          <div className="w-full py-4 text-center font-medium leading-none">
            <p>Harrier: 5 seconds faster than GitHub Actions</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
