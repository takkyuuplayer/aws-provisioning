import { Stack, StackProps, aws_s3 } from "aws-cdk-lib";
import { Policy, PolicyStatement, Role } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class HomepageStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const homepage = new aws_s3.Bucket(this, "Bucket", {
      bucketName: "takkyuuplayer.com",
      objectOwnership: aws_s3.ObjectOwnership.BUCKET_OWNER_PREFERRED,
      versioned: true,
      websiteErrorDocument: "error.html",
      websiteIndexDocument: "index.html",
    });
    new aws_s3.Bucket(this, "WwwBucket", {
      bucketName: "www.takkyuuplayer.com",
      versioned: true,
      websiteRedirect: {
        hostName: "takkyuuplayer.com",
        protocol: aws_s3.RedirectProtocol.HTTPS,
      },
    });

    const role = Role.fromRoleName(this, "DeployRole", "DeployRole");
    role.attachInlinePolicy(
      new Policy(this, "DeployPolicy", {
        statements: [
          new PolicyStatement({
            actions: ["s3:ListBucket", "s3:PutObject"],
            resources: [homepage.bucketArn, `${homepage.bucketArn}/*`],
          }),
        ],
      })
    );
  }
}
