BucketName=tp-tfstate
StackName=tfstate

tfstate_bucket:
	aws cloudformation deploy \
		--stack-name ${StackName} \
		--template-file statebucket.cf.yml \
		--parameter-overrides BucketName=${BucketName}

setup:
	terraform init

test: setup
	terraform fmt -recursive -check
	find . -type f -name '*.tf' | xargs -I% dirname % | sort -u | xargs -I% terraform validate %
	find . -type f -name '*.tf' | xargs -I% dirname % | sort -u | xargs -I% tflint %
