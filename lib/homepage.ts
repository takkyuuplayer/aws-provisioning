import { Stack, StackProps, aws_s3 } from "aws-cdk-lib";
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
    const redirect = new aws_s3.Bucket(this, "WwwBucket", {
      bucketName: "www.takkyuuplayer.com",
      versioned: true,
      websiteRedirect: {
        hostName: "takkyuuplayer.com",
        protocol: aws_s3.RedirectProtocol.HTTPS,
      },
    });
  }
}
