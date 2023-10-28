import { App } from "aws-cdk-lib";
import "source-map-support/register";
import { HomepageStack } from "../lib/homepage";
import { InitPracticeStack } from "../lib/initialPractice";

const app = new App();
new InitPracticeStack(app, "SecurityPracticeStack");
new HomepageStack(app, "HomepageStack");
