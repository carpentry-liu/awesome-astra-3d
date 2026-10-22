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

实测日期为2026-10-22（Asia/Shanghai）。新增 **4件此前未收录作品、4段完整X录像**：Blender瓶中风暴、弩箭动画、夜空浮岛，以及Three.js雨林缸。当前389条记录包括 **377条Astra案例**与12条方法参考，保留112条源码/工程入口、121个演示入口和171段归档录像。四例是今天补充收录，首次发布为10月19日、18日和13日；没有把收录日当首发。

| 检查 | 实际命令与结果 |
| --- | --- |
| `npm run catalog` | 从389条事实源同步双语README统计、目录、公开JSON及sitemap |
| `npm run check` · `npm run lint` | 389条数据、24项行为测试、TypeScript与lint通过 |
| `npm run build` | 普通构建通过：808静态页、17,318本地引用、389详情JSON与809 sitemap URL；既有chunk体积及Node包装告警保留，未扩大为代码重构 |
| 设置 `GITHUB_PAGES=true` 后 `npm run build` | Pages子路径构建通过：808静态页、17,318本地引用、389详情JSON与809 sitemap URL |
| 原帖与归属 | 四条原作者完整HTML和精确同帖辅助元数据的作者/时间/媒体ID一致。瓶中风暴与弩箭Astra在左，浮岛Astra在右；雨林缸由Astra实现，Opus负责编排、美术与声音设计。没有采用只有产品名或仓库名Astra的工程，也没有重复收录fork和转载 |
| 新增完整录像 | 4帖×最高码率原版/较小完整平台版，共8个MP4、99,152,331字节。来源25/51.2/26/25秒，文件约25.05/51.24/26.05/25.05秒；误差均小于0.2秒。全部完整GET、MIME/长度/hash/媒体ID核对，并严格FFmpeg全长解码exit0且stderr空，未剪辑或转码。八附件服务器size/digest均匹配 |
| 新增成果预览 | 四张原封面完整GET、Pillow解码和目视通过，另查看四段录像中帧。雨林缸原封面暗，改用原版25.6秒处1920×1080实际帧；305,272字节、SHA-256记录，Release服务器digest及发布后完整GET/hash/解码一致。图注明来源与时间；媒体不进入Git或MIT |
| 历史素材抽样 | 最新30加其余分散10，共40张成果图完整GET200、所有图帧实际解码与长度核对通过；10个旧视频的Pages/Release共20端点可达、MP4头和总长度与清单匹配。无待解决失效，未下架案例；不是全库复查或旧视频全长播放证明 |
| 基线差异核对 | 旧385案例逐字段及相对顺序不变，旧334视频文件条目不变；只增加4例、8个视频文件、截帧与本轮证据。公开JSON一致，新媒体实际字节/hash重算及original/web映射通过，无本机路径、凭据、临时签名URL或完整原作者文章进入新增案例 |
| README成果图与截图边界 | 中英文README增加四件第三方成果预览与新目录/统计。四张网站实拍及share.jpg与基线逐字节一致，继续标注10月21日；没有改日期冒充今日重拍 |
| 浏览器验证限制 | Computer Use在Chrome窗口识别时被安全检查停止：无法可靠确定当前Windows浏览器URL。没有继续UI输入或改用其他自动化绕过。未完成本轮桌面/手机实拍、控制台和浏览器播放；FFmpeg全长解码不记作浏览器播放。网站界面代码未更改，线上文件验证另行执行 |

本轮媒体发布至[10月22日Release](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-10-22)，包含八个完整MP4和一张有来源的实际截帧。内容提交 `574d2cf` 已推送至main，[Pages工作流](https://github.com/carpentry-liu/awesome-astra-3d/actions/runs/39733198331)检查、构建、全部171段播放文件下载校验与部署成功。发布后28项完整GET核对全部通过：389条公开目录、首页统计、809项sitemap、4条详情JSON、8个双语详情、4段新增MP4、实际截帧、既有四张网站实拍、分享封面及双语README/视频清单；详情同时核对canonical、语言、作者和来源。新MP4及截帧完整字节和SHA-256一致，Release九附件尺寸/digest核对通过。RAW文件按发布提交Git blob逐字节比较。

本轮没有浏览器播放、控制台或新网站实拍证明，不以HTTP或FFmpeg结果替代。截图继续标注10月21日，README另展示已核验的四件第三方成果。不重新部署案例库ChatGPT Site，不提交迁移说明、缓存、媒体下载或本地核查脚本。

## 小王子制作流程复核（2026-10-18）

本轮仅补核既有 `sac-little-prince-explorable-game` 的制作过程，不增加案例、录像或宣传指标。核对[作者流程帖](https://x.com/Saccc_c/status/2110694725640474759)与当前文章文本，并实际查看署名转载提供的场景多视角参考、角色四视图和持壶绑定截图。前两类是制作输入，未作为新案例成果或媒体提交。Astra仍只归于作者明确的迭代优化与修复；当前原文没有转载中的独立agent盲审句，未将其归为作者原话。未取得可核验的公开小王子工程，仓库字段保持空。

实际运行 `npm run catalog`、`npm run check`、`npm run lint`、`npm run build`，以及设置 `GITHUB_PAGES=true` 后的 `npm run build`，均通过：24项行为测试、TypeScript、764静态页、16,394本地引用、367详情JSON与765项sitemap。独立差异核查确认另外366条案例逐字段不变、视频清单完全不变，首发与初次收录日期保持原值。仅修改案例事实、研究记录及相应生成数据，无UI代码或截图变化；作者全文、研究图片、本地脚本和原创项目制作方案均不上传此仓库。

## 对外引用

分享时使用当前统计与真实截图，保留作品名、原作者和来源链接；自己的练习建议不能当成原作者提示词或已经执行的实验。公开可看和署名不等于取得再发布许可。现阶段无网站点击分析系统，不虚构访问量或转化率；GitHub 流量与 Star 比较须使用相同观察窗口，不据累计数字归因于某篇帖子。
