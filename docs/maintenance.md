# 内容与网站维护

## 权威资料

| 文件 | 用途 |
| --- | --- |
| `data/cases.json` | 展示案例、作者、模型证据、材料和缺失字段 |
| `data/videos.json` | 完整原版 / 播放版、Release 地址、字节与 SHA-256 |
| `data/topics.json` | 四个专题的中英文说明及案例顺序；slug 用于公开 URL |
| `data/research.json` | 实际检索、访问限制、未采用线索和排除理由 |
| `data/demo-audit.json` | 作者演示入口的可达性观察，不等于完整试玩 |
| `data/link-audit.json` · `data/media-audit.json` | 链接、预览、播放与增量检查，保留原核查日期 |
| [审核档案](archive/unlisted-cases-2026-09-25.json) | 已下架案例的原始记录与理由 |

`data/catalog-index.json`、公开 JSON、目录与 sitemap 由事实源生成，不能独立编辑。这五个受控产物在 GitHub PR 中默认折叠，仍可展开查看；请优先审查 `data/cases.json` 和作者证据。收录规则见 [CONTRIBUTING.md](../CONTRIBUTING.md)，检索与页面契约见 [DESIGN.md](../DESIGN.md)。

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

`npm run dev` 启动前自动准备轻量索引与单条 JSON，因此刚克隆也能打开首页弹窗。专题的作品与顺序改 `data/topics.json`，页面样式改 `public/static-pages.css`，模板与文案在 `scripts/static-pages/`。

本地独立详情页的录像需要在构建后执行 `node scripts/fetch-videos.mjs`。下载流先写入临时文件，长度和 SHA-256 均与清单匹配才替换 `dist/client/videos/` 中的播放文件。下载文件不提交 Git；Pages 发布自动执行这一步。普通预览直接服务静态 HTML。

发布前同时检查普通构建与 Pages 子路径构建：在命令环境设置 `GITHUB_PAGES=true`，再运行 `npm run build`。本地浏览器需实际检查中文 / 英文、筛选与清除、复制或新标签链接、静态详情、旧 `#case=`、视频与失败回退。桌面、手机和窄屏应无页面横向溢出；检查控制台，并保存真实截图。

当前只保留 README 使用的四张网站实拍与 `public/share.jpg`。截图更新时同步中英文引用和 [媒体说明](media/README.md)，确认分享封面一致，删除被替换且无当前消费者的旧图。素材不能用生成图替代真实页面；不提交本地迁移 README、缓存或构建产物。

面向 `main` 的 PR 运行检查、lint 和 Pages 构建，并用 `git diff --exit-code --stat` 确认受控的派生文件已随源数据提交。PR 不下载视频、不部署，也没有 Pages 写权限。[Pages 工作流](../.github/workflows/pages.yml) 在推送 `main` 或手动发布时才获取并校验完整播放文件，再部署。部署后核对公开 JSON、双语详情、metadata、截图和媒体地址；必要时全量 GET 新视频并比对 hash。

## 内容验证（2026-11-06）

本轮新增开顶天文台、海岸浑天仪、山村水车、怪兽卡车、小行星足球场和 Blender 鸡脚屋六件作品，原帖发表于上海时间 11 月 4—6 日。当前为 443 条 Astra 案例、12 条方法参考、119 个源码 / 工程入口、132 个演示入口与 228 段完整录像。本轮没有新增公开工程或试玩地址，应用代码和依赖不变。

| 核查 | 实际结果 |
| --- | --- |
| 来源与收录 | 六条 X 原帖完整 GET，作者、精确时间与同帖媒体 ID 一致；六张成果封面完整下载、解码和目视检查。正文标明 Astra 在对比画面中的位置，鸡脚屋保留作者对屋顶衔接的批评。卡车帖的订阅支出没有误记为单次生成费用。 |
| 跨平台检索 | 搜索 X、GitHub、Reddit、Bilibili、小红书和作者网站。机械蛇、章鱼的画面注明摆拍对比或概念示意，排除；室内模型案例页未明确 GPT-6 归属，暂缓。转载森林视频未匹配到原始作品，不重复收录。受限平台和未采用线索记录于研究资料。 |
| 完整录像 | 六段各保留最高码率原版与平台提供的较小完整播放版，共 12 个 MP4、62,127,231 字节。MIME、长度、来源时长、媒体 ID、SHA-256 与 `ffmpeg -v error -xerror -err_detect explode -i FILE -f null -` 全长解码均通过，无裁剪或转码。`py -3.13 work/2026-11-06/publish-media.py` 核对 [Release](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-11-06) 的 12 个附件尺寸和服务器摘要。 |
| 本地浏览器 | 六段播放文件均用原生控件从 0 播至 ended，媒体错误为空、readyState 为 4。播放器时长依次为 12、12、20、25.045333、17.045333、26.819048 秒。首页、手机及播放检查的控制台警告 / 错误均为 0。1440、390、320 像素视口没有横向溢出，英文切换保留视频筛选，清除材料筛选有效。部署前旧 hash 弹窗的公开视频尚未上线，正确回退至成果图，发布后另验。 |
| 实拍与旧素材 | 更新双语 README 的六张成果预览和对应语言详情链接，替换四张浏览器原生实拍并同步分享图。旧图抽样 20 张：19 张位图全解码，1 张 SVG 完整获取、解析并在浏览器确认显示；5 段旧视频的 Pages / Release 共 10 个端点的 MP4 头及清单长度匹配，未作旧片全长播放或全库复查。 |
| 命令与构建 | `npm run catalog` 同步 455 条记录；`npm run check` 通过 27 项测试、数据与 TypeScript 校验，`npm run lint` 通过。普通 `npm run build` 与设置 `GITHUB_PAGES=true` 后的构建均验证 944 个静态页、20,262 条本地引用、455 份详情 JSON 与 945 个 sitemap 地址。保留既有 chunk 体积、plugin timing 和 Node shell API 弃用警告。 |
| 增量边界 | `py -3.13 work/2026-11-06/verify-diff.py` 确认原有 449 条记录、444 个录像版本与历史研究 / 审计不变，应用代码、依赖、工作流、专题和演示审计无修改。双语图片跳转与截图引用一致。 |

详细下载和浏览器证据仅保留于忽略目录 `work/2026-11-06/`。原片归档在 Release，没有向 Git 提交 MP4、调研全文、缓存、上游源码或迁移说明；不重新部署 ChatGPT Sites。

## 内容验证（2026-11-05）

本轮收录海湾水母、钟楼铜钟、道路地毯赛车、光剑走廊和官方设备外壳图纸五件作品，来源发表于 11 月 3—5 日。当前为 437 条 Astra 案例、12 条方法参考、119 个源码或工程入口、132 个演示入口与 222 段完整录像。本轮未新增公开工程或试玩地址。

| 核查 | 结果 |
| --- | --- |
| 来源与模型 | 四条 X 原帖完整获取，作者、精确时间和媒体 ID 与同帖元数据一致；四张封面及官方 PNG 图纸完整获取、解码并目视核对。官方文章可通过网页读取，本地直接 HTTP 返回 403，如实记录。首发、收录和核查日期分开。 |
| 收录边界 | 保留赛车作者的负面反馈，游戏素材来源不明处保持未知。机械水母候选明确写着概念示意、非模型评测，未采用；街区长视频的原始创作者未确认，暂缓。只有材质或代码、没有成果预览的新仓库未收入展示库。 |
| 完整录像 | 四段各取最高码率原版和平台较小的完整播放版，共 8 个 MP4、57,710,856 字节。MIME、长度、来源时长、媒体 ID、SHA-256 与严格 FFmpeg 全长解码均通过，无剪辑或转码。`py -3.13 work/2026-11-05/publish-media.py` 核对 [Release](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-11-05) 的八个附件尺寸与服务器摘要。 |
| 本地浏览器 | 四段播放文件均用原生控件从 0 播至 ended，媒体错误为空；播放器报告时长分别为 20、20、67.456、12.051156 秒。1440、390、320 像素视口无横向溢出，页面与视频检查的控制台警告、错误均为 0。英文切换保留视频筛选，清除材料筛选正常。部署前旧 hash 弹窗的视频地址尚未上线，正确回退成果图，发布后另行核验。 |
| 实拍与存量 | 双语 README 更新五张成果预览及对应语言详情链接，替换四张真实网站实拍并同步分享图。旧图抽样 20 张：19 张位图完整解码，1 张 SVG 完整获取、XML 解析并在浏览器确认显示。5 段旧视频的 Pages / Release 共 10 个端点文件头及清单长度匹配，未作旧视频全长播放或全库复查。 |
| 命令与构建 | `npm run catalog` 同步 449 条记录；`npm run check` 通过 27 项测试、数据和 TypeScript 校验，`npm run lint` 通过。普通 `npm run build` 与 `GITHUB_PAGES=true npm run build` 均验证 932 个静态页、20,010 条本地引用、449 份详情 JSON 与 933 个 sitemap 地址；仍有既有 chunk 体积与 Node shell API 弃用警告。 |

脚本、下载和详细浏览器证据仅保留于忽略目录 `work/2026-11-05/`；视频位于 Release，未提交 MP4、缓存、上游源码或迁移说明。应用代码和依赖不变。`py -3.13 work/2026-11-05/verify-diff.py` 确认原有 444 条记录、436 个录像版本及历史审计逐字段不变，双语新增预览链接与截图引用一致。


内容提交 `715b3d4` 经 [PR #5](https://github.com/carpentry-liu/awesome-astra-3d/pull/5) 合入，[Pages 工作流](https://github.com/carpentry-liu/awesome-astra-3d/actions/runs/41950680203)成功。`py -3.13 work/2026-11-05/verify-production.py` 的 39 项部署后核验全部通过：线上 449 条 JSON 与事实源一致，覆盖五件作品的中英详情与 JSON、首页、sitemap、五张预览、四张仓库截图、分享图、双语 README 和视频清单；四个 Pages 播放文件完整 GET 后的字节数与 SHA-256 匹配，四个 Release 原版端点的 MP4 头与长度匹配。`verify-rendered.py` 另核对 GitHub 实际渲染的中英文 README 各五张新预览及详情链接，并完整获取、解码五张实际服务的图片。

公开首页在浏览器初次读取时显示新统计，后续页面读取超时，因此播放器复查改用本地生产页面加载实际公开 MP4。水母片段从 0 播至 20 秒 ended、readyState=4、媒体错误为空，原先的未部署回退已消失。其余三段线上视频以完整 GET/hash 与已通过本地全长播放的文件对照，未表述为线上四段浏览器复播。ChatGPT Sites 未重新部署。详细记录保留在 `work/2026-11-05/`。

## 内容验证（2026-11-02）

本次收录 6 件作品。按上海时间，机器人冰壶工程和赛道跑车发表于 11 月 2 日。微缩城市首轮发表于 11 月 1 日，次日增加第二段对照录像，两段合为一件作品。熊猫外卖、Brain Jelly 和海带森林发表于 11 月 1 日。

| 核查 | 结果 |
| --- | --- |
| 模型和出处 | 冰壶作者的首个公开提交、模型披露、Python 入口及结果截图均已核对。作者说明 Astra 与 Sol 共同辅助开发，冰面参数由另一个回归模型估计。五件 X 作品对应六条原帖，作者、来源时间、媒体 ID 与画面标签均匹配。 |
| 提示词与演示 | 微缩城市、果冻脑有作者公开的任务，熊猫原帖左上角展示共用提示词。果冻脑的作者回复列出 Astra 专属演示。外站 HTML 完整返回 200，在本地浏览器打开相同文件能切换为青柠色并触发放电反馈。外站浏览器直连检查超时。 |
| 录像 | 六段原帖各取最高码率原版和一个较小的完整平台版，共 12 个 MP4、73,429,264 字节。核对来源标识、长度、时长与 SHA-256，逐份严格全长解码成功。`py -3.13 work/2026-11-02/publish-media.py` 核对了 [Release](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-11-02) 的全部附件尺寸和服务器摘要。 |
| 浏览器与实拍 | 六段录像在本地案例页均从 0 播到结尾，媒体错误为空。城市的第一段标出 Astra 在左下，第二段标出在右下，弹窗两组地址与封面均匹配。桌面 1440、手机 390 和窄屏 320 像素均无横向溢出，所测页面控制台无警告或错误。中英文 README 更新了新作链接与四张实拍，分享图使用同一张首页截图。 |
| 旧素材抽样 | 完整下载并解码 20 张旧图，5 段旧录像的 10 个端点核对了 MP4 文件头和清单长度。CRISPR 案例有两段录像，第一次抽样错配了清单行。按具体录像重查后，第一段在 Pages 和 Release 的播放版全部字节均与清单一致。 |
| 构建 | `npm run catalog` 同步 438 条记录。`npm run check` 通过 27 项测试、数据与 TypeScript 校验，`npm run lint` 通过。普通构建和 `GITHUB_PAGES=true npm run build` 均通过 910 个静态页、19,548 个本地引用、438 份详情 JSON 和 911 个 sitemap 地址的校验。 |

内容提交 `04cf0af` 通过 [PR #3](https://github.com/carpentry-liu/awesome-astra-3d/pull/3) 合入，[GitHub Pages 发布成功](https://github.com/carpentry-liu/awesome-astra-3d/actions/runs/41378351199)。`py -3.13 work/2026-11-02/verify-production.py` 对公开站和仓库执行了 48 项检查。六份线上播放文件完整下载后的 SHA-256 与归档相同，两种语言的 12 个详情页和两段城市录像各自的链接均已核对。浏览器从本地案例弹窗直接请求六个已部署的 Pages 视频地址，六段均从 0 播到结尾，媒体错误为空。`verify-rendered.py` 另在 GitHub 实际渲染的中英文 README 各核对了六张图片的跳转目标，并完整获取、解码了六张预览。

## 内容验证（2026-10-31）

按上海时间，天台晾衣发表于 10 月 31 日，红树林、雪岛缆车、暮色渔船和机械颌骨发表于 10 月 30 日，果冻绿洲发表于 10 月 28 日。六件作品均于 10 月 31 日收录。当前共 420 条 Astra 案例、12 条方法参考、118 个源码或工程入口、131 个演示入口和 206 段完整录像。

| 核查 | 结果 |
| --- | --- |
| 来源和画面 | 六条 X 原帖的作者与时间都与同帖元数据吻合，六张封面完整下载、解码并核对模型位置。果冻绿洲采用作者标明 Astra 在左栏的双栏录像。红树林的作者回复给出了 Astra 专属演示和完整任务，演示 HTML 完整返回 200，交互检查超时。乐高候选的片段与模型对应关系仍不明确，暂缓收录。 |
| 视频归档 | 先下载六段原帖的最高码率和较小播放版，共 12 份 MP4、100,068,017 字节。逐份核对媒体 ID、大小、时长与 SHA-256，严格 FFmpeg 全长解码通过。雪岛原版的整文件下载与 26 段连续字节范围重组结果相同。所有附件与 [Release](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-10-31) 的服务器大小和摘要相符。 |
| 浏览器 | 在本地生产构建用原生控件从头播放六段录像，均到达结尾，媒体错误为空。桌面六张新增卡片图与六张精选图全部加载。390 和 320 像素宽度均无横向溢出，手机视频筛选与清除、英文入口正常。所查首页、手机页及六个详情页的控制台 error / warn 均为零。README 四张实拍和分享封面同步更新。 |
| 旧素材抽样 | 完整获取并解码 20 张旧图。5 段旧录像在 Pages 与 Release 的 10 个端点均返回 MP4 文件头及清单对应的总长度。 |
| 本地命令 | `npm run catalog` 生成目录与公开索引。`npm run check` 验证 432 条数据、24 项行为测试及 TypeScript，`npm run lint` 通过。普通构建和设置 `GITHUB_PAGES=true` 后的 `npm run build` 均验证 896 个静态页、19,208 条本地引用、432 个详情 JSON 和 897 项 sitemap。 |

内容提交 `3ce6aa2c1cf0973255595f28b6b16c54f758860e` 的 [GitHub Pages 工作流](https://github.com/carpentry-liu/awesome-astra-3d/actions/runs/41182286064)已成功部署。`py -3.13 work/2026-10-31/verify-production.py` 的 47 项线上检查通过。六份 Pages 播放文件完整下载后的 SHA-256 与本地播放版一致，六个原版下载入口的 MP4 文件头与总长度正确，12 个 Release 附件的服务器摘要均与归档一致。线上浏览器打开播放器超时，全长播放记录取自本地生产构建。`py -3.13 work/2026-10-31/verify-rendered.py` 从 GitHub 实际渲染的中英文 README 分别核对了六个图片跳转目标，并完整获取和解码了 GitHub 页面使用的六张预览。

## 内容验证（2026-10-30）

实测日期为 2026-10-30（Asia/Shanghai）。新增 **3 件作品、2 段完整 X 录像和 1 个演示入口**：冰湖极光、三维叠骑与阿尔卑斯湖泊。当前共 426 条记录，其中 **414 条 Astra 案例**、12 条方法参考，含 118 条源码 / 工程入口、130 个演示入口和 200 段完整录像。作品发表于 10 月 27—28 日；10 月 30 日是本库收录与核查日期。

| 检查 | 实际命令与结果 |
| --- | --- |
| `npm run catalog` | 从 426 条事实源生成双语目录、README 统计、公开 JSON 和 sitemap |
| `npm run check` · `npm run lint` | 426 条数据、24 项行为测试、TypeScript 与 lint 通过 |
| `npm run build` | 普通构建通过：884 静态页、18,956 条本地引用、426 详情 JSON 和 885 项 sitemap；既有 chunk 体积、plugin timing 与 Node 包装告警保留 |
| 设置 `GITHUB_PAGES=true` 后 `npm run build` | GitHub Pages 子路径构建通过，检查范围与普通构建一致 |
| 来源与预览 | 两条 X 原帖完整 GET，其作者、时间与同帖辅助元数据一致；极光平台提供明确的 Astra 成果图。三张预览完整 GET、解码及目视检查通过；极光演示入口 GET 200，浏览器访问超时，未独立试玩 |
| 完整录像 | 两帖各保留平台最高码率原版及较小的完整播放版，共 4 个 MP4、23,816,842 字节；核对原帖媒体 ID、时长、长度和 SHA-256，严格 FFmpeg 全长解码通过，无剪辑或转码。四个 [Release](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-10-30) 附件服务器大小与 digest 匹配 |
| 浏览器播放 | 内置浏览器在本地生产构建中通过原生控件从头播放两段录像至结尾，时长分别为 41.05 和 25.05 秒，`ended` 为 true、`error` 为空、`readyState` 为 4；两页控制台 error / warn 均为零 |
| 旧素材抽样 | 最新 10 张及分散的 10 张旧图完整 GET 和解码通过；5 条旧视频的 Pages 与 Release 共 10 个端点 MP4 头和总长度匹配。这是抽样与范围请求，不代表旧视频全长播放或全库复查 |
| 页面与截图 | 首页、案例区与详情页使用 1440×1100 桌面视口，手机首页使用 390×844 视口，检查时无页面横向溢出；首页六张精选图、新增卡片图和详情图可加载。首页、详情和视频页控制台 error / warn 均为零。四张实拍与 `public/share.jpg` 已更新，临时视口已恢复 |
| 归属与限制 | 高山湖泊帖子写 Astra 成本 45 美元，视频末帧为 46 美元，未将其作为独立性能结论；Blender MCP 栏未推断模型。另一果冻绿洲对照常用封面属于 Claude，Astra 图返回 500，故暂缓收录 |

内容提交 `8df4c836cf624044a2e5cdf9cb4260925f0ed13a` 的 [GitHub Pages 工作流](https://github.com/carpentry-liu/awesome-astra-3d/actions/runs/40985637890)成功。部署后执行 `python work/2026-10-30/verify-production.py`，25 项完整 GET 和内容 / hash 核验通过，覆盖线上首页、目录、sitemap、三件案例的中英文详情与 JSON、两份播放视频、三张预览、分享封面、四张仓库截图和双语 README / 视频清单。四个 Release 附件的服务器大小与 SHA-256 digest 另经 GitHub 接口核对一致。线上视频验证为完整下载与 hash 比对，浏览器全长播放在本地生产构建完成；案例库 ChatGPT Site 未重新部署。

## 精选入口调整与核查（2026-10-29）

中英文 README 与网站精选换入入画 WITHIN、CityMaker、深圳雨夜市集和 Embryo Explorer，保留 Jetis 与五个三维故事。标题和图片直接链接作者演示，另保留作品档案；README 增加源码入口。深圳夜市的 Blender 成果图与 Three.js 演示明确区分。未改案例事实源、视频或收录数量。

本地临时脚本 `py -3.13 work/spotlights-2026-10-29/check-candidates.py` 对候选作品完整 GET；`py -3.13 work/spotlights-2026-10-29/verify-selection.py` 检查最终六项与双语 README 的对应关系、补核英文档案。六个作者演示入口、六张预览图及中英文各六个本站档案均返回 200；图片完整解码，六个源码仓库经 GitHub 接口确认为公开。GET 成功只证明入口响应，不能证明所有三维交互可运行。临时核查脚本和下载缓存未提交。

本地生产构建的内置浏览器核对六张图均加载，六组图片、标题和演示链接指向对应作者地址，档案入口实际打开案例详情。点击 CityMaker 标题后新标签页显示其作者域名与页面标题；内置浏览器读取外站三维页面超时，本轮未完整试玩这六个演示。中文桌面 1440×1100、中文与英文手机 390×844 无页面横向溢出，本地首页控制台 warn/error 均为零。重新拍摄桌面首页及手机首页，JPEG 原样保存；`public/share.jpg` 与首页截图字节一致。

执行 `npm run check`（423 条记录、24 项测试与 TypeScript 通过）、`npm run lint`、`npm run build`，以及设置 `GITHUB_PAGES=true` 后的 `npm run build`；普通构建和 Pages 构建各校验 878 静态页、18,830 条本地引用、423 详情 JSON 和 879 项 sitemap。既有 chunk 体积、插件耗时及 Node 包装告警仍存在。

内容提交 `0bff38701e93a3489916fb123e08b8c72606cde6` 的 [GitHub Pages 工作流](https://github.com/carpentry-liu/awesome-astra-3d/actions/runs/40832629129)成功。部署后运行临时脚本 `py -3.13 work/spotlights-2026-10-29/verify-public.py`：公开 GitHub 渲染的 README 六组图片、标题、档案和源码链接对应正确；线上首页六组演示和档案地址与事实源一致；线上分享封面完整 GET 的 SHA-256 与本地相同。此检查不代表外站已完整试玩。

## 内容验证（2026-10-29）

实测日期为2026-10-29（Asia/Shanghai）。新增 **4件作品、2段完整X录像、1条源码和2个演示入口**：入画WITHIN、暴风雨灯塔、火箭发射回收与MOXstrike。当前423条记录包括 **411条Astra案例**与12条方法参考，保留118条源码/工程入口、129个演示入口和198段归档录像。两条X原帖上海日期为10月27、28日；两个项目首次发布日期未核实，保持null；10月29日是收录与核查日期。MOXstrike的模型归属按转引待复核标记。

| 检查 | 实际命令与结果 |
| --- | --- |
| `npm run catalog` | 从423条事实源同步中英文README统计、目录、公开JSON与sitemap |
| `npm run check` · `npm run lint` | 423条数据、24项行为测试、TypeScript与lint通过 |
| `npm run build` | 普通构建通过：878静态页、18,830本地引用、423详情JSON与879项sitemap；既有chunk体积、plugin timing和Node包装告警保留 |
| 设置 `GITHUB_PAGES=true` 后 `npm run build` | 子路径构建通过：878静态页、18,830本地引用、423详情JSON与879项sitemap，含10月29日分享封面 |
| 来源与模型归属 | 两条完整X HTML的作者和时间与精确同帖元数据一致，录像保留各模型位置；作者对照与成本说法不是独立基准。WITHIN投稿账号与仓库所有者均为fatasia；MOXstrike投稿署名与提交账号之间的关系未独立核实 |
| 工程、演示与成果图 | WITHIN原仓库README完整GET且Git blob SHA与连接器一致；两处作者演示入口完整GET200，不等于独立试玩。四张成果预览完整GET、Pillow解码及目视检查通过，图像由原作者仓库、原帖或投稿提供 |
| 完整录像 | 两帖×最高码率原版/较小完整平台版，共4个MP4、25,333,366字节。来源标示12秒和38秒，总共50秒；媒体探测时长与来源均相差小于0.2秒。完整GET、MIME/长度/媒体ID/SHA-256核对，严格FFmpeg全长解码exit0且stderr空，无剪辑或转码；四个Release视频附件服务器size/digest匹配 |
| 旧素材抽样 | 最新30加其余分散10，共40张旧图全帧解码通过；10个旧视频在Pages/Release共20端点的MP4头和总长度匹配。无待解决失效、未下架；不是全库复查，也不是旧视频全长播放证明 |
| 真实浏览器完整播放 | 内置浏览器打开普通生产构建，两份经hash核对的本地播放文件由原生控件完整播放至ended，error为空、readyState为4；播放结束时间12秒与38秒。线上文件在部署后另行完整GET/hash核验 |
| 页面与控制台 | 首页/案例区1440×1100、手机首页/案例区390×844均无横向溢出；桌面四张新卡片图及画馆详情图正常加载。手机案例区第四张图在检查时尚未进入懒加载范围；首页、手机、详情和两个视频页console error/warn均0，临时视口已恢复 |
| 截图与分享封面 | 重新拍摄首页、案例区、手机首页与画馆详情，原生JPEG逐字节保存，无裁剪、重编码或修饰；桌面捕获1425×1057、手机375×812。中英README和share.jpg同步；替换10月28日的四张实拍，历史观察路径和hash保留，旧图可从Git历史恢复 |
| 基线与仓库边界 | 上一版419案例与相对顺序、392视频及旧研究/媒体/链接审计不变，演示审计只追加2条。4个视频的hash、Release digest、媒体ID和original/web映射通过；公开JSON一致，不提交下载、原始录像、作者全文、调研脚本、缓存或迁移说明 |

录像见[10月29日Release](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-10-29)。内容提交 `3f5d78bc7e2654cdfcb6b6320cdd79a5b79e4269` 已推送；[GitHub Pages工作流](https://github.com/carpentry-liu/awesome-astra-3d/actions/runs/40797396988)成功。部署后29项完整GET与hash核验通过，覆盖线上首页、目录、sitemap、四个案例的中英详情与JSON、两份播放视频、四张预览、分享封面、四张仓库截图和中英文README/视频清单；4个Release附件服务器digest匹配。本地浏览器完成两段视频全长播放和响应式检查；本轮线上以HTTP与GitHub接口核对，未作线上浏览器完整播放。案例库ChatGPT Site未重新部署。

## 小王子制作流程复核（2026-10-18）

本轮仅补核既有 `sac-little-prince-explorable-game` 的制作过程，不增加案例、录像或宣传指标。核对[作者流程帖](https://x.com/Saccc_c/status/2110694725640474759)与当前文章文本，并实际查看署名转载提供的场景多视角参考、角色四视图和持壶绑定截图。前两类是制作输入，未作为新案例成果或媒体提交。Astra仍只归于作者明确的迭代优化与修复；当前原文没有转载中的独立agent盲审句，未将其归为作者原话。未取得可核验的公开小王子工程，仓库字段保持空。

实际运行 `npm run catalog`、`npm run check`、`npm run lint`、`npm run build`，以及设置 `GITHUB_PAGES=true` 后的 `npm run build`，均通过：24项行为测试、TypeScript、764静态页、16,394本地引用、367详情JSON与765项sitemap。独立差异核查确认另外366条案例逐字段不变、视频清单完全不变，首发与初次收录日期保持原值。仅修改案例事实、研究记录及相应生成数据，无UI代码或截图变化；作者全文、研究图片、本地脚本和原创项目制作方案均不上传此仓库。

## 对外引用

分享时使用当前统计与真实截图，保留作品名、原作者和来源链接；自己的练习建议不能当成原作者提示词或已经执行的实验。公开可看和署名不等于取得再发布许可。现阶段无网站点击分析系统，不虚构访问量或转化率；GitHub 流量与 Star 比较须使用相同观察窗口，不据累计数字归因于某篇帖子。
