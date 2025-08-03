# pawjection

This is a sandbox web application for exploring DevSecOps practices. I'll try to keep the main branch clean at all times, but please pay extra attention when working with other branches.  And of course — have fun comparing yourself, your friends, and your family to different dog breeds! 🐾

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Cloudflare account (free tier works)

## Getting Started

1. Clone the repository:
   ```bash
   git clone git@github.com:baccatore/pawjection.git
   cd pawjection
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Login to Cloudflare (first time only):
   ```bash
   npx wrangler login
   ```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server at http://localhost:8787 |
| `npm run deploy` | Build and deploy to Cloudflare Workers |
| `npm run test` | Run tests using Vitest |
| `npm run cf-typegen` | Generate TypeScript types from wrangler configuration |

### Development Workflow

1. **Local Development**: Run `npm run dev` to start the development server. The worker will automatically reload when you make changes.

2. **Testing**: Run `npm run test` to execute the test suite. Tests are configured to run in the Cloudflare Workers environment.

3. **Type Generation**: Run `npm run cf-typegen` after modifying `wrangler.jsonc` to regenerate TypeScript types for your environment bindings.

4. **Deployment**: Run `npm run deploy` to deploy your worker to Cloudflare's edge network.

## Project Structure

- `/src` - Source code for the Cloudflare Worker
- `/public` - Static assets served by the worker
- `/test` - Test files
- `wrangler.jsonc` - Cloudflare Workers configuration
- `vitest.config.mts` - Test configuration
