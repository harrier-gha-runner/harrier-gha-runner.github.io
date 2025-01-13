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
    gha: 2.7,
    harrier: 5.2,
  },
  {
    step: "Checkout Code",
    gha: 5.7,
    harrier: 8.2,
  },
  {
    step: "Set Up Build Env",
    gha: 24.8,
    harrier: 36.8,
  },
  {
    step: "Set Up Node",
    gha: 27.2,
    harrier: 42.2,
  },
  {
    step: "Load Cache",
    gha: 27.2,
    harrier: 47.3,
  },
  {
    step: "Install Dependencies",
    gha: 342.7,
    harrier: 209.8,
  },
  {
    step: "Store Cache",
    gha: 342.7,
    harrier: 222.3,
  },
  {
    step: "Set Up Docker Buildx",
    gha: 348.7,
    harrier: 228,
  },
  {
    step: "Login to Docker",
    gha: 349.2,
    harrier: 228.2,
  },
  {
    step: "Build and Push Docker Image",
    gha: 382.8,
    harrier: 251.2,
  },
  {
    step: "Post Build and Push Docker",
    gha: 388.2,
    harrier: 255.3,
  },
  {
    step: "Complete job",
    gha: 391.3,
    harrier: 257,
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

export function VSCodeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-center">
          Large Repo, Seconds to Complete Workflow
        </CardTitle>
        <CardDescription className="flex justify-center">
          950.7 MB, 151 dependencies, open-source
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
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="harrier"
              type="monotone"
              stroke="var(--color-harrier)"
              strokeWidth={2}
              dot={{ fill: "var(--color-harrier)" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-center py-4 text-sm">
          <div className="w-full py-4 text-center font-medium leading-none">
            <p>Harrier: 2 minutes 25 seconds faster than GitHub Actions</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
