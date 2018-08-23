DIR=$(dir $(realpath $(firstword $(MAKEFILE_LIST))))
STACKNAME=redirection
RedirectFrom=r.takkyuuplayer.com
RedirectTo=www.takkyuuplayer.com
HostedZone=takkyuuplayer.com
AcmCertificateArn=$(shell aws --region us-east-1 acm list-certificates | jq '.CertificateSummaryList| .[] | select(.DomainName == "r.takkyuuplayer.com") | .CertificateArn' | sed -e 's/"//g')

production:
	aws cloudformation deploy \
		--no-execute-changeset \
		--stack-name ${STACKNAME} \
		--template-file template.cf.yml \
		--parameter-overrides RedirectTo=${RedirectTo} RedirectFrom=${RedirectFrom} HostedZone=${HostedZone} AcmCertificateArn=${AcmCertificateArn}

production/deploy:
	aws cloudformation deploy \
		--stack-name ${STACKNAME} \
		--template-file template.cf.yml \
		--parameter-overrides RedirectTo=${RedirectTo} RedirectFrom=${RedirectFrom} HostedZone=${HostedZone} AcmCertificateArn=${AcmCertificateArn}
	make production/output

production/output:
	aws cloudformation describe-stacks --stack-name ${STACKNAME} \
		| jq -c '.Stacks[] | .Outputs' \
		| jq
