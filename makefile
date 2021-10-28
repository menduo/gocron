GO111MODULE=on

.PHONY: build
build: gocron node

.PHONY: build-race
build-race: enable-race build

.PHONY: run
run: build kill
	./bin/gocron-node &
	./bin/gocron web -e dev

.PHONY: run-race
run-race: enable-race run

.PHONY: kill
kill:
	-killall gocron-node

.PHONY: gocron
gocron:
	go build $(RACE) -o bin/gocron ./cmd/gocron

.PHONY: node
node:
	go build $(RACE) -o bin/gocron-node ./cmd/node

.PHONY: test
test:
	go test $(RACE) ./...

.PHONY: test-race
test-race: enable-race test

.PHONY: enable-race
enable-race:
	$(eval RACE = -race)

.PHONY: package
package: build-vue statik
	bash ./package.sh

.PHONY: package-all
package-all: build-vue statik
	bash ./package.sh -p 'linux darwin windows'

.PHONY: package-linux
package-linux: build-vue statik
	bash ./package.sh -p 'linux'

.PHONY: package-windows
package-windows: build-vue statik
	bash ./package.sh -p 'windows'

.PHONY: package-mac
package-mac: build-vue statik
	bash ./package.sh -p 'darwin'

.PHONY: build-vue
build-vue:
	/bin/rm -rf web/vue/dist/static/
	@echo start build-vue-all
	cd web/vue && yarn run build
	@echo start build-vue-copy
	cp -r web/vue/dist/* web/public/
	@echo end build-vue

.PHONY: install-vue
install-vue:
	cd web/vue && yarn install

.PHONY: run-vue
run-vue:
	cd web/vue && yarn run dev

.PHONY: statik
statik:
	@echo start build statik
	#go get github.com/rakyll/statik
	go generate ./...
	@echo after build statik

.PHONY: lint
	golangci-lint run

.PHONY: clean
clean:
	/bin/rm bin/gocron
	/bin/rm bin/gocron-node
