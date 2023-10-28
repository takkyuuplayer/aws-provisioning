import { Stack, StackProps, aws_s3 } from "aws-cdk-lib";
import { Construct } from "constructs";

export class TerraformStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new aws_s3.Bucket(this, "TerraformBucket", {
      bucketName: "tp-tfstate",
      blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL,
    });
  }
}
