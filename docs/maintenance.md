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

实测日期为 2026-10-18（Asia/Shanghai），第二轮新增 **6 件此前未收录作品、3 段完整 X 录像**。连同当天首轮，10月18日共收录11件作品与5段完整录像。当前367条记录包括 **355条 Astra 案例**与12条方法参考，提供103条源码 / 工程入口、117个演示入口和160段归档完整录像。首发与收录日期分别记录；本轮3件X作品原始日期为10月15日和10月9日，中文论坛作品为9月5日，两项研究工程首发未知。

| 检查 | 实际命令与结果 |
| --- | --- |
| `npm run catalog` | 从367条事实源同步中英文 README 自动区、目录、更新记录、公开 JSON 与 sitemap |
| `npm run check` · `npm run lint` | 367条数据、24项行为测试、TypeScript 与 lint 通过 |
| `npm run build` | 普通构建通过；764静态页、16,394本地引用、367详情 JSON 与765 sitemap URL通过。用于交互浏览器检查的普通构建另复核一次，通过 |
| 设置 `GITHUB_PAGES=true` 后 `npm run build` | Pages 子路径构建通过，同样的页面、资源与 sitemap 校验通过。其绝对资源 base 指向生产站，不把尚未发布资源的 localhost 静态预览当作已完成交互检查 |
| 来源与成果 | 六件新增作品均有原作者证据、完整获取和解码的成果预览，真实浏览器六张新图全部加载。两项工程经原作者 API 和项目站核查；GitHub网页直取403、论坛本机原帖403等访问限制保留在资料中，不冒充成功。论坛图片来自原站CDN；不将10月17日DeepSeek关联帖的作品或日期归于Astra |
| 完整原帖录像 | 3段原片的最高码率原版与较小完整平台版，共6文件、208,214,248字节。MIME / Content-Length / 媒体ID / 来源时长 / SHA-256核对；实际命令 `ffmpeg -v error -xerror -err_detect explode -i FILE -f null -` 全长解码均exit0且stderr空，未剪辑或转码。3个浏览器原生播放器均以正常速度从头播放到结尾，`ended=true`、无错误 |
| 可查看的预览 | LUMEN ISLES默认封面为黑屏、747默认封面为空机库，改用完整原版第87秒和第57秒实际成果截帧。两张JPEG仅随媒体存Release，图注与研究资料保留原帖、时点和原片hash；不修改MP4，不将截帧冒充原作者发布的独立静帧 |
| 双语与响应布局 | 英文搜索、详情弹层和中英文独立详情实际核查；空搜索显示0结果并可清除。1440、390、320像素视口无页面横向溢出。交互首页及双语详情控制台无warning/error，媒体复核页也无告警或错误 |
| 网站与GitHub实拍 | 四张当前截图以真实浏览器重新拍摄，保留原生像素；双语README、详情链接与媒体说明同步。分享封面与首页截图逐字节相同；不新增重复截图、迁移说明或调研下载到代码仓库 |
| 数据边界与独立复核 | 361条旧案例逐字段与顺序不变，314个旧视频条目完全不变。本轮只追加6件案例、6个视频文件与2张截帧证据；未把本轮日期写成全库复查。单图重建未公开场景工程，故不计源码入口；Real2Gym项目介绍不计可交互演示 |

媒体已发布至[本轮 Release](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-10-18-second)，上传响应和发布后的附件清单尺寸 / SHA-256 digest一致。另一匿名重复查询遇API限流，未当作第二次独立服务器核验。内容发布与生产检查结果在实际部署完成后补记。本轮不部署 ChatGPT Site。

## 对外引用

分享时使用当前统计与真实截图，保留作品名、原作者和来源链接；自己的练习建议不能当成原作者提示词或已经执行的实验。公开可看和署名不等于取得再发布许可。现阶段无网站点击分析系统，不虚构访问量或转化率；GitHub 流量与 Star 比较须使用相同观察窗口，不据累计数字归因于某篇帖子。
