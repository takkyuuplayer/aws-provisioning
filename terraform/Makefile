test:
	terraform fmt -recursive -check
	find . -type f -name '*.tf' | xargs -I% dirname % | sort -u | xargs -I% terraform validate %
	find . -type f -name '*.tf' | xargs -I% dirname % | sort -u | xargs -I% tflint %
