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

实测日期为 2026-10-13（Asia/Shanghai）：新增收录 **6 件作品**，另给既有 LEGO-Anything 档案补充作者 Explorer、两张明确 Astra run_01 的实际重建图与指标来源，保留旧主预览和原收录日。当前 338 条记录包括 326 条 Astra 案例与 12 条独立方法参考，提供 95 条源码 / 工程入口、111 个演示入口和 140 段归档完整录像。本轮包含近期作品与此前遗漏案例，不把今日收录日当作作品首发。原始发布、收录与核查日期独立记录，未知首发保持 null。此前代码清理另见 [REF-0001](refactoring/REF-0001-repository-cleanup/01-动机与方案.md)。

| 检查 | 实际命令与结果 |
| --- | --- |
| `npm run check` · `npm run lint` | 338 条数据、24 项测试、TypeScript 与 lint 全部通过 |
| `npm run build` | 普通构建通过；704 静态页、15,096 本地引用、338 详情 JSON 与 705 sitemap URL 校验通过 |
| 设置 `GITHUB_PAGES=true` 后 `npm run build` | Pages 子路径构建通过；704 静态页、15,096 本地引用、338 详情 JSON 与 705 sitemap URL 校验通过 |
| 历史预览全量 GET / 解码 | 332 张基线预览中，首轮326张完整获取与解码通过；6张 LinkedIn 预览因 Python TLS hostname 检查失败，保留失败记录并用独立 curl 完整 GET 恢复，证书校验保留。最终332张全部完整解码通过，未下架或替换旧主预览；加上新增作品，338条当前预览均有本轮可查看证据 |
| 新增与补充预览 | 6 件新作品和 LEGO-Anything 两张补充输出完整 GET、校验 MIME / 长度 / SHA-256、完整解码并实际查看；6 张新增画廊预览在真实浏览器均加载正常。论文查看器的街景、办公区输出明确为 Astra run_01，hash与作者指标清单匹配 |
| 完整 X 视频 | 本轮 2 段完整录像、4 个平台原版 / 播放文件，合计 18,617,660 字节；同帖媒体 ID、MIME、Content-Length、来源时长和 SHA-256 核对，未剪辑或转码。2 个本地原生播放器均播放至结尾，`ended=true` 且无错误 |
| 全片解码警告与复核 | 章鱼播放版的 null 输出复核遇到 duplicate DTS；保留原警告和原 MP4 字节，严格 rawvideo 与 framemd5 全帧输出均 exit 0、stderr 为空。其他新文件严格全片解码通过。解码命令、输出方式与两次成功证据保留于媒体清单和本轮增量记录，不将 null 输出警告写成解码成功 |
| 来源与去重 | 11 个新 / 更新来源、工程、演示或提示词地址完整 GET 200。Corner Mart 明确 Astra 编写游戏及 Blender 资产脚本；陶龙后续 Sol、Mika 的 Hi3D 网格 / 人工 AccuRIG / Astra IK、NOA BOT 的人工设备导入分别记录。提示词未公开不补写；游戏和工程未独立复现 |
| LEGO-Anything 日期与材料 | 原 arXiv 首版 UTC 2026-09-28 23:17:39 对应上海9月29日，按统一口径纠正 `sourceDate`；保留10月1日原收录日、来源、作者与主预览。Explorer HTML 200仅证明入口可达，展示的是静态记录与点云查看，不表示重新调用模型或重算指标；研究源码本轮未取得，工程入口仍为 null |
| 本地真实浏览器 | 中英文详情、切换语言保留筛选、完整视频筛选、搜索空结果与清除、分享链接回读及旧 `#case=` 链接检查以本轮实际记录为准。1440、390、320 像素视口无页面横向溢出；8 个被检查页面控制台无告警或错误。独立作品页与播放器检查不代表复现作者工程 |
| 网站实拍与 Markdown | 双语 README 共用四张本轮真实截图，保留原生像素；10月13日实拍替换10月12日四张旧图，当前只留四张。分享图与首页截图完全一致；76 个本地 Markdown 引用存在；`git diff --check` 通过 |
| 历史事实与文件边界 | 除 LEGO-Anything 证据补充与日期修正，其余331条旧事实全部不变；既有276个视频清单条目逐字段完全不变。本轮新增4个条目；MP4、调研与发布脚本、构建产物和迁移材料不提交 |

内容提交 `56e1d91` 已推送至 `main`，[Pages 工作流](https://github.com/carpentry-liu/awesome-astra-3d/actions/runs/38400087124) 的检查、构建、全部140段播放文件下载校验与部署均通过。随后对生产站完整 GET：338条公开目录、14个新增或更新的双语详情页、705个 sitemap 地址和两段新完整 MP4 的 MIME / 字节 / SHA-256 均匹配；GitHub 的280项视频清单保留全部276项旧记录，四张当前截图及双语 README、分享图与首页统计均与本地一致。公开 Release 的四个附件尺寸、服务端 digest 与下载地址经独立复核通过；匿名附件 API 返回403限流后，使用既有仓库凭证进行只读元数据查询，失败记录保留，网站与 RAW 请求未使用凭证。本轮未部署 ChatGPT Site。

## 对外引用

分享时使用当前统计与真实截图，保留作品名、原作者和来源链接；自己的练习建议不能当成原作者提示词或已经执行的实验。公开可看和署名不等于取得再发布许可。现阶段无网站点击分析系统，不虚构访问量或转化率；GitHub 流量与 Star 比较须使用相同观察窗口，不据累计数字归因于某篇帖子。
