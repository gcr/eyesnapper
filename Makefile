
%.js : %.ls
	./node_modules/.bin/lsc -c -m embedded $<

all: eyesnapper.js

watch: all
	./node_modules/.bin/lsc -c -m embedded -w *.ls
