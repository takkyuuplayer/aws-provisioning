#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MultistackStack } from '../lib/multistack-stack';

const app = new cdk.App();
new MultistackStack(app, 'MultistackStack');
