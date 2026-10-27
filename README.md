# 锋锐金属产品画册

静态产品画册网站，当前版本1.1.0，共59款产品。

## 本地预览

安装Node.js后，在项目目录执行：

```sh
npm start
```

浏览器打开 `http://localhost:4173`。

## 检查与打包

```sh
npm run check
npm run build
```

打包结果位于 `dist/`。也可以直接将根目录的 `index.html`、`src/`、`assets/` 部署到静态网站服务。

产品数据在 `src/data/catalog.json`，正式图片在 `assets/images/`。
原始照片和修图过程文件仅保存在本地，不随网站上传。

更新内容见 [CHANGELOG.md](CHANGELOG.md)。
