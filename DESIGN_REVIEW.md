# 採景 ECO VIEW｜100 分高級網站版設計說明

## 本版定位

這版不再把網站做成一般電商或海報頁，而是改為：

```text
精品品牌首頁
高級作品攝影主視覺
作品集式商品陳列
LINE 私訊導流
0 元靜態版
```

## 已完成重構

```text
1. 重新設計 Header Menu
2. 重新設計 Hero 視覺
3. 使用 AI 生成高級產品主視覺
4. 隨機建立 5 個商品
5. 每個商品都有圖片、價格、敘述、SEO
6. 商品卡片改成作品陳列風格
7. 商品詳情頁改成精品作品頁
8. 新增客製服務頁
9. 移除前台 ADMIN 入口
10. 保留 0 元靜態架構
```

## 商品圖片

本版內建 5 張生成商品圖：

```text
product-moss-secret.jpg
product-rainforest-valley.jpg
product-mountain-echo.jpg
product-tree-stone.jpg
product-cliff-oasis.jpg
```

## 首頁主視覺

```text
hero-premium.jpg
```

## 管理方式

不使用 R2、不使用 D1、不使用資料庫。

正式商品資料仍位於：

```text
data/sampleProducts.ts
```
