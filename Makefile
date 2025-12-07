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

## next/dev: Start next dev
.PHONY: next/dev
next/dev:
	$(DOCKER_COMPOSE_LOCAL) pnpm run dev
