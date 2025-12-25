# ===================
# VARIABLES
# ===================
UID	:= $(shell id -u)
GID	:= $(shell id -g)

DOCKER_COMPOSE_LOCAL := docker compose -f ./compose.yml
INPUT	?= $(shell bash -c 'read -p "Insert name: " name; echo $$name')

.PHONY: help
help:
	@echo Usage:
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' | sed -e 's/^/ /'

## ==================
## Docker
## ==================

## docker/up: Start all the containers for the application
.PHONY: docker/up
docker/up:
	make docker/down
	$(DOCKER_COMPOSE_LOCAL) up -d

## docker/down: stop and remove all containers
.PHONY: docker/down
docker/down:
	$(DOCKER_COMPOSE_LOCAL) down --remove-orphans

## docker/clean: docker clean all
.PHONY: docker/clean
docker/clean:
	docker system prune -f  && \
    docker image prune -f && \
    docker volume prune -f

## ==================
## Developement
## ==================

## dev: Run developement mode
.PHONY: dev
dev:
	pnpm run dev

## ==================
## Quality Control
## ==================

## format: Format files with biome
.PHONY: fromat
format:
	pnpm run format

## lint: Lint files with biome
.PHONY: lint
lint:
	pnpm run lint

## check: Check files with biome
.PHONY: check
check:
	pnpm run check

## check/fix: Format, lint, and organize imports of all files
.PHONY: check/fix
check/fix:
	pnpm run check:fix

## check/fix/unsafe: Fix files with biome pass unsafe flag
.PHONY: check/fix/unsafe
check/fix/unsafe:
	pnpm run check:fix:unsafe

