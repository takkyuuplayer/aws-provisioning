BucketName=tp-tfstate
StackName=tfstate

setup:
	terraform init
	aws cloudformation deploy \
		--stack-name ${StackName} \
		--template-file statebucket.cf.yml \
		--parameter-overrides BucketName=${BucketName}

test:
	terraform fmt -recursive -check
	find . -type f -name '*.tf' | xargs -I% dirname % | sort -u | xargs -I% terraform validate %
	find . -type f -name '*.tf' | xargs -I% dirname % | sort -u | xargs -I% tflint %
