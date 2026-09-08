# 2026-09-08 · 欢迎页与案例扩充

## 用户需求与结果

克隆公开仓库，优化网站，扩充可追溯案例，更新仓库欢迎页和演示站。

- 本地项目：`D:/ai/awesome-astra-3d`，独立 Git 根。
- 新增 8 条 Astra 参与的三维案例，现为 61 条 Astra + 12 条独立参考。
- 源码 / 工程 23 条，演示入口 29 条；保留原有 22 个完整视频。
- 新增涵盖 BelugaXL、Softie、Inside Lloyd’s、Splashline、曲柄滑块、Pulsebreak、Robo Open 与 Minecrack。
- Softie 的 Astra / Gemini 分工来自原帖镜像，保持「转引待复核」；不能全部归为 Astra。Minecrack 生成宣传图未当作实机画面。

## 设计与实现

延续深色与蓝色的作品档案风格，增加可切换精选图、可点击资源统计和直接源码 / 演示入口。欢迎组件在 `app/welcome.tsx`，样式在 `app/welcome.css`；案例搜索、URL 恢复、证据、完整视频和引用逻辑保留。

中英文 README 全面重写，统一网站、最新收录、入门和数据入口。统计与最新八条记录从 `data/cases.json` 自动生成，避免下一轮扩充后数字和介绍失配。

修复 Piața Unirii 根目录比较器的 `runs.json` 404：演示改为 Astra 专属路径。作者仓库 `comparison/runs.json` 明确模型，所以升级为「作者自述」。保留原比较页，清除提示词字段矛盾。补充 FACET FIGHTER 正式版本的下载来源。

29 个外部演示进行了 HTTP GET 和标题检查，结果见 `data/demo-audit.json`；可达性不等于交互、性能或硬件兼容验证。新作品未在本机运行其源码。

## 依赖处理

React、React DOM、RSC 统一从 19.2.6 升到 19.2.8，Vite 从 8.0.13 升到 8.0.16，保留原依赖结构和锁文件。

仍有 npm audit 已知问题（9 条，1 low / 2 moderate / 6 high），涉及既有 Cloudflare 开发工具链和构建期 image-size。网站发布的是静态文件，没有 RSC 服务端函数。没有使用 `audit fix --force`；vinext beta6 只是把 image-size 2.0.2 内置，不能视为修复，因此未为隐藏报告而升级。工具链跨版本升级留待独立验证。

参考：[React 安全公告](https://github.com/react/react/security/advisories/GHSA-wx67-qw84-cm4g)、[Vite 安全公告](https://github.com/vitejs/vite/security/advisories/GHSA-fx2h-pf6j-xcff)、[vinext image-size 内置变更](https://github.com/cloudflare/vinext/pull/2913)。

## 验证记录

- `npm run check`：73 条数据、11 项行为测试与 TypeScript 检查通过。
- `npm run lint`：通过。
- `npm run build`：静态首页与 9 项 JS/CSS 引用校验通过。
- 浏览器：宽屏 1440、手机 390，页面无横向溢出；真实截图见 `docs/media/`。
- 源码筛选 23 条，Softie 搜索 1 条，详情显示混合模型声明与证据；空结果和清空正常。
- 独立参考 12 条，资源快捷入口切回 Astra 并显示 29 条演示；最新收录 URL 恢复到 BelugaXL。
- 首轮浏览器控制台未发现应用错误。外站图片失败时保留明确提示与作者来源。

## 部署

保留公开 GitHub Pages 路径与现有所有者私有 Sites 配置。工作流在 main 推送后校验数据、构建和视频文件并部署；Sites 使用同一源代码的静态构建。最终发布状态以任务中的部署回执为准。
