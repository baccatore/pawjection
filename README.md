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

---

# pawjection（日本語版）

これはDevSecOpsの実践を探求するためのサンドボックスWebアプリケーションです。メインブランチは常にクリーンな状態を保つよう努めますが、他のブランチで作業する際は特に注意を払ってください。そしてもちろん、自分自身、友達、家族を様々な犬種と比較して楽しんでください！🐾

## 前提条件

- Node.js（v16以上）
- npmまたはyarn
- Cloudflareアカウント（無料プランで可）

## はじめに

1. リポジトリをクローン：
   ```bash
   git clone git@github.com:baccatore/pawjection.git
   cd pawjection
   ```

2. 依存関係をインストール：
   ```bash
   npm install
   ```

3. Cloudflareにログイン（初回のみ）：
   ```bash
   npx wrangler login
   ```

## 開発コマンド

| コマンド | 説明 |
|---------|-------------|
| `npm run dev` | ローカル開発サーバーをhttp://localhost:8787で起動 |
| `npm run deploy` | ビルドしてCloudflare Workersにデプロイ |
| `npm run test` | Vitestを使用してテストを実行 |
| `npm run cf-typegen` | wrangler設定からTypeScript型を生成 |

### 開発ワークフロー

1. **ローカル開発**: `npm run dev`を実行して開発サーバーを起動します。変更を行うとワーカーは自動的にリロードされます。

2. **テスト**: `npm run test`を実行してテストスイートを実行します。テストはCloudflare Workers環境で実行するように設定されています。

3. **型生成**: `wrangler.jsonc`を修正した後、`npm run cf-typegen`を実行して環境バインディングのTypeScript型を再生成します。

4. **デプロイ**: `npm run deploy`を実行してワーカーをCloudflareのエッジネットワークにデプロイします。

## プロジェクト構造

- `/src` - Cloudflare Workerのソースコード
- `/public` - ワーカーが提供する静的アセット
- `/test` - テストファイル
- `wrangler.jsonc` - Cloudflare Workers設定
- `vitest.config.mts` - テスト設定
