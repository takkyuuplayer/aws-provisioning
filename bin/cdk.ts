import { App } from "aws-cdk-lib";
import "source-map-support/register";
import { GithubActionsOidcStack } from "../lib/github";
import { HomepageStack } from "../lib/homepage";
import { InitPracticeStack } from "../lib/initialPractice";
import { TerraformStack } from "../lib/terraform";

const app = new App();
new InitPracticeStack(app, "SecurityPracticeStack");
new TerraformStack(app, "TerraformStack");
new HomepageStack(app, "HomepageStack");
new GithubActionsOidcStack(app, "GithubActionsOidcStack");
