import { Stack, StackProps, aws_cloudfront, aws_s3 } from "aws-cdk-lib";
import { OriginProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { Construct } from "constructs";

export class HomepageStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const homepage = new aws_s3.Bucket(this, "Bucket", {
      bucketName: "takkyuuplayer.com",
      accessControl: aws_s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      versioned: true,
      websiteErrorDocument: "error.html",
      websiteIndexDocument: "index.html",
    });
    new aws_cloudfront.CloudFrontWebDistribution(this, "Homepage", {
      originConfigs: [
        {
          customOriginSource: {
            originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
            domainName: homepage.bucketWebsiteDomainName,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
      comment: homepage.bucketName,
    });

    const redirect = new aws_s3.Bucket(this, "WwwBucket", {
      bucketName: "www.takkyuuplayer.com",
      versioned: true,
      websiteRedirect: {
        hostName: "takkyuuplayer.com",
        protocol: aws_s3.RedirectProtocol.HTTPS,
      },
    });
    new aws_cloudfront.CloudFrontWebDistribution(this, "WwwHomepage", {
      originConfigs: [
        {
          customOriginSource: {
            originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
            domainName: redirect.bucketWebsiteDomainName,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
      comment: redirect.bucketName,
    });
  }
}
