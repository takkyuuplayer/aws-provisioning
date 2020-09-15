## VPC

To build SINGLE availability zone VPC with

- Public Subnet with EIP Internet Gateway
- Private Subnet with NAT

### How To

```
$ make help
```

### References

- [NAT gateways \- Amazon Virtual Private Cloud](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html)
- [AWS::EC2::VPC \- AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-vpc.html)
- [aws\-cf\-templates/vpc\-2azs\.yaml at 07d45cd · widdix/aws\-cf\-templates](https://github.com/widdix/aws-cf-templates/blob/07d45cd/vpc/vpc-2azs.yaml)