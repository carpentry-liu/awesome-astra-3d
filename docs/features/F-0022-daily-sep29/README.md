# 9 月 29 日更新

新增 Crossing Lab 与罗马军团士兵对照，沿用现有展示布局。前者为作者文章，原始日期 9 月 27 日；后者为 9 月 29 日社区转述，原作者及作品日期未知。图片已下载解码并人工检查，Astra 对照结果明确位于右列。既有 210 条记录及 97 段视频保持不变。

检索还发现 BEYOND THE BLITTER 程序化演示，但尚未核实其展示媒体，暂不收录。Render Arena 页面不可访问，暂不收录。无新核实的 X 视频。仅发布 GitHub Pages，不部署 ChatGPT 站点。

## 验证

- `npm run check`：212 条记录、11 项测试、TypeScript 通过。
- `npm run build`：静态构建及首页 9 个资源引用检查通过；保留已有包体积与 Node 弃用提示。
- `python work/finish-sep29.py`：原 210 条逐对象不变、97 段视频清单不变；两张新增图在实际页面分别加载为 1920 × 1080、1280 × 1091。
- 首页、最新列表、手机实拍已检查；手机无横向溢出，控制台 warn/error 为空。
- 增量媒体审计仅记录今日新增图片，不覆盖历史全库审计日期。

## 发布核验

- 内容提交 `59d18b2` 已推送；[GitHub Actions 36517752970](https://github.com/carpentry-liu/awesome-astra-3d/actions/runs/36517752970) 的 build、deploy 均成功。
- `python work/published-sep29.py`：线上 212 条记录与本地事实源逐对象一致。
- `python work/readme-check-sep29.py`：GitHub 渲染 README 含 9 张图片；中英文 README 内容与三张 JPEG 均与本地匹配。
- `python work/about-sep29.py`：About 更新为 200 案例、54 工程、83 演示、97 录像，保留 20 个 topics；仓库为 public。
