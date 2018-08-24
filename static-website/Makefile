DIR=$(dir $(realpath $(firstword $(MAKEFILE_LIST))))
DomainName=v4.takkyuuplayer.com
HostedZone=takkyuuplayer.com
StackName=website-$(shell echo "${DomainName}" | sed -e 's/\./-/g')
AcmCertificateArn=$(shell aws --region us-east-1 acm list-certificates | jq '.CertificateSummaryList| .[] | select(.DomainName == "${DomainName}") | .CertificateArn' | sed -e 's/"//g')

confirm:
	aws cloudformation deploy \
		--no-execute-changeset \
		--stack-name ${StackName} \
		--template-file template.cf.yml \
		--parameter-overrides DomainName=${DomainName} HostedZone=${HostedZone} AcmCertificateArn=${AcmCertificateArn}

deploy:
	aws cloudformation deploy \
		--stack-name ${StackName} \
		--template-file template.cf.yml \
		--parameter-overrides DomainName=${DomainName} HostedZone=${HostedZone} AcmCertificateArn=${AcmCertificateArn}
	make output

output:
	aws cloudformation describe-stacks --stack-name ${StackName} \
		| jq -c '.Stacks[] | .Outputs' \
		| jq

help:
	@cat Makefile
