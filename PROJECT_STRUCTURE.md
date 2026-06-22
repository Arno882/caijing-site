# 專案結構說明

```text
app/                 Next.js App Router 頁面
app/page.tsx          首頁
app/products          商品列表頁
app/product           商品詳情頁，使用 ?slug=xxx
app/about             關於採景
app/contact           聯絡頁
app/admin             後台頁面

components/           共用元件
components/Hero.tsx   首頁主視覺
components/ProductCard.tsx 商品卡片
components/ProductGrid.tsx 商品列表與分類
components/AdminDashboard.tsx 後台管理介面

lib/                  工具函式
lib/api.ts            前台資料讀取與 fallback
lib/line.ts           LINE 詢問文字產生

types/                TypeScript 型別

data/                 範例資料

functions/            Cloudflare Pages Functions
functions/api/products.ts  商品 API
functions/api/settings.ts  網站設定 API
functions/api/upload.ts    圖片上傳 API
functions/assets/[[path]].ts R2 圖片讀取

public/placeholders/  佔位圖片

docs/                 補充文件
```
