BIN_DIR=node_modules/.bin

start-deps:
	docker compose up -d
	sleep 1
	yarn run db:migrate


clean-deps:
	docker compose down

reset-deps: clean-deps start-deps

start-dev: reset-deps
	yarn run dev

check-code:
	yarn lint
	yarn build