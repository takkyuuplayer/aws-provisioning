DIR=$(dir $(realpath $(firstword $(MAKEFILE_LIST))))
DomainName=takkyuuplayer.com
ValidationDomain=takkyuuplayer.com
HostedZoneId=$(shell aws route53 list-hosted-zones-by-name --dns-name ${ValidationDomain} | jq -r '.HostedZones[0].Id' | sed -e 's|/hostedzone/||g')
StackName=ssl-$(shell echo ${DomainName} | sed -e 's/\./-/g')

# To use an ACM certificate with Amazon CloudFront, you must request or import the certificate in the US East (N. Virginia) region.
# https://docs.aws.amazon.com/acm/latest/userguide/acm-regions.html

confirm:
	aws cloudformation deploy \
		--region us-east-1 \
		--no-execute-changeset \
		--stack-name ${StackName} \
		--template-file template.cf.yml \
		--parameter-overrides DomainName=${DomainName} ValidationDomain=${ValidationDomain} HostedZoneId=${HostedZoneId}

deploy:
	@echo "When HostedZoneId = null, you will get email in https://docs.aws.amazon.com/acm/latest/userguide/setup-email.html"
	aws cloudformation deploy \
		--region us-east-1 \
		--stack-name ${StackName} \
		--template-file template.cf.yml \
		--parameter-overrides DomainName=${DomainName} ValidationDomain=${ValidationDomain} HostedZoneId=${HostedZoneId}

help:
	@cat Makefile
