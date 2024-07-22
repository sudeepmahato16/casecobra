import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Progress,
} from "@casecobra/ui";
import { formatPrice } from "@/utils/helper";

const Stats = () => {
  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL = 2500;

  const lastWeekSum = 230;
  const lastMonthSum = 2200;
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Last Week</CardDescription>
          <CardTitle className="text-[28px]">
            {formatPrice(lastWeekSum)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            of {formatPrice(WEEKLY_GOAL)} goal
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={(lastWeekSum * 100) / WEEKLY_GOAL} />
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Last Month</CardDescription>
          <CardTitle className="text-[28px]">
            {formatPrice(lastMonthSum)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            of {formatPrice(MONTHLY_GOAL)} goal
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={(lastMonthSum * 100) / MONTHLY_GOAL} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Stats;
