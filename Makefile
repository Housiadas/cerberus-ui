# ===================
# VARIABLES
# ===================
UID	:= $(shell id -u)
GID	:= $(shell id -g)

.PHONY: help
help:
	@echo Usage:
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' | sed -e 's/^/ /'

## ==================
## Developement
## ==================

## dev: Run development mode
.PHONY: dev
dev:
	pnpm run dev

## update: Update dependencies
.PHONY: update
update:
	pnpm update

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
