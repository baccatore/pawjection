# Copilot Instructions for Pawjection

## Repository Summary

Pawjection is a **Cloudflare Workers web application** that serves as a DevSecOps practice sandbox. It's a personality quiz that matches users to dog breeds based on their answers to personality questions. The app is built using **TypeScript** and deployed on **Cloudflare's edge network** as a serverless worker.

## High-Level Repository Information

- **Type**: Cloudflare Workers web application (serverless edge computing)
- **Languages**: TypeScript, HTML, CSS, JavaScript
- **Runtime**: Cloudflare Workers runtime (V8 isolates)
- **Framework**: Native Web APIs (no framework dependencies)
- **Size**: Small (~20 files, minimal dependencies)
- **Target Platform**: Cloudflare Workers edge network
- **Development Tools**: Wrangler (Cloudflare's CLI), Vitest (testing)

## Build and Validation Commands

### Prerequisites
- **Node.js**: v16 or higher (project uses modern ES2021+ features)
- **npm**: For package management
- **Cloudflare account**: For deployment (free tier works)

### Essential Command Sequence

**ALWAYS run these commands in this exact order:**

1. **Install Dependencies** (required before any other commands):
   ```bash
   npm install
   ```
   - Takes ~20 seconds
   - Must be run first in any fresh environment
   - Creates node_modules with Cloudflare Workers runtime and dev tools

2. **Generate TypeScript Types** (required after install or config changes):
   ```bash
   npm run cf-typegen
   ```
   - Takes 2-3 seconds
   - Generates worker-configuration.d.ts with Cloudflare Workers runtime types
   - **CRITICAL**: Run this after any changes to wrangler.jsonc
   - Prevents TypeScript compilation errors

3. **Development Server** (for local testing):
   ```bash
   npm run dev
   ```
   - Starts local server at http://localhost:8787
   - Hot reloads on file changes
   - **Expected Warnings**: 
     - "Unable to fetch Request.cf object" (network isolation, safe to ignore)
     - Compatibility date warning (non-breaking, cosmetic)
   - Use Ctrl+C to stop

4. **Testing** (currently has known issues):
   ```bash
   npm run test
   ```
   - **Status**: FAILING (documented issue)
   - **Root Cause**: Tests expect API endpoints (/message, /random) but worker only serves static assets
   - **Error**: "Cannot read properties of undefined (reading 'fetch')" due to ASSETS binding issue
   - **Workaround**: Tests need to be updated to match actual worker functionality
   - Takes ~2 seconds when failing

5. **Deployment** (requires Cloudflare authentication):
   ```bash
   npm run deploy
   ```
   - **First time only**: `npx wrangler login` (opens browser for auth)
   - Deploys to Cloudflare Workers edge network
   - Takes ~10-15 seconds

### Build Issues and Workarounds

**Critical Issue - Test Failures:**
- Tests are outdated and expect API endpoints that don't exist
- The worker currently only serves static files via ASSETS binding
- Tests fail with "env.ASSETS.fetch is undefined"
- **Fix**: Update tests to match actual worker behavior or implement missing endpoints

**Compatibility Warning:**
- Wrangler shows compatibility date warning (non-breaking)
- Update wrangler to 4.28.1+ to resolve: `npm install wrangler@latest`

**Network Warnings in Dev:**
- "Unable to fetch Request.cf object" warnings are normal in local development
- These occur due to network isolation and don't affect functionality

## Project Layout and Architecture

### Root Directory Structure
```
/
├── .github/                 # GitHub workflows and configurations
│   └── workflows/claude.yml # Claude AI assistant integration
├── .claude/                 # Claude Code agent configurations
│   ├── agents/             # Custom agent definitions
│   └── records/            # Agent interaction records
├── public/                  # Static web assets (served by worker)
│   ├── index.html          # Main quiz interface
│   ├── app.js              # Frontend JavaScript logic
│   └── styles.css          # UI styling
├── src/                    # Worker source code
│   └── index.ts            # Main worker entry point
├── test/                   # Test files
│   ├── index.spec.ts       # Main test suite (currently failing)
│   ├── env.d.ts           # Test environment types
│   └── tsconfig.json      # Test-specific TypeScript config
├── wrangler.jsonc          # Cloudflare Workers configuration
├── vitest.config.mts       # Test framework configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── worker-configuration.d.ts # Generated Cloudflare types
```

### Worker Architecture
**Entry Point**: `src/index.ts`
- **Current Function**: Serves static files from `/public` directory
- **Expected Function**: Should handle quiz API endpoints (not yet implemented)
- **Key Code**: `return env.ASSETS.fetch(request);` - proxies to static assets

**Assets Configuration**: 
- Configured in `wrangler.jsonc` with `assets.directory: "./public"`
- Creates ASSETS binding for serving static files
- All frontend files served directly by worker

### Configuration Files

**Cloudflare Workers Config** (`wrangler.jsonc`):
- Worker name: "pawjection"
- Main entry: "src/index.ts"
- Compatibility date: "2025-08-03"
- Assets directory: "./public"
- **Note**: Some binding configurations are commented out

**TypeScript Config** (`tsconfig.json`):
- Target: ES2021 (modern worker runtime)
- Module: ES2022 with bundler resolution
- Strict mode enabled
- Excludes test directory from main compilation

**Test Config** (`vitest.config.mts`):
- Uses Cloudflare Workers pool: `@cloudflare/vitest-pool-workers`
- Configured to run tests in worker environment
- Points to wrangler.jsonc for worker configuration

**Code Style** (`.prettierrc`, `.editorconfig`):
- Tab indentation (consistent with project)
- 140 character line length
- Single quotes, semicolons
- LF line endings

### GitHub Actions and CI/CD

**Claude AI Integration** (`.github/workflows/claude.yml`):
- Triggers on @claude mentions in issues/PRs
- Has write permissions for pull requests and issues
- Uses Anthropic API for AI assistance
- Timeout: 60 minutes

**No Other CI/CD**: Project lacks traditional CI/CD pipelines
- **Opportunity**: Add GitHub Actions for testing and deployment
- **Current State**: Manual testing and deployment only

### Dependencies and Runtime

**Core Dependencies** (devDependencies only):
- `wrangler`: Cloudflare Workers CLI and runtime
- `typescript`: TypeScript compiler
- `vitest`: Test framework
- `@cloudflare/vitest-pool-workers`: Cloudflare-specific test pool

**Runtime Environment**:
- Cloudflare Workers V8 isolates
- No Node.js APIs available
- Web APIs and Cloudflare Workers APIs only
- Service Worker global scope

### Key Source Files

**Main Worker** (`src/index.ts`):
```typescript
export default {
  async fetch(request, env, ctx): Promise<Response> {
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
```

**Frontend Application** (`public/index.html`):
- Single-page quiz application
- 4-question personality assessment
- Dog breed matching algorithm (placeholder)
- Responsive design

**JavaScript Logic** (`public/app.js`):
- Quiz state management
- DOM manipulation
- Currently has placeholder data for questions/breeds
- ~50 lines of functional code

### Development Workflow

**Recommended Development Process**:
1. **Setup**: `npm install && npm run cf-typegen`
2. **Local Development**: `npm run dev` (opens http://localhost:8787)
3. **Make Changes**: Edit files (auto-reload in dev mode)
4. **Type Check**: TypeScript will validate in IDE
5. **Deploy**: `npm run deploy` (requires Cloudflare auth)

**Testing Strategy**:
- **Current State**: Tests are broken and need updating
- **Expected Tests**: Should test static file serving and future API endpoints
- **Fix Required**: Align tests with actual worker functionality

### Trust These Instructions

**Always reference this document first** before exploring the codebase. These instructions are comprehensive and tested. Only perform additional searches if:
- You encounter errors not documented here
- You need to implement new functionality not covered
- The instructions prove incomplete or incorrect

**When Making Changes**:
- Always run `npm run cf-typegen` after modifying `wrangler.jsonc`
- Use `npm run dev` for immediate feedback
- Remember that tests are currently broken (known issue)
- Follow the TypeScript strict mode requirements
- Maintain the existing code style (tabs, 140 chars, etc.)

**File Locations Quick Reference**:
- Worker logic: `src/index.ts`
- Frontend UI: `public/index.html`
- Styles: `public/styles.css`
- Frontend JS: `public/app.js`
- Tests: `test/index.spec.ts` (broken)
- Config: `wrangler.jsonc` (main), `tsconfig.json`, `vitest.config.mts`
- Types: `worker-configuration.d.ts` (generated)