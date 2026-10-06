# Dot 云端接手说明

这是 awesome-astra-3d 的执行交接文档，供用户将后续工作交给自己的 Dot。文档准备完成不代表 Dot 已收到指令或当前会话已迁移。

## 交给 Dot 的指令

> 请接手 https://github.com/carpentry-liu/awesome-astra-3d 的内容更新与网站维护，在你的云电脑执行。先读取仓库中的 `docs/handoff/dot.md`，恢复最新 `main`，核对运行环境并报告接手结果。2026-10-06 的更新已经发布，不要重复收录。后续按我的指令继续维护；这次不创建定时任务。仅使用 GitHub Pages 发布，沿用文档中的来源、完整视频、可见性和验证要求。

## 已完成的交接基线

- 核查日期：2026-10-06，Asia/Shanghai。
- 仓库：[carpentry-liu/awesome-astra-3d](https://github.com/carpentry-liu/awesome-astra-3d)。唯一维护发布站点：[GitHub Pages](https://carpentry-liu.github.io/awesome-astra-3d/)。
- 准备交接前的 `main`：`5013c8e4e13c2157151b46f965ba3cfb6b0b6951`，本地工作区干净，已推送。交接文档会产生后续提交，接手时应拉取远端最新 `main`。
- 最近发布代码：`9feb73131f83053d960ab8095e3f9fcd6bc0a323`；[Pages Actions 37406208586](https://github.com/carpentry-liu/awesome-astra-3d/actions/runs/37406208586) 成功。
- 264 条档案：252 条 Astra 案例、12 条独立方法参考；70 个源码或工程入口、95 个演示入口、113 段完整视频。`data/videos.json` 有 226 条原版及播放版媒体记录。
- 10 月 6 日新增 7 条案例、2 段完整 X 视频，其 4 个原版及播放版文件已发布到 [media-2026-10-06](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-10-06)。数据、页面、四张截图、媒体字节及 SHA-256 已线上核验，播放也已实测。
- 权威实施和验证记录：[F-0032](../features/F-0032-daily-oct06/README.md)。历史页面展示统计会随后续更新变化，以上数字是交接时快照。

## 云端恢复

1. 克隆公开仓库，确认 Git 根、分支和 `git status`。已有 checkout 先检查修改，再更新；保留与任务无关的改动，不强推。
2. 读取根目录 `AGENTS.md`、`README.md`、`DESIGN.md`、[文档入口](../README.md)，以及最新 F/R/REF 文档。仓库规则与已核实代码有冲突时明确报告。
3. 使用 Node.js 22.22.0（项目最低 22.13.0，与 Pages CI 的版本对齐），执行 `npm ci`。Linux 不需要本机 Windows 的盘符、工具或凭据路径。
4. 执行下面的恢复检查；首次接手不改案例或重新发布站点。需要 ffmpeg 检查新视频时，使用云端可用的 ffmpeg 并记录版本。

```sh
git clone https://github.com/carpentry-liu/awesome-astra-3d.git
cd awesome-astra-3d
git status --short
node --version
npm ci
npm run check
npm run lint
npm run build
GITHUB_PAGES=true npm run build
```

普通构建用于网站预览；Pages 构建用于静态发布。后续数据修改后另跑 `npm run catalog` 并检查生成文件差异。`node scripts/fetch-videos.mjs` 会从 Release 恢复完整播放文件、核对字节与 hash；它会下载较多媒体，CI 会执行这一流程。

持久内容已在 GitHub：代码、案例数据、来源记录、验证文档、截图，以及 Release 视频。不依赖本地 ignored `work/`、`node_modules/` 或构建缓存，临时研究脚本按需重建。不要复制 Windows Git Credential Manager、浏览器 Cookie、Token 或本地 `.env`。使用 Dot 已连接的 GitHub 授权；若缺少写权限，先完成可以评审的修改和验证，再向用户报告具体缺少的连接。

## 继续维护的要求

### 案例与来源

- `data/cases.json` 是事实源。广泛检索 X、GitHub、Reddit、LinkedIn、小红书、Bilibili、LINUX DO、Zenn、Qiita 和作者站，优先原作者，合并同作品的阶段，避免重复计数。
- 明确 GPT-6 Astra 的归属。其他模型、Meshy、Tripo、现成资产与 Astra 的分工写清；不能用 GPT Image 2 或第三方生成成果冒充 Astra 独立输出。
- 必须实际查看成果图片或完整录像，不能用输入参考图、概念宣传图或教程主持画面作为作品成果。没有可查看材料的案例移除或隔离，并记录原因。
- 首发、转引、收录、核查日期分别记录。用户日期采用 Asia/Shanghai；未知日期、型号、提示词保持缺失语义。没有新证据不刷新旧字段或冒充今日核查。
- 作者报告不代表独立复现，不额外声称物理、打印、医学精度或公平性能比较已经验证。
- 保留首页六件稳定精选，更新内容单独展示。第三方图片引用原站并署名，第三方媒体不纳入代码 MIT 许可。

### 完整 X 视频

- 新收录原帖有多段视频时，下载全部片段：最高码率完整原版和源站提供的完整播放版；不裁剪，不将本地转码文件标为源站原版。
- 逐文件核对源媒体 ID、Content-Length、时长（误差不超过 0.2 秒）和 SHA-256，执行严格全长解码：

```sh
ffmpeg -v error -xerror -err_detect explode -i FILE -f null -
```

- 核验后上传 GitHub Release，检查服务端字节数和 digest，再将正式附件 URL 写入清单。原版供下载，播放版由 Pages 提供可播放文件。保留既有媒体，新增文件必须有来源、署名和完整性证据。
- HTTP 200 不能代替真实播放。对新视频做完整 GET 校验，并在浏览器实际播放；不能把无录像的案例放进可播放视频列表。

### 更新与发布

- 同步中英文 README、CATALOG、UPDATES、详情数据、sitemap、分享封面；界面发生可见变化时更新首页、案例区、移动端、详情页四张真实截图。
- 数据修改后运行 `npm run catalog`、`npm run check`、`npm run lint`、普通构建和 Pages 构建。检查生成差异，记录实际命令与结果。
- 浏览器检查宽屏、手机、英文、图片加载、控制台和视频；截图来自真实运行页面。
- 推送、媒体 Release 和 GitHub Pages 发布属于原维护任务范围。仅发布 GitHub Pages，不更新旧 ChatGPT/Sites 站点，不自行发社交平台消息。
- 按确切代码提交等待 CI，核验线上数据、页面、截图及媒体 hash；将发布证据补入对应 F 文档，纯发布记录可单独使用 `[skip ci]` 文档提交。
- 本次迁移不等于每天自动执行。不要创建自动日更、提醒或定时任务，后续按用户的更新指令开展工作。

## 接手完成的标准

Dot 需要实际回复确认：已读取本文、恢复的分支和提交、依赖安装与检查结果、云电脑执行位置，以及 GitHub 写权限状态。只有拿到该确认，才算云端接手完成。准备交接文档、打开 Dot 页面或创建其他类型的云任务，不能代替这项确认。

当前本地准备状态：仓库持久内容已推送，交接要求已整理；本地会话尚未收到 Dot 的接手确认。Codex 的 [主机交接文档](https://learn.chatgpt.com/docs/remote-connections) 说明现有 handoff 不支持 Codex 云环境；Dot 可以按 [开始使用文档](https://learn.chatgpt.com/docs/dots/getting-started) 接收工作并委派 Codex。

## 本次交接验证

2026-10-06 在原本地 checkout 执行，PATH 中 Node 为 v24.14.0；以下结果不代表 Dot 云端环境已经验证：

- `git status --short`：准备交接前为空；文档变更后只有本文及 `docs/README.md`。
- `npm run check`：退出 0，264 条数据验证、19/19 测试和 TypeScript 检查通过。
- `npm run build`：退出 0，552 静态页、11,840 本地引用、264 详情 JSON 和 553 sitemap URL 验证通过；构建保留现有 Windows DEP0190 提示。
- `git diff --check`：无空白错误；本文的两个相对文档链接与入口索引链接均存在。
- ChatGPT 网页已打开，但未登录；登录弹窗可见，没有向 Dot 发送接手指令。

这次仅提交交接说明与文档索引，不改案例、媒体或网站界面；使用 `[skip ci]`，无需重复部署已验证的网站。云端结果需由 Dot 接手后另外记录。
