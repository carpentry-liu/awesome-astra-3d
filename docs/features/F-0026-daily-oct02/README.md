# 10 月 2 日：近期作品与可查看材料更新

## 范围与方案

基线为 `f7f00bd`，229 条档案（217 Astra + 12 方法参考）、106 段完整录像；开始时工作区干净，独立 Git 根与 origin/main 一致。

检索 X、GitHub、作者站点、论文和其他公开社区，先核对模型声明、实际结果和既有记录，再收录。作品原始日期、今日收录日期、观察日期分开；没有证据的日期、模型分工、提示词或工程地址保持缺失。最近几天没有合格新作品的渠道如实记录，不用重复转载或其他模型补数量。

沿用 JSON 事实源、现有布局和媒体归档方式，刷新精选、中英文 README、目录、GitHub About 和真实截图。相比重建页面，增量更新能保留用户熟悉的筛选和来源说明，也便于比较与回滚。本轮不扩展功能或引入新依赖。

新 X 视频先下载最高码率原版和完整播放版，核验字节、时长、SHA-256 和全长解码，再发布现有仓库 Release 并供 Pages 播放。第三方媒体不纳入本库 MIT 许可，效果图保留原作者外链。不运行第三方代码或付费生成。

验证包括 `npm run check`、`npm run build`、实际图片加载、宽屏/手机截图、控制台、远端文档与媒体完整性。浏览器自动化受限时记录实际限制，不能把 HTTP 成功或解码成功记为完整试玩。仅推送 GitHub 与发布 Pages，沿用用户“不部署 ChatGPT 站点”的要求；不向社区发帖、不建立定时任务。代码和数据可通过 Git 与历史 Pages 部署回滚。

## 调研记录

- Chaos 9 月 29 日 Veras 5.2 文章明确支持 Astra，但本轮可读截图是 2D 输入参考图与模型选择器；官方 YouTube 内容未能读取。暂不把该宣传图当作已生成的三维结果收录。

## 实施与验证

新增八个档案：关闭记忆的海边猫骑行对照、Jetis 工厂数字孪生、五场景程序动画合集、Gopher 展会世界、金字塔、机械表、人眼和变形汽车。共 237 条记录（225 Astra + 12 方法参考）、59 条源码 / 工程、88 个演示入口、110 段完整视频。旧 229 条案例与 212 个媒体对象逐条深相等；五场景合集计为一个档案，没有拆分增加数量。

猫骑行保留 Astra B / Sol A、每组一次和非盲测边界，不推断关闭记忆带来的因果收益。Jetis 原生 SketchUp 导出与模型归属来自作者工程记录，建筑尺寸和假设分开。动画作者配置中指定 Astra xhigh，不冒充独立审计的运行身份。Gopher 保留 9 月 18 日发表日期，没有把展会日期或本轮收录日期当发表日期。

四条 X 对照均通过 Fx 镜像读取作者原文及媒体，直接 X 访问失败，维持 secondary 分级。金字塔为左 Astra / 右 Fable 5；手表为上 Opus 5.5 / 下 Astra；眼睛为上 Astra high / 下 Sonnet 5.5 high；汽车为上 Astra max / 下 Sonnet very high。保留金字塔右侧计时停顿、Astra 眼睑残影等可见局限。手表 WebGPU、持续运转和物理细节写为任务要求，未逐项认证实现，也不从录像时钟推导模型速度或成本。

GitHub 项目检索与 X、Zenn、Reddit、Bilibili、小红书及作者网站检索记录分别保存在忽略目录。Tripo 二手索引中的月夜小船经原文核对属于 Sol，未收录。机器人论文、只有提示词没有成品、未证明 Astra 归属及没有可读结果预览的候选均排除。没有发现合格新作的渠道如实记录；没有声称覆盖了整个网络。

- `D:/miniforge3/python.exe -X utf8 work/publish-oct02.py`：公开 [media-2026-10-02](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-10-02)，四段录像的原始最高码率与完整较小播放版本共八个资产，76,127,061 字节。下载文件时长约 15.05、58.05、48.92、60.49 秒，逐文件 SHA-256、媒体 ID、字节数和严格全长视频 / 音频解码均通过；未裁剪或转码。Release 返回的 size、digest 和资产状态与清单一致。平台首轮连接重置及恢复记录保留。
- `npm run check`：237 条数据、11 项行为测试和 TypeScript 通过。导航焦点修正后再次运行通过。
- `npm run build`：成功导出两条路由，首页九个资源引用检查通过。沿用原有大包体积、插件耗时与 Node DEP0190 提示。
- `npm run lint`：未通过，报既有 `src/video-player.tsx:15` 的 `next(no-img-element)`，该文件本轮没有修改。`node_modules/.bin/oxlint.cmd app/page.tsx app/welcome.tsx src/section-navigation.ts` 对本轮代码通过。不将项目整体 lint 记为通过。
- `git diff --check`：通过。
- 真实浏览器：八张新图均成功加载并取得非零尺寸。桌面 1440 × 1100 与手机 390 × 844 视口无横向溢出。生产构建点击最新收录、完整视频筛选、回顶后 query/hash 与目标位置正确；修复后 warn/error 为空。Enter 激活跳转链接后 `document.activeElement.id` 为 `collection`。
- 作者演示实查：海边骑行场景可见并显示暂停、广角和速度状态，控制台为空；Jetis 12/12 纹理加载，屋顶开关从 1 切至 0，钢结构可见，控制台有一条 WebGL shader precision 警告，无错误；Golden Gate 实际 Three.js 场景可见，控制台为空。未运行下载的第三方项目。
- 实拍：[首页](../../media/homepage-2026-10-02.jpg)、[案例区](../../media/collection-2026-10-02.jpg)、[手机首页](../../media/mobile-2026-10-02.jpg)，均为本地最终生产构建截图。中英文 README 共用，历史截图保留。
- 独立只读复核：新增事实、来源边界与八个媒体文件通过；指出跳转焦点回归后已修复并完成真实键盘验证。

原文、媒体报告、布局、控制台及发布检查保存于 `work/refresh-2026-10-02/`。原始完整下载与 FFmpeg 解码的通过不等同于完整浏览器播放，线上验证单独记录。

## 验证期间发现的导航问题

生产构建浏览器实际点击“最新收录”和首页锚点时，Vinext 报 `Prevented repeated hard navigation`。结合框架默认锚点处理与重复导航保护源码，判断页内点击被交给框架路由处理；页面筛选会同时修改 query，静态站没有路由数据服务。原错误快照保留，不能把修复前的控制台记为空。显式处理页内滚动后，该错误在相同点击路径的实际复查中消失。

修复只针对本站 `#top` / `#collection` 页内链接：共享一个小函数拦截普通点击，保留筛选 query、更新 hash 并滚动到目标；Ctrl/Command 等修改键仍用原生链接。键盘激活时将焦点移至可编程聚焦的目标。相比关闭框架路由或增加服务器路由数据，这个范围适合静态案例库，不影响外部链接。实际浏览器复查最新收录、资源筛选与回顶状态、键盘焦点、控制台和截图，不新增模拟实现的单元测试。

## GitHub 与线上发布

- `git commit` / `git push origin main`：内容提交 `0f89e62` 正常推送。`D:/miniforge3/python.exe -X utf8 work/about-oct02.py` 回读确认公开仓库 About 为 225 / 59 / 88 / 110，首页地址正确，原有 20 个 topics 保留。
- `D:/miniforge3/python.exe -X utf8 work/ci-oct02.py`：[Pages 工作流 36961643283](https://github.com/carpentry-liu/awesome-astra-3d/actions/runs/36961643283) 的 build、deploy 与整轮结论均为 success。
- `node work/published-oct02.mjs`：线上 `cases.json` 的 237 条记录与本地逐条一致，八条新 ID 齐全。
- `D:/miniforge3/python.exe -X utf8 work/readme-check-oct02.py`：GitHub README 渲染九张图片，中英文内容与本地一致，三张 10 月 2 日截图逐字节匹配。
- `node work/published-media-check-oct02.mjs`：四段新增 Pages MP4 总计 5,880,654 字节，均为 HTTP 200 / video/mp4，字节数和 SHA-256 与媒体清单一致；严格 FFmpeg 全长解码退出码 0，时长约 15.05、58.05、48.92、60.49 秒。四个 `Range: bytes=0-1023` 请求均返回 206、匹配的 Content-Range 和 1024 字节。
- 公共页面实际截图可见金字塔完整播放器、0:15 时长及 Astra / Fable 画面。公开 GitHub / Pages 的 DOM 读取接口多次超时，截图接口仍可返回；连接恢复后通过本地同一生产构建的真实播放器加载实际公开 Pages 视频地址继续验证。不会把该方式描述为已完成公开页面的全流程 DOM 或控制台验证。
- 四段录像均在真实播放器中以 1× 速度持续从 0 播至 `ended=true`，未跳转时间轴；`currentTime` 分别到达 15.046531、58.048、48.917333、60.487982，`video.error=null`，源地址均为实际公开 Pages MP4。汽车播放器的新标签控制台 warn/error 为空。完整浏览器播放证明与源文件全长解码分别记录在 `browser-playback.json` 和媒体报告中，不外推为本轮重审全部 110 段历史录像。
