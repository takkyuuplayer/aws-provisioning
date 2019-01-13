BucketName=tp-tmp
StackName=s3-${BucketName}

confirm:
	aws cloudformation deploy \
		--no-execute-changeset \
		--stack-name ${StackName} \
		--template-file template.cf.yml \
		--parameter-overrides BucketName=${BucketName}

deploy:
	aws cloudformation deploy \
		--stack-name ${StackName} \
		--template-file template.cf.yml \
		--parameter-overrides BucketName=${BucketName}
	$(MAKE) output

output:
	aws cloudformation describe-stacks --stack-name ${StackName} \
		| jq -c '.Stacks[] | .Outputs' \
		| jq

help:
	@cat Makefile
