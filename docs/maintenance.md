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

实测日期为 2026-10-14（Asia/Shanghai）：新增收录 **7 件作品**，修复既有 Oval Office 预览并补充完整 X 录像，保留原首发与收录字段；**5 条**本轮无法核验可用预览且无归档视频的记录暂移出展示库，原记录保存在审核档案。当前 340 条记录包括 328 条 Astra 案例与 12 条独立方法参考，提供 97 条源码 / 工程入口、114 个演示入口和 143 段归档完整录像。今日收录不冒充今日首发，未知日期仍为 null。此前代码清理另见 [REF-0001](refactoring/REF-0001-repository-cleanup/01-动机与方案.md)。

| 检查 | 实际命令与结果 |
| --- | --- |
| `npm run check` · `npm run lint` | 340 条数据、24 项测试、TypeScript 与 lint 全部通过 |
| `npm run build` | 普通构建通过；708 静态页、15,180 本地引用、340 详情 JSON 与 709 sitemap URL 校验通过 |
| 设置 `GITHUB_PAGES=true` 后 `npm run build` | Pages 子路径构建通过；708 静态页、15,180 本地引用、340 详情 JSON 与 709 sitemap URL 校验通过 |
| 历史预览全量 GET / 解码 | 338 张旧预览中 332 张完整获取与解码通过；6 张 LinkedIn 媒体因 TLS hostname 校验失败，独立 curl 保留证书验证复查仍失败。Oval Office 用同作品 X 预览及完整录像修复，其余 5 条暂下架；失败证据保留，不写成全部旧预览恢复。333 条保留旧记录与 7 件新增成果均有本轮可查看证据 |
| 新增与补充成果 | 7 件新作品及 Oval Office 预览完整 GET，核对 MIME / 长度 / SHA-256、完整解码并实际查看。真实浏览器 7 张新画廊图与 Oval Office 独立详情加载正常。AA-3D 公开回放明确对应 Astra 模型 / 场景 ID；物理回放 GIF 和研究图 hash 与作者 manifest 对应 |
| 完整 X 视频 | 本轮 3 段完整录像、6 个平台原版 / 播放文件，合计 34,861,800 字节。同帖媒体 ID、来源时长、MIME / Content-Length / SHA-256 核对；全部新文件严格 FFmpeg 全长解码 exit 0、stderr 空，未剪辑或转码。3 个本地原生播放器播放至结尾，`ended=true` 且无错误；证据 GIF 不是完整原实验录像，不纳入该数量 |
| 来源、日期与职责 | 16 个新 / 更新来源、工程、演示或提示词地址完整 GET 200。海中鸟居与热带海湾的 Astra / Opus 区域分别标注；Meshy GLB 只作建筑空间参考，Astra 新写 Blender 几何；PhysCodeGym 研究验证器、BHBench 网页移植和见积太郎3 商品系统不统一归给 Astra。日区恐龙文章10月13日00:38对应上海10月12日23:38；Meshy 实验完成日与文章发布日分开。工程与物理指标未独立复现 |
| 本地真实浏览器 | 中英文详情、语言切换保留筛选、完整视频筛选、空结果与清除、分享链接回读及旧 `#case=` 地址有实际核查记录。1440、390、320 像素视口无页面横向溢出；9 个被检查页面控制台无告警或错误。详情与媒体检查不代表试玩作者工程 |
| 网站实拍与 Markdown | 四张10月14日真实截图替换10月13日旧图，保留浏览器原生尺寸；双语 README、媒体说明与分享封面同步，分享图与首页截图逐字节一致。76 个本地 Markdown 引用存在，`git diff --check` 通过 |
| 历史事实与仓库边界 | 除 Oval Office 媒体修复与 5 条暂下架，其余 332 条旧事实逐字段不变；既有 280 个视频清单条目完全不变，新增 6 个条目。MP4、调研与发布脚本、构建产物、迁移材料不提交 |

本轮本地检查与媒体归档已完成，Pages 工作流及生产站结果在实际部署后回写。本轮未部署 ChatGPT Site。

## 对外引用

分享时使用当前统计与真实截图，保留作品名、原作者和来源链接；自己的练习建议不能当成原作者提示词或已经执行的实验。公开可看和署名不等于取得再发布许可。现阶段无网站点击分析系统，不虚构访问量或转化率；GitHub 流量与 Star 比较须使用相同观察窗口，不据累计数字归因于某篇帖子。
