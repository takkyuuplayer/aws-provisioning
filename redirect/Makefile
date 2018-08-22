DIR=$(dir $(realpath $(firstword $(MAKEFILE_LIST))))
STACKNAME=redirection
RedirectFrom=r.takkyuuplayer.com
RedirectTo=takkyuuplayer.com
HostedZone=takkyuuplayer.com

test:
	aws cloudformation validate-template --template-url file:/${DIR}/template.cf.yml

production:
	aws cloudformation deploy \
		--no-execute-changeset \
		--stack-name ${STACKNAME} \
		--template-file template.cf.yml \
		--parameter-overrides RedirectTo=${RedirectTo} RedirectFrom=${RedirectFrom} HostedZone=${HostedZone}

production/deploy:
	aws cloudformation deploy \
		--stack-name ${STACKNAME} \
		--template-file template.cf.yml \
		--parameter-overrides RedirectTo=${RedirectTo} RedirectFrom=${RedirectFrom} HostedZone=${HostedZone}
	make production/output

production/output:
	aws cloudformation describe-stacks --stack-name ${STACKNAME} \
		| jq -c '.Stacks[] | .Outputs' \
		| jq
