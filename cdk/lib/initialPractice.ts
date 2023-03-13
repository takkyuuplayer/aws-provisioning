import { App, Stack, StackProps } from "aws-cdk-lib";
import { CfnBudget } from "aws-cdk-lib/aws-budgets";
import { Trail } from "aws-cdk-lib/aws-cloudtrail";
import { CfnHub } from "aws-cdk-lib/aws-securityhub";
import { Construct } from "constructs";

// https://dev.classmethod.jp/articles/aws-1st-step-new-era-reiwa/
export class InitPracticeStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    SecurityPractice(this);
    CostPractice(this);
  }
}

function SecurityPractice(scope: Construct) {
  new Trail(scope, "CloudTrail");
  // new CfnDetector(scope, "GuardDuty", {});
  new CfnHub(scope, "SecurityHub");
}

function CostPractice(scope: Construct) {
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
