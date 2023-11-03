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
    new iam.Role(this, "Role", {
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
  }
}
