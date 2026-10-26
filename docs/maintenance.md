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

实测日期为2026-10-26（Asia/Shanghai）。新增 **5件作品、4段完整X录像、1条公开工程、1个Astra试玩和2个完整任务入口**：Feira Livre巴西集市、Launch Jelly、Jelly Eyeball、大峡谷连续飞行和三维手柄。当前409条记录包括 **397条Astra案例**与12条方法参考，保留115条源码/工程入口、125个演示入口和188段归档录像。X原帖上海日期为10月24、25日；集市首发未核实，保持null，今天是收录日期。

| 检查 | 实际命令与结果 |
| --- | --- |
| `npm run catalog` | 从409条事实源同步中英文README统计、目录、公开JSON与sitemap |
| `npm run check` · `npm run lint` | 409条数据、24项行为测试、TypeScript与lint通过 |
| `npm run build` | 普通构建通过：850静态页、18,242本地引用、409详情JSON与851项sitemap；既有chunk体积、plugin timing和Node包装告警保留，未扩大为代码重构 |
| 设置 `GITHUB_PAGES=true` 后 `npm run build` | 子路径构建通过：850静态页、18,242本地引用、409详情JSON与851项sitemap，含10月26日新分享封面 |
| 原帖与模型归属 | 四条完整X HTML的作者和时间与精确同帖元数据一致。太空港Astra在下栏，眼球在上栏；大峡谷取Astra原帖2114033292999630853，没有收入晚间引用它的Opus录像，音乐另归Suno。手柄只取第二段媒体2113878802451292160，未把第一段Kimi当作Astra |
| 工程、试玩与任务 | Feira Livre非fork，作者README与MIT许可完整GET，Git blob SHA分别为681c203be9c7f342904c6c3f8fd87e240715e3c8和8b33e5b402f902b8bea13253c4b0987f39a2f426，与连接器一致。作者只列Astra，具体档位未填。Launch Jelly两条评论同作者、同根帖与时间匹配；Astra试玩完整GET200、142,339字节，标题匹配。未执行Godot工程或独立复现第三方试玩 |
| 完整录像 | 四帖×最高码率原版/较小完整平台版，共8个MP4、109,187,010字节。来源18/42.6/171.734/20.1秒，共约252秒；文件probe约18.05/42.6/171.78/20.1秒，误差均小于0.2秒。完整GET、MIME/长度/媒体ID/SHA-256核对，严格FFmpeg全长解码exit0且stderr空，无剪辑或转码；八附件服务器size/digest匹配 |
| 预览与实际截帧 | 五件成果预览完整GET、hash/Pillow解码与目视通过，Godot GIF全部192帧、约12.8秒。两个暗封面换为最高码率完整原版21.3秒与85.89秒实际整帧，无裁剪或修饰，额外两JPEG的来源、字节与digest匹配。Release下载头为通用binary，实际JPEG解码、完整hash与浏览器加载分别确认，未伪称image MIME |
| 旧素材抽样 | 最新30加其余分散10，共40张旧图全帧解码通过；10个旧视频在Pages/Release共20端点的MP4头和总长度匹配。无待解决失效、未下架；不是本轮全库复查，也不是旧视频全长播放证明 |
| 真实浏览器完整播放 | 内置浏览器打开普通生产构建，四个经hash核对的本地文件均由原生控件完整播放至ended，error为空，readyState为4；结束时间18.048/42.6/171.781224/20.1秒。约172秒长片实际完整播放，未跳播或仅核对首帧 |
| 页面与控制台 | 首页/案例区1440×1100、手机首页/案例区390×844均无横向溢出；六张可见作品图及详情实际截帧正常加载。英文切换保留Grand Canyon检索与唯一结果，未知查询显示真实空态，Clear filters后恢复36条首批卡片。图库、手机、详情及四个视频页console error/warn均0，临时视口已恢复 |
| 截图与分享封面 | 重新拍摄首页、案例区、手机首页与大峡谷详情，原生JPEG逐字节保存，无裁剪、重编码或修饰；桌面捕获1425×1089、手机375×812。中英README和share.jpg同步。仅删除已被替换且无当前展示引用的四张10月25日实拍；旧审计的观察路径与hash保留不变，对应旧图从Git历史恢复 |
| 基线与仓库边界 | 前一版本404案例与相对顺序、368视频、旧研究/媒体/链接审计及全局日期均不变，演示审计只追加1条。新8视频与2截帧的hash、Release digest、媒体ID和original/web映射通过；公开JSON一致、双语README只有一个最新预览块。不提交下载、原始录像、作者全文、调研脚本、缓存或迁移说明 |

录像与两张实际截帧见[10月26日Release](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-10-26)。发布目标继续为GitHub Pages，案例库ChatGPT Site不重新部署；正式提交、工作流与部署后GET/hash核对结果在发布完成后补录。

## 小王子制作流程复核（2026-10-18）

本轮仅补核既有 `sac-little-prince-explorable-game` 的制作过程，不增加案例、录像或宣传指标。核对[作者流程帖](https://x.com/Saccc_c/status/2110694725640474759)与当前文章文本，并实际查看署名转载提供的场景多视角参考、角色四视图和持壶绑定截图。前两类是制作输入，未作为新案例成果或媒体提交。Astra仍只归于作者明确的迭代优化与修复；当前原文没有转载中的独立agent盲审句，未将其归为作者原话。未取得可核验的公开小王子工程，仓库字段保持空。

实际运行 `npm run catalog`、`npm run check`、`npm run lint`、`npm run build`，以及设置 `GITHUB_PAGES=true` 后的 `npm run build`，均通过：24项行为测试、TypeScript、764静态页、16,394本地引用、367详情JSON与765项sitemap。独立差异核查确认另外366条案例逐字段不变、视频清单完全不变，首发与初次收录日期保持原值。仅修改案例事实、研究记录及相应生成数据，无UI代码或截图变化；作者全文、研究图片、本地脚本和原创项目制作方案均不上传此仓库。

## 对外引用

分享时使用当前统计与真实截图，保留作品名、原作者和来源链接；自己的练习建议不能当成原作者提示词或已经执行的实验。公开可看和署名不等于取得再发布许可。现阶段无网站点击分析系统，不虚构访问量或转化率；GitHub 流量与 Star 比较须使用相同观察窗口，不据累计数字归因于某篇帖子。
