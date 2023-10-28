import { App } from "aws-cdk-lib";
import "source-map-support/register";
import { InitPracticeStack } from "../lib/initialPractice";

const app = new App();
new InitPracticeStack(app, "SecurityPracticeStack");
