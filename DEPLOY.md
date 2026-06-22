# Cloudflare Pages 部署說明

## 1. 建立 GitHub 專案

```bash
git init
git add .
git commit -m "init caijing showcase site"
git branch -M main
git remote add origin <你的 GitHub repo URL>
git push -u origin main
```

## 2. 建立 Cloudflare Pages 專案

Cloudflare Dashboard → Workers & Pages → Create application → Pages → Connect to Git。

建議設定：

```text
Build command: npm run build
Build output directory: out
Root directory: /
```

## 3. 建立 D1 Database

```bash
wrangler d1 create caijing-db
```

把產生的 database_id 填入 `wrangler.toml`。

再執行：

```bash
wrangler d1 execute caijing-db --file=./D1_SCHEMA.sql
```

Cloudflare Pages 專案設定中新增 D1 binding：

```text
Variable name: DB
D1 database: caijing-db
```

## 4. 建立 R2 Bucket

```bash
wrangler r2 bucket create caijing-images
```

Cloudflare Pages 專案設定中新增 R2 binding：

```text
Variable name: BUCKET
R2 bucket: caijing-images
```

## 5. 設定環境變數

Cloudflare Pages → Settings → Environment variables：

```text
ADMIN_TOKEN=請換成你自己的強密碼
```

## 6. 綁定正式網域

Cloudflare Pages → Custom domains → Set up a custom domain。

建議採景使用獨立正式網域，不要長期使用 pages.dev。

## 7. 重新部署

所有 binding 與環境變數設定完後，重新部署一次。
