DIR=$(dir $(realpath $(firstword $(MAKEFILE_LIST))))
TEMPLATES := $(wildcard */*.cf.yml)

test: $(TEMPLATES)
$(TEMPLATES):
	aws cloudformation validate-template --template-body file://$(DIR)/$@

.PHONY: all $(TEMPLATES)
