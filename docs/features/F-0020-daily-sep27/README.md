# F-0020 · 9 月 27 日：建筑重建与游戏迭代

基线 b350371；工作区干净，昨日发布验证记录尚待推送。本轮检索 GitHub、X、Reddit、作者博客、three.js 论坛和 arXiv，继续遵循真实媒体门槛，不恢复已下架空预览条目。

收录 AstraLOD3 建筑重建论文与 Old Circle 游戏开发复盘。前者发表于 9 月 23 日，后者原帖为 9 月 10 日，均标为本日补收而非今日首发。论文明确使用 GPT-6 Astra，模型图来自论文；其预告仓库返回 404，因此不记入可用源码或演示。Old Circle 引用作者实机截图，保留建模、动画、几何问题与未完成状态。

更新案例事实源、精选、README 和实拍。新增静态图不冒充录像；97 段归档视频不变。不变更布局、依赖或播放器，不部署 ChatGPT Sites。GitHub Pages 发布；Git 可回滚。

## 验证

- `npm run check`：初次检查发现新条目 evidenceUrls 中有空值，修正后 208 条数据、11 项测试、TypeScript 全部通过。
- `npm run build`：修正后重新执行成功，导出首页及 9 个资源引用通过；仅有已有体积和 Node 弃用提示。
- `python work/finish-sep27.py`：基线 206 条逐对象不变、全部视频清单不变；论文附录锚点存在。
- 浏览器实际加载建筑图 940 × 705、游戏图 1440 × 900，均检查图像内容；控制台 warn/error 为空。
- 首页、最新列表、390 × 844 手机视口实拍检查通过，手机无横向溢出。
- 媒体审计仅追加今天两图，未冒充重新全检历史 97 段录像。

## 发布

- 内容提交 `8908c33` 已推送 main，昨日 `b350371` 验证记录也已同步。
- [GitHub Actions 36286649013](https://github.com/carpentry-liu/awesome-astra-3d/actions/runs/36286649013)：build / deploy 均成功。
- `python work/published-sep27.py`：正式站 208 条数据逐对象匹配本地，首两项为今日新增案例。
- `python work/readme-check-sep27.py`：远端中英文 README 一致，9 张图片标签可渲染，三张新截图字节一致。
- `python work/about-sep27.py`：About 已同步 196 / 54 / 83 / 97，仓库保持公开。
- 本次临时浏览器页和预览服务已关闭，未部署 ChatGPT Sites。
