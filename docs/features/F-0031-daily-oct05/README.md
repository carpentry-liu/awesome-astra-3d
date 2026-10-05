# 10 月 5 日：近期工程与可见三维成果

## 范围与方案

从干净的 `05750b3` 开始，基线 252 条档案（240 Astra + 12 方法参考）、65 个工程入口、93 个演示入口、110 段完整录像。检索 GitHub、X、Reddit、Zenn、Qiita、Bilibili、小红书及原作者站，优先 10 月 4–5 日新作和此前待核查工程；保留真实首发日期或未知 null，今天只代表收录与核查。

仅收录原作者模型声明及实际可查看成品。混合模型与已有资产分别说明；提示词目标、计划、主观评分不能写成完成结果。复用现有目录和稳定六件精选，增量生成中英文数据、详情页、README 和真实截图；相比重做布局，本轮内容更新能保持既有导航与分享地址，易于通过 Git / Pages 回滚。

若确认新 X 视频，下载完整原版和完整播放版，核对源帖时长、字节、SHA-256 和全长解码后发布媒体 Release；没有合格片段则保留视频数量。图片引用原作者并保留许可边界，不把视频或报名页面算可交互演示。

执行 catalog、check、lint、普通与 Pages 构建，检查浏览器宽屏、手机、图片与控制台。只发布 GitHub Pages，不部署 ChatGPT 站点、不向社区发帖。原有内容和媒体在无新证据时保留，不扩展应用功能。

## 调研、验证与发布

收录五件去重档案：Moonlit Pajamas 睡衣人物、Tuxedo / MONO 两种折耳猫实现（合一条）、Pascualín 吹小号人物、Analisa.pt 议会改进及 Real2Sim 房间重建。日期未知仍为 null；9 月首次公开不包装成今天首发。RTS 仅仓库名含 Astra 但正文不足归属、Bilibili 两件只见讲解首帧、跨模型地球仅见封面，均不收录。GitHub、X、Reddit、Zenn、Qiita、LinkedIn、Bilibili、小红书、LINUX DO 和作者站的检索及排除理由追加在 `data/research.json`；没有声称所有平台、历史链接或工程完整复现。

统计更新为 257 条档案：245 Astra + 12 方法参考，68 个工程、95 个演示入口、111 段完整录像。原 252 条记录逐项保留；两猫源码合一档案只增加一个工程入口。宽幅卡片原来裁掉新人物的头部，`author-render` / `author-comparison` 改用 contain，并补中英媒体标签；既有精选、筛选、分页与来源不变。

X 议会源帖 `2096716820430594170` / 媒体 `2096716075748519937` 仅一段，原始时长 58.41 秒。最高码率原版为 48,890,868 字节 / 58.43 秒 / SHA-256 `896386da754ade1560444881a7083a53f8f0a0234c35c55eb01b68c93959e5a9`；完整播放版为 2,234,589 字节 / 58.42 秒 / SHA-256 `8489f60ed36514a7550f5c7ad32cec7b134f421f48ed10bf573634afd6448eff`。两个文件的 Content-Length、媒体 ID、时长误差和 `ffmpeg -v error -xerror -err_detect explode -i FILE -f null -` 全长解码通过（exit 0、stderr 空），未转码、裁剪。已发布 [media-2026-10-05](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-10-05)，两附件服务端字节与 SHA-256 匹配；既有 220 条媒体记录保留，新增两条。三场景 Real2Sim 视频只外链，未计为本库完整归档。

实际浏览器可见 MONO 三维猫和议会场景，只作有限展示检查。MONO 内容读取超时，未操作控件；议会有 THREE.Clock 弃用和 shader 浮点警告，没有捕获 error。第三方工程未执行，作者主观评分、几何或打印目标、单图/多图实验均保持各自边界。五件新增的 15 个主要链接增量 GET 全部可达，图片逐一人工查看，并在本库浏览器检查加载，不是全历史审计。

`npm run catalog`、`npm run check`（257 条数据、19 个测试、TypeScript）和 `npm run lint` 通过；小幅媒体样式修改后再次执行 check/lint 通过。普通与 `$env:GITHUB_PAGES='true'; npm run build` 构建通过：514 中英文作品页 + 8 专题 + 16 目录共 538 静态页面，539 sitemap URL，11,546 本地引用和 257 详情 JSON 均通过内置验证。沿用已记录的 Windows Node 22 兼容路径，只有既有 DEP0190 警告。

普通生产构建以本地 HTTP 服务检查 1440×1100、390×844 和 320×800 视口，页面无整体横向溢出（内容宽分别 1425 / 375 / 305），英文入口、最新五件英文标题与三组筛选标签正常；筛选条内部横向滚动属于既有设计。五张原站图在案例区 complete=true、naturalWidth>0，作者渲染与对照图 computed object-fit=contain。站内视频通过原生键盘控件播放，readyState=4、duration=58.416667，currentTime 从 0 推进到 20.752119 秒，未捕获本站 warn/error。

已更新 `docs/media/` 中 10/5 首页、案例区、手机与详情四张实拍；中英文 README 和 share.jpg 指向本轮截图。截图并非生成概念图。工作区验证脚本确认原有 252 条档案、220 条媒体及既有 Release 未被改写，新增两 MP4 文件哈希与清单一致。线上发布证据完成后补记。
