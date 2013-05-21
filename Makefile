
build: components index.js
	@component build --dev

%.html: %.jade
	jade $<

components: component.json
	@component install --dev

test: build example/example.html

clean:
	rm -fr build components

.PHONY: clean
