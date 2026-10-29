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

## 精选入口调整与核查（2026-10-29）

中英文 README 与网站精选换入入画 WITHIN、CityMaker、深圳雨夜市集和 Embryo Explorer，保留 Jetis 与五个三维故事。标题和图片直接链接作者演示，另保留作品档案；README 增加源码入口。深圳夜市的 Blender 成果图与 Three.js 演示明确区分。未改案例事实源、视频或收录数量。

本地临时脚本 `py -3.13 work/spotlights-2026-10-29/check-candidates.py` 对候选作品完整 GET；`py -3.13 work/spotlights-2026-10-29/verify-selection.py` 检查最终六项与双语 README 的对应关系、补核英文档案。六个作者演示入口、六张预览图及中英文各六个本站档案均返回 200；图片完整解码，六个源码仓库经 GitHub 接口确认为公开。GET 成功只证明入口响应，不能证明所有三维交互可运行。临时核查脚本和下载缓存未提交。

本地生产构建的内置浏览器核对六张图均加载，六组图片、标题和演示链接指向对应作者地址，档案入口实际打开案例详情。点击 CityMaker 标题后新标签页显示其作者域名与页面标题；内置浏览器读取外站三维页面超时，本轮未完整试玩这六个演示。中文桌面 1440×1100、中文与英文手机 390×844 无页面横向溢出，本地首页控制台 warn/error 均为零。重新拍摄桌面首页及手机首页，JPEG 原样保存；`public/share.jpg` 与首页截图字节一致。

执行 `npm run check`（423 条记录、24 项测试与 TypeScript 通过）、`npm run lint`、`npm run build`，以及设置 `GITHUB_PAGES=true` 后的 `npm run build`；普通构建和 Pages 构建各校验 878 静态页、18,830 条本地引用、423 详情 JSON 和 879 项 sitemap。既有 chunk 体积、插件耗时及 Node 包装告警仍存在。

## 最近一次内容验证

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
