# 内容与网站维护

## 权威资料

| 文件 | 用途 |
| --- | --- |
| `data/cases.json` | 展示案例、作者、模型证据、材料和缺失字段 |
| `data/videos.json` | 完整原版 / 播放版、Release 地址、字节与 SHA-256 |
| `data/research.json` | 实际检索、访问限制、未采用线索和排除理由 |
| `data/demo-audit.json` | 作者演示入口的可达性观察，不等于完整试玩 |
| `data/link-audit.json` · `data/media-audit.json` | 链接、预览、播放与增量检查，保留原核查日期 |
| [审核档案](archive/unlisted-cases-2026-09-25.json) | 已下架案例的原始记录与理由 |

`data/catalog-index.json`、公开 JSON、目录与 sitemap 由事实源生成，不能独立编辑。收录规则见 [CONTRIBUTING.md](../CONTRIBUTING.md)，检索与页面契约见 [DESIGN.md](../DESIGN.md)。

## 收录与下架

1. 回到原作者文章、帖子或仓库确认模型归属。跨平台转载、同一作品的多个阶段或合集不重复计数；混合流程逐项记录模型、资产与人工职责。
2. 分开记录 `sourceDate`、`addedAt`、`observedAt`。首次发布日期无法确认时保持 null，仓库提交日或今天的收录日不能代替首发。
3. 完整获取并实际查看成果图或录像。检查响应类型和文件内容，不能把 HTML 响应、输入参考图或宣传封面当作成果预览。作者演示有硬件限制时如实注明。
4. 将实际检索范围、受限平台和排除理由追加到研究资料。增量检查只更新本次真实访问的记录，不把本轮日期改写成全库复查。
5. 预览失效且无可播放录像时从展示库撤下，并保存原记录和原因；仅有来源或演示入口不能代替可查看成果。恢复须有新的可核查媒体。

提示词优先链接回原文，短摘录按同页合计限制。署名、可编辑工程、原作者自述和独立验证分别说明；不能把公开入口写成已独立复现或已获得商业许可。

## 完整 X 录像

同一原帖的每个片段保留最高码率原版和原平台提供的较小完整播放版。下载前确认作者、帖子及媒体 ID；下载后核对 MIME、Content-Length、来源时长、字节数和 SHA-256，并对两版本进行完整解码。不能裁剪、转码或把其他模型的片段归为 Astra。

严格解码示例：

```sh
ffmpeg -v error -xerror -err_detect explode -i FILE -f null -
```

检查失败须定位原因后再发布。名义帧率时间基导致的 null 输出 DTS 警告可用 `-fps_mode passthrough -enc_time_base demux` 保留输入精度复核；这不是修改原 MP4 或绕过损坏。记录实际命令、结果及来源时长误差，不只写“可播放”。

媒体发布到 GitHub Release，核对服务器附件尺寸与 digest，再关联 `data/videos.json` 和案例的 `archivedVideos`。播放文件由 Pages 工作流获取到构建输出；不要将 MP4、调研下载或本地交接资料提交到仓库。保留原作者权利与移除入口，MIT 不包含第三方媒体。

## 生成、验证与发布

使用 Node.js 22.22.0+，推荐 `.node-version` 固定的 22.22.0。在本项目 Git 根执行：

```sh
npm ci
npm run catalog
npm run check
npm run lint
npm run build
npm start
```

`catalog` 同步中英文 README 自动统计与最新收录、CATALOG、UPDATES、轻量索引、公开 JSON 和 sitemap。`check` 验证数据、行为和 TypeScript；`build` 校验导出页面与本地资源，`start` 在默认 4173 端口预览 `dist/client`。`npm run dev` 供 React 首页开发；独立详情、专题和分页目录需要构建后预览。Windows Node 24+ 的兼容构建使用官方 npm 发行的 Node 22.22.0。

本地独立详情页的录像需要在构建后执行 `node scripts/fetch-videos.mjs`，从现有 Releases 获取完整播放版并核对 hash，写入 `dist/client/videos/`。下载文件不提交 Git；Pages 工作流自动执行这一步。普通预览直接服务静态 HTML，避免首页开发中间件重定向独立详情地址。

发布前同时检查普通构建与 Pages 子路径构建：在命令环境设置 `GITHUB_PAGES=true`，再运行 `npm run build`。本地浏览器需实际检查中文 / 英文、筛选与清除、复制或新标签链接、静态详情、旧 `#case=`、视频与失败回退。桌面、手机和窄屏应无页面横向溢出；检查控制台，并保存真实截图。

当前只保留 README 使用的四张网站实拍与 `public/share.jpg`。截图更新时同步中英文引用和 [媒体说明](media/README.md)，确认分享封面一致，删除被替换且无当前消费者的旧图。素材不能用生成图替代真实页面；不提交本地迁移 README、缓存或构建产物。

检查通过后发布到 `main`，[Pages 工作流](../.github/workflows/pages.yml) 检查、构建、下载并校验播放文件，再部署。部署成功后核对公开 JSON、双语详情、metadata、截图和媒体地址；必要时全量 GET 新视频并比对 hash。Git 状态和差异需逐项检查，禁止强推共享分支。

## 最近一次内容验证

内容版本 `6259f38`，实测日期为 2026-10-09（Asia/Shanghai）。本轮新增 13 个案例、修复 1 张历史预览、撤下 1 个无法查看成果的案例；当前 297 条记录包含 285 条 Astra 案例与 12 条独立方法参考。此前代码清理另见 [REF-0001](refactoring/REF-0001-repository-cleanup/01-动机与方案.md)。

| 检查 | 实际命令与结果 |
| --- | --- |
| `npm run check` · `npm run lint` | 297 条数据、24 项测试、TypeScript 与 lint 全部通过 |
| `npm run build` | 普通构建通过；620 静态页、13,298 本地引用、297 详情 JSON 与 621 sitemap URL 校验通过 |
| 设置 `GITHUB_PAGES=true` 后 `npm run build` | Pages 子路径构建通过，同一组导出数量与本地引用校验通过 |
| 历史预览全量 GET / 解码 | 285 张中 282 张首次通过；桶狭间重试恢复，az9713 换成同作品的实际 Blender 渲染。WorldGen 仓库、README 与两张成果图均返回 404，完整原记录留在审核档案 |
| 本轮新增预览 | 13 张原作者成果图完整 GET、解码并实际查看，网站画廊中均正常加载 |
| 完整 X 视频 | 3 段录像、6 个原版 / 播放文件，合计 25,706,631 字节；MIME、Content-Length、来源时长与 SHA-256 一致，两版本严格全长 FFmpeg 解码通过。命令逐文件记录在 `data/videos.json`，三个本地播放器实际播放到结尾且无错误 |
| 本地真实浏览器 | 中文 / 英文、最新收录与材料筛选、独立详情和旧 `#case=` 均检查；1440、390、320 像素视口无页面横向溢出。本库控制台无告警或错误。剪贴板回读为空，未将它记录为复制成功；独立详情链接实际打开正常 |
| 网站实拍与 Markdown | 四张真实截图已替换，`public/share.jpg` 与当前首页图一致；73 个本地 Markdown 引用均存在；`git diff --check` 通过 |
| [Pages 工作流](https://github.com/carpentry-liu/awesome-astra-3d/actions/runs/37870471232) | build / deploy success；`node scripts/fetch-videos.mjs` 获取并验证全部 124 个完整播放文件后部署 |
| 生产站全量 GET 核对 | 297 条公开事实与本地完全一致；26 个新增双语详情、621 条 sitemap 地址匹配；三个新 MP4 的 MIME、字节与 hash 一致；四张 GitHub 截图和网站分享图与本地文件 hash 一致 |

生产浏览器实际看到 13 张新增预览，并将 Pirate Jelly 的 17 秒双模型录像播放至结尾且无错误。其余两段在本地完整播放，生产文件 hash 一致。作者演示本轮实际检查 Seabright 三维城市与 RELIC 启动标题及遗迹背景，没有完成通关、认证物理正确性或独立性能复现。

本轮仅发布 GitHub Pages，未部署 ChatGPT Site。调研下载、发布脚本、构建产物及迁移材料均留在忽略目录；仓库只保留当前 README 使用的四张截图。

## 对外引用

分享时使用当前统计与真实截图，保留作品名、原作者和来源链接；自己的练习建议不能当成原作者提示词或已经执行的实验。公开可看和署名不等于取得再发布许可。现阶段无网站点击分析系统，不虚构访问量或转化率；GitHub 流量与 Star 比较须使用相同观察窗口，不据累计数字归因于某篇帖子。
