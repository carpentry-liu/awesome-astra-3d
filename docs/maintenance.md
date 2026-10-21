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

实测日期为 2026-10-21（Asia/Shanghai）。新增 **7 件此前未收录作品、3 段完整 X 录像**：GPS连续三维教学、LUNA PARK、Meridian Wake、SketchUp本地MCP室内，以及果冻牛油果、幽灵和海洋泻湖模型对照。当前385条记录包括 **373条Astra案例**与12条方法参考，提供112条源码/工程入口、121个演示入口和167段归档录像。三条X首发为10月19日、SketchUp首发为17日；三项工程首发未知，保持null，未用仓库创建日期替代。

| 检查 | 实际命令与结果 |
| --- | --- |
| `npm run catalog` | 从385条事实源同步双语README自动区、目录、公开JSON与sitemap |
| `npm run check` · `npm run lint` | 385条数据、24项行为测试、TypeScript及lint通过。首次check在catalog进程结束前启动，索引同步断言失败；待生成完成后重跑全通过，没有修改测试绕过失败 |
| `npm run build` | 普通构建通过：800静态页、17,150本地引用、385详情JSON与801 sitemap URL。保留既有chunk体积与Node兼容包装告警，不作为浏览器错误 |
| 设置 `GITHUB_PAGES=true` 后 `npm run build` | Pages子路径构建通过：800静态页、17,150本地引用、385详情JSON与801 sitemap URL；真实交互证据来自前述普通生产构建 |
| 新增成果与归属 | 七张成果图完整GET、长度/hash、全图解码与目视通过，并在真实浏览器加载。GPS保留Terra几何/Sol review子代理；Meridian保留Endless Sky资料/音频上游，预览仅称实际标题场景；SketchUp同图纸但不同DCC的独立实测，不将其中阶段拆成新增作品。三项工程许可证分别核对，未统一改称MIT |
| 完整X录像 | 三帖×最高码率原版/较小完整平台版，共6文件、58,823,206字节。来源16/35.4/16秒，对应完整MP4约16.04/35.46/16.04秒，误差均小于0.2秒。核对媒体ID、MIME、Content-Length、SHA-256；严格FFmpeg全长解码exit0且stderr空，未剪辑或转码。Release六附件size/digest全部匹配 |
| 比较分栏 | 牛油果上Opus、下Astra；幽灵左Opus、右Astra；泻湖右下Astra，其他三格分别为Opus/Gemini/Sol。保留作者对Astra不足的评价，单次费用和耗时不当独立性能排名；Reef Lagoon与旧Ocean Shallows目视去重 |
| 真实浏览器播放 | 本地生产构建三个原生播放器以正常速度完整播放至35.456871、16.042667、16.042667秒，均ended=true、playbackRate=1、无媒体错误；检查对象为完整平台播放版，不是独立复现作者工程 |
| 双语、筛选和布局 | 英文LUNA PARK搜索1结果、未知词0结果，Clear filters恢复373结果并保留英文。中英文乐园独立详情标题、成果图与canonical核对。1440×1100和390×844实际视口均无页面横向溢出；首页、详情与播放页控制台无warning/error |
| 网站与GitHub实拍 | 四张10月21日原生浏览器截图替换旧图，README中英文日期、乐园详情链接及媒体说明同步；分享封面与首页截图字节一致。截图未生成、拼接或后期缩放，手机图来自实际390宽视口 |
| 历史媒体抽样 | 最新30加分散10，共40张成果图完整GET200、实际解码和响应长度一致；10个旧视频的Pages/Release共20端点均206，MP4头及总长度匹配清单，零失败/重试。两张octet-stream实际为有效JPEG，未误判。未发现需下架样本；这不是全库重查或旧视频完整播放证明 |
| 独立差异复核 | 旧378条案例逐字段及相对顺序不变，旧328视频文件条目不变；新增7例和6文件映射正确，公开JSON一致，未知首发3项保持null。新增内容未发现本机路径、凭据、临时签名URL或完整作者文章 |

完整录像已发布至[10月21日Release](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-10-21)。源码与Pages线上文件待本轮发布后核对，完成后补记真实提交和工作流。本轮不重新部署案例库ChatGPT Site，不把迁移说明、研究下载、MP4或本地核查脚本纳入Git。

## 小王子制作流程复核（2026-10-18）

本轮仅补核既有 `sac-little-prince-explorable-game` 的制作过程，不增加案例、录像或宣传指标。核对[作者流程帖](https://x.com/Saccc_c/status/2110694725640474759)与当前文章文本，并实际查看署名转载提供的场景多视角参考、角色四视图和持壶绑定截图。前两类是制作输入，未作为新案例成果或媒体提交。Astra仍只归于作者明确的迭代优化与修复；当前原文没有转载中的独立agent盲审句，未将其归为作者原话。未取得可核验的公开小王子工程，仓库字段保持空。

实际运行 `npm run catalog`、`npm run check`、`npm run lint`、`npm run build`，以及设置 `GITHUB_PAGES=true` 后的 `npm run build`，均通过：24项行为测试、TypeScript、764静态页、16,394本地引用、367详情JSON与765项sitemap。独立差异核查确认另外366条案例逐字段不变、视频清单完全不变，首发与初次收录日期保持原值。仅修改案例事实、研究记录及相应生成数据，无UI代码或截图变化；作者全文、研究图片、本地脚本和原创项目制作方案均不上传此仓库。

## 对外引用

分享时使用当前统计与真实截图，保留作品名、原作者和来源链接；自己的练习建议不能当成原作者提示词或已经执行的实验。公开可看和署名不等于取得再发布许可。现阶段无网站点击分析系统，不虚构访问量或转化率；GitHub 流量与 Star 比较须使用相同观察窗口，不据累计数字归因于某篇帖子。
