#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { InitPracticeStack } from "../lib/initialPractice";

const app = new cdk.App();
new InitPracticeStack(app, "SecurityPracticeStack");
