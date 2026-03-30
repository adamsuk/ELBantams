.PHONY: help worker ui dev preview install install-ui

# Config
D1_BINDING ?= DB
UI_DIR ?= website
UI_PORT ?= 5173
WORKER_PORT ?= 8788
PERSIST_DIR ?= .wrangler/state
API_TARGET ?= https://elbantams.pages.dev

help:
	@echo "Targets:"
	@echo "  make worker      Run local Cloudflare Pages/Worker (D1 + UI proxy)"
	@echo "  make ui          Run the Vite UI dev server (direct)"
	@echo "  make dev         Run everything (open Wrangler URL)"
	@echo "  make preview     Preview built Pages output (website/dist)"
	@echo "  make install     Install deps (root + UI)"
	@echo "  make install-ui  Install UI deps only"
	@echo ""
	@echo "Vars:"
	@echo "  D1_BINDING=DB    D1 binding name (default: DB)"
	@echo "  UI_DIR=website   UI directory (default: website)"
	@echo "  UI_PORT=5173     Vite dev server port"
	@echo "  WORKER_PORT=8788 Wrangler dev port"
	@echo "  PERSIST_DIR=.wrangler/state  Local state dir"

install:
	@npm install
	@$(MAKE) install-ui

install-ui:
	@cd "$(UI_DIR)" && npm install

worker:
	@mkdir -p "$(PERSIST_DIR)"
	@npx wrangler pages dev \
		--port "$(WORKER_PORT)" \
		--persist-to "$(PERSIST_DIR)"

ui:
	@cd "$(UI_DIR)" && npm run dev -- --port "$(UI_PORT)"

ui-remote:
	@cd "$(UI_DIR)" && API_TARGET="$(API_TARGET)" npm run dev -- --port "$(UI_PORT)"

# Runs both; access app at localhost:5173. Ctrl+C stops both.
dev:
	@$(MAKE) worker &
	@echo "Waiting for worker on port $(WORKER_PORT)..."; \
	until nc -z localhost $(WORKER_PORT) 2>/dev/null; do sleep 0.5; done; \
	echo "Worker ready — starting UI"; \
	$(MAKE) ui

preview:
	@npx wrangler pages dev "$(UI_DIR)/dist"
