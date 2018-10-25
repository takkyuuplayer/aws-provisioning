DIR=$(dir $(realpath $(firstword $(MAKEFILE_LIST))))
DomainName=takkyuuplayer.com
ValidationDomain=takkyuuplayer.com
StackName=ssl-$(shell echo ${DomainName} | sed -e 's/\./-/g')

confirm:
	aws cloudformation deploy \
		--region us-east-1 \
		--no-execute-changeset \
		--stack-name ${StackName} \
		--template-file template.cf.yml \
		--parameter-overrides DomainName=${DomainName} ValidationDomain=${ValidationDomain}

deploy:
	@echo "You will get email in https://docs.aws.amazon.com/acm/latest/userguide/setup-email.html"
	aws cloudformation deploy \
		--region us-east-1 \
		--stack-name ${StackName} \
		--template-file template.cf.yml \
		--parameter-overrides DomainName=${DomainName} ValidationDomain=${ValidationDomain}

help:
	@cat Makefile
