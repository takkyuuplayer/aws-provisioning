DIR=$(dir $(realpath $(firstword $(MAKEFILE_LIST))))
StackName=lambda-static-ip

confirm:
	sam build
	sam deploy --confirm-changeset
deploy:
	sam build
	sam deploy --no-confirm-changeset

output:
	aws cloudformation describe-stacks --stack-name ${StackName} \
		| jq -c '.Stacks[] | .Outputs' \
		| jq

help:
	@cat Makefile

