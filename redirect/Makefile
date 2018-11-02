DIR=$(dir $(realpath $(firstword $(MAKEFILE_LIST))))
RedirectFrom=www.takkyuuplayer.com
RedirectTo=takkyuuplayer.com
HostedZone=takkyuuplayer.com
StackName=website-$(shell echo "${RedirectFrom}" | sed -e 's/\./-/g')
AcmCertificateArn=$(shell aws --region us-east-1 acm list-certificates | jq '.CertificateSummaryList| .[] | select(.DomainName == "${RedirectFrom}") | .CertificateArn' | sed -e 's/"//g')
Distribution=$(shell aws cloudfront list-distributions | jq '.DistributionList.Items[] | select(.Aliases.Items[] == "${RedirectFrom}")')

confirm:
	aws cloudformation deploy \
		--no-execute-changeset \
		--stack-name ${StackName} \
		--template-file template.cf.yml \
		--parameter-overrides RedirectTo=${RedirectTo} RedirectFrom=${RedirectFrom} HostedZone=${HostedZone} AcmCertificateArn=${AcmCertificateArn}

deploy:
	aws cloudformation deploy \
		--stack-name ${StackName} \
		--template-file template.cf.yml \
		--parameter-overrides RedirectTo=${RedirectTo} RedirectFrom=${RedirectFrom} HostedZone=${HostedZone} AcmCertificateArn=${AcmCertificateArn}
	make output

clear_cache:
	aws cloudfront create-invalidation --distribution-id $(shell echo '${Distribution}' | jq .Id) --paths '/*'

output:
	aws cloudformation describe-stacks --stack-name ${StackName} \
		| jq -c '.Stacks[] | .Outputs' \
		| jq

help:
	@cat Makefile
