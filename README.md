# 採景｜高級商品展示網站

這是一個為「採景」製作的 Mobile First 高級商品展示網站專案。

定位：
- 沒有實體店鋪
- 不做購物車
- 不做線上結帳
- 不做會員系統
- 客人只瀏覽商品
- 購買、客製、合作統一透過 LINE 私訊

## 技術

- Next.js
- TypeScript
- Tailwind CSS
- Cloudflare Pages
- Cloudflare Pages Functions
- Cloudflare D1：商品與設定資料
- Cloudflare R2：圖片儲存

## 安裝

```bash
npm install
npm run dev
```

開啟：

```text
http://localhost:3000
```

## 主要頁面

```text
/          首頁
/products  商品列表
/product?slug=xxx  商品詳情
/about     關於採景
/contact   聯絡
/admin     後台
```

## 後台

後台路徑：

```text
/admin
```

正式部署時，請在 Cloudflare Pages 設定環境變數：

```text
ADMIN_TOKEN=自訂一組強密碼
```

管理員進入後台後，輸入此 Token 並儲存於瀏覽器。

## 注意

本專案第一版刻意不做購物車、金流、訂單、會員與物流串接。這是為了降低維護成本，並保持高級商品展示的定位。

## 本版已加入 Logo

Logo 檔案位置：

```text
public/brand/logo-ecoview.jpeg
```

Header 與 Footer 已套用此 Logo。

IG 連結已先設定為：

```text
https://www.instagram.com/19ecoview/
```

## 本版已加入首頁封面

首頁封面檔案位置：

```text
public/products/hero-cover.jpg
```

首頁設定已改為：

```text
heroImage: /products/hero-cover.jpg
heroTitle: 微景・大世界
heroSubtitle: 在方寸之間，遇見自然之美
```

## 0 元圖片管理方式

本版可先不使用 R2。圖片直接放在：

```text
public/products
```

商品資料請修改：

```text
data/sampleProducts.ts
```

## 本版 Layout 重新設定

本版已改為更乾淨的置中式首頁：

```text
Logo
品牌文字
主標
CTA
裁切封面
精選商品
```

不再使用左右分割的大字＋海報配置，避免畫面擁擠。

## 本版後台更人性化

後台改成三個主要區塊：

```text
商品管理
首頁設定
匯出資料
```

0 元版不直接寫入網站檔案，後台資料會先存在瀏覽器 localStorage。正式上線仍以 `data/sampleProducts.ts` 為準。

若要把後台資料正式套用到網站，請使用「匯出資料」下載 JSON，再由網站管理員更新靜態資料。


## 後台更新前台修正版

本版已修正：後台草稿資料會寫入瀏覽器 localStorage，前台會優先讀取 localStorage。

本機測試時：

```text
/admin 修改商品或首頁設定
↓
回到首頁或商品頁重新整理
↓
前台會看到更新
```

注意：localStorage 只存在同一台電腦、同一個瀏覽器。正式網站要永久更新，仍需把資料寫回 `data/sampleProducts.ts` 再部署。

## 滿分版 UI 重構

本版已做精品化重構：

```text
Header 極簡化
Hero 改成作品攝影主視覺
商品卡片改成作品陳列感
商品詳情頁增加留白
LINE 綠降低存在感
前台移除 ADMIN
加入 Logo 優化版本
```

主視覺使用：

```text
public/products/hero-product-crop.jpg
```

Logo 優化版本：

```text
public/brand/logo-ecoview-seal.png
public/brand/logo-ecoview-wide.png
public/brand/logo-ecoview-256.png
```

## 100 分高級網站版

本版已加入 AI 生成的高級商品攝影與 5 個隨機商品。

首頁主視覺：

```text
public/products/hero-premium.jpg
```

五個商品圖：

```text
public/products/product-moss-secret.jpg
public/products/product-rainforest-valley.jpg
public/products/product-mountain-echo.jpg
public/products/product-tree-stone.jpg
public/products/product-cliff-oasis.jpg
```

新增頁面：

```text
/custom 客製服務
```

## 高級 About 與 LINE CTA 版

本版已將雨林微景觀特寫圖加入：

```text
public/backgrounds/rainforest-closeup.jpg
```

使用位置：

```text
首頁 About 區塊
首頁 LINE CTA 區塊
/about 頁面
```

設計方向：黑色精品、雨林特寫、文字克制、LINE CTA 低調處理。
