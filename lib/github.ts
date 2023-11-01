import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class GithubActionsOidcStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const provider = new iam.OpenIdConnectProvider(this, "Provider", {
      url: "https://token.actions.githubusercontent.com",
      clientIds: ["sts.amazonaws.com"],
    });
    const role = new iam.Role(this, "Role", {
      roleName: "DeployRole",
      maxSessionDuration: Duration.hours(1),
      assumedBy: new iam.WebIdentityPrincipal(
        provider.openIdConnectProviderArn,
        {
          StringEquals: {
            ["token.actions.githubusercontent.com:aud"]: "sts.amazonaws.com",
          },
          StringLike: {
            ["token.actions.githubusercontent.com:sub"]: "repo:takkyuuplayer/*",
          },
        }
      ),
    });

    const policy = new iam.Policy(this, "DeployHomepage", {
      policyName: "DeployHomepage",
      statements: [
        new iam.PolicyStatement({
          actions: ["s3:*"],
          resources: ["arn:aws:s3:::takkyuuplayer.com/*"],
        }),
        new iam.PolicyStatement({
          actions: ["lambda:*"],
          resources: [
            "arn:aws:lambda:ap-northeast-1:694050191556:function:feed-Feed-1O9CX1R4AVR2T",
          ],
        }),
      ],
    });
    role.attachInlinePolicy(policy);
  }
}
