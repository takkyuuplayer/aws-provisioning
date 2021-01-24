import { CfnBudget } from "@aws-cdk/aws-budgets";
import { Trail } from "@aws-cdk/aws-cloudtrail";
import { CfnDetector } from "@aws-cdk/aws-guardduty";
import "@aws-cdk/aws-securityhub";
import { CfnHub } from "@aws-cdk/aws-securityhub";
import * as cdk from "@aws-cdk/core";

// https://dev.classmethod.jp/articles/aws-1st-step-new-era-reiwa/
export class InitPracticeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    SecurityPractice(this);
    CostPractice(this);
  }
}

function SecurityPractice(scope: cdk.Construct) {
  new Trail(scope, "CloudTrail");
  new CfnDetector(scope, "GuardDuty", { enable: true });
  new CfnHub(scope, "SecurityHub");
}

function CostPractice(scope: cdk.Construct) {
  const budget: CfnBudget.BudgetDataProperty = {
    budgetType: "COST",
    timeUnit: "MONTHLY",
    budgetLimit: {
      amount: 20,
      unit: "USD",
    },
  };
  new CfnBudget(scope, "Budget", {
    budget,
  });
}
