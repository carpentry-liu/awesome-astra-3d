# 2026-09-10 案例扩充与首页展示

在 103 条 Astra 案例基础上继续跨平台检索与去重，优先不同题材、原作者说明、工程及实际效果。X 仍以精确原帖镜像核查并保留证据等级；完整视频单独归档。遵守当前小红书停用要求，不访问该平台。

沿用现有数据契约与静态网站，不引入新功能或依赖。同时更新精选、六图预览和真实桌面／手机截图，让新材料能在 GitHub 首屏被发现。保留历史数据和媒体；Git 提交及历史部署可回滚。

检索覆盖、排除理由和逐条证据写入事实源与调研数据；完成后记录检查、构建、浏览器、媒体和上线的实际结果。

## 收录结果

新增 26 条：16 条 X、5 条 GitHub、2 条 Reddit，Bilibili、Zenn、LINUX DO 各 1 条。总计 129 条 Astra 案例、12 条独立参考，44 条源码 / 工程、55 个演示入口。搜索还覆盖 YouTube、Qiita、作者博客和两个新案例目录；排除重复搬运、只有挑战没有结果、无法确认模型归属和泛教程。逐项线索见 `data/research.json` 的 `daily-curation-2026-09-10` 批次。

Little Flock 区分一次持续 goal 任务与一次瞬时生成，并说明预告片有编排镜头和本地多人演出。Tripo 贴图案例只公开过程与提示词，`repositoryUrl` 保持空值，不计为可下载工程。两组对照保留另一模型名称；木箱的约 55 秒只对应其建模日志。LINUX DO 直连返回 403，依据可读原文索引保留转引等级；Reddit 预览图 403 后不再作为图片入口。

首页精选更新为 Little Flock、日式花店、湿地湖畔；中英文 README 六图预览保留作者原图和署名。GitHub Markdown API 验证发现昵称中的 ASCII 竖线会拆坏表格，改用实体转义后八张图片均正常渲染。真实浏览器发现默认 favicon.ico 404，已连接项目现有 favicon.svg，无需新增图片或依赖。

## 实际验证

- `D:/miniforge3/python.exe -X utf8 work/download-0910.py`：34 个 MP4，共 567,163,790 字节，零失败；17 个播放版本全长解码通过，时长差均不超过 0.2 秒，未裁剪、未转码。
- `D:/miniforge3/python.exe -X utf8 work/audit-0910.py`：55 个演示链接 HTTP 200，含 8 个新增入口；保存标题与最终地址。可达不等于已完成玩法或联机验证，原有停运案例仍保留历史说明。
- `D:/miniforge3/python.exe -X utf8 work/image-audit-0910.py`：23 张候选图，22 张 HTTP 200，1 张 Reddit 403；该图片字段已置空。
- `D:/miniforge3/python.exe -X utf8 work/verify-readme-0910.py`：GitHub GFM 渲染 8 张图片，6 张作者图（含实际 camo 代理地址）均返回 206，两张真实截图文件存在。
- `npm run catalog`：141 条事实源同步为目录、最新收录、中英文统计、公开 JSON 和 sitemap。
- `npm run check`：数据契约、11 项行为测试和 TypeScript 通过；`npm run lint` 退出码 0。
- `node work/browser-0910.cjs`：全新无登录 Edge 无头上下文，三组精选图片成功，花店检索与详情打开正常，390 px 无横向溢出；连接现有图标后 console error / warning 和页面异常均为空。

- `D:/miniforge3/python.exe -X utf8 work/decode-originals-0910.py`：17 个最高码率原画文件也全部解码成功；本轮共 34 个完整文件，清单 `decodeChecked` 均为 true。
- `D:/miniforge3/python.exe -X utf8 work/publish-0910.py`：34 个附件发布至 [media-2026-09-10](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-09-10)，按 GitHub 返回的大小、SHA-256 核对；发布后刷新正式地址。全库共 116 个 MP4，对应 58 段完整视频。
- `D:/miniforge3/python.exe -X utf8 work/finalize-data-0910.py`：此前 115 条记录逐字段保留，26 个新增 ID 无冲突；原画解码证据与媒体 SHA-256 一致。随后重新运行目录生成与 `node scripts/validate-data.mjs`，最终 141 条数据及所有媒体映射通过。
- `npm run build`：退出码 0，静态预渲染成功，9 个 JS/CSS 资源引用通过导出校验；保留既有插件耗时提示与 Node DEP0190 提示，没有构建失败。
- 最终真实截图：[1440 × 1400 桌面](../../media/welcome-desktop-2026-09-10.png)、[390 × 844 手机](../../media/welcome-mobile-2026-09-10.png)、[1440 × 1300 最新案例](../../media/latest-cases-2026-09-10.png)。桌面统计为 129 / 44 / 55 / 58；再次检查布局、检索、精选与控制台通过。

## 发布方式

提交本次事实源、媒体清单、README、展示与验证文档，推送 main 触发 GitHub Pages；现有 Sites 以同一提交和本地验证过的静态产物保存新版本，沿用当前所有者访问范围。上线后检查实际版本、公开数据及视频响应；发布回执保存在本次本地工作记录中。
