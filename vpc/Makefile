DIR=$(dir $(realpath $(firstword $(MAKEFILE_LIST))))
StackName=tp-vpc

confirm:
	aws cloudformation deploy \
		--no-execute-changeset \
		--stack-name ${StackName} \
		--template-file template.cf.yml \

deploy:
	aws cloudformation deploy \
		--stack-name ${StackName} \
		--template-file template.cf.yml
	make output

output:
	aws cloudformation describe-stacks --stack-name ${StackName} \
		| jq -c '.Stacks[] | .Outputs' \
		| jq

help:
	@cat Makefile
