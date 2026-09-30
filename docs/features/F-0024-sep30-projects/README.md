# 9 月 30 日第二轮：近期作品与可下载工程

## 调研与实施方案

在首轮三件 Routine labo 网页之后，再检索 X、GitHub、作者网站及社区。候选包括 GPTBlender 平面图转房屋、9 月 26–28 日的火箭捕获、森林湖泊村庄、镜头光路、软体西瓜、地形编辑器和打印挂钩；逐项核对实际媒体与 Astra 对应关系后才收录。已有 H3 Max Blender 档案补充作者新实验，不重复计数。

案例事实源仍为 `data/cases.json`。X 正文读取受限时保留原帖与 FxTwitter 元数据证据，标为 secondary；不能将镜像当作直接读取。比较作品必须指出 Astra 所在视图，不将 Sol/Opus 视频列为 Astra 独立产物。未知原始时间保持 null，今日收录不等于今日创作。

新增录像先下载平台 MP4 原始最高码率和较小完整版本，核对媒体 ID、时长、完整解码和 SHA-256，再保存到 GitHub Releases 与站内播放器；不剪辑、不转码。图片保持原站外链。房屋包含 BlenderKit 家具，注明混合许可证与工具分工；不运行第三方脚本或调用付费模型。

更新中英文 README 精选、GitHub About、首页精选和真实宽屏/手机截图。必跑 check/build，验证新增图片实际加载、新录像实际播放、手机无横向溢出与控制台。仅发布 GitHub Pages，沿用不部署 ChatGPT 站点的要求。保留首轮及全部无关修改，提交前检查远端。

## 验证与发布

最终新增六条：GPTBlender 房屋、Clairval 村庄、Windfield 游戏与编辑器、火箭捕获对照、打印挂钩、Melon Jelly 对照；已有 H3 Max Blender 仅补读 README 进展。总计 221 条（209 Astra + 12 参考）、55 工程、84 演示、101 完整录像。X 日期由镜像原帖 UTC 时间取得，房屋原始创作日期仍未知。

- `python work/download-sep30-second.py`：四个指定媒体 ID 的 8 个 MP4 全部完成时长、字节数、SHA-256 与全长解码核验；无剪辑或转码。镜头光路下载未通过完整性检查，未收录。
- `python work/publish-sep30-second.py`：8 个原始/播放文件已上传并发布到 [media-2026-09-30](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-09-30)，上传大小及 GitHub 提供的 digest 匹配。
- `python work/update-sep30-second.py`：轻量 GLB 为 15,274,196 字节，glTF v2 声明长度、SHA-256 与作者 provenance 一致；实际浏览器加载模型、切换俯视并截图。没有重跑建模。
- `npm run check`：221 条数据、11 项测试和 TypeScript 通过。
- `python work/verify-local-sep30-second.py`：原 215 条全部保留，仅 H3 档案按证据更新；原 97 个录像逐清单记录不变。六张新图片均在真实页面加载，控制台 warn/error 为空；桌面与手机无横向溢出。

Windfield 原帖照片本轮返回 403，采用发现仓库中已检查的实际效果图外链并标 secondary。Melon Jelly 录像包含颜色预设变化，不能用单帧颜色判断任务失败；保留作者的效果评价与实际操作对照，未独立评分。Claude 演示不当作 Astra 演示。挂钩强度尚待作者测试，未编造结果。

- `npm run build`：修订果冻说明后重新生成目录与静态页面，首页 9 个资源引用检查通过；保留已有大包体积和 Node shell 弃用提示。
- `git fetch origin main`、`git rev-list --left-right --count HEAD...origin/main`：提交前远端与本地基线一致（0 / 0），未覆盖其他更新。`git diff --check` 通过。

## 线上确认

内容提交 `df616f6cf7bb9a060cd90a60614c1b4b2cc1a8a7` 已推送到 main。[GitHub Actions 36688098631](https://github.com/carpentry-liu/awesome-astra-3d/actions/runs/36688098631) 的 build、deploy 均为 success；仅部署 GitHub Pages，没有部署 ChatGPT 站点。

- `python work/ci-sep30-second.py`：上述提交对应的构建与部署完成。
- `python work/published-sep30-second.py`：公开 `cases.json` 的 221 条记录与本地完全一致，六条新增 ID 均存在。
- `python work/verify-release-sep30-second.py`：公开 Release 的 8 个文件大小、digest、下载地址均匹配。
- `python work/readme-check-sep30-second.py`：中英文 README 与三张新截图均已同步；GitHub 渲染 README 包含 9 张图片。
- `python work/about-sep30-second.py`：About 已更新为 209 Astra 案例、55 工程、84 演示、101 完整录像，保留公开状态、站点链接与 20 个 topics。

使用真实浏览器访问已发布 Pages，逐一打开四个详情播放器并按空格播放。四段均到达 `ended=true`、`currentTime=duration`、`readyState=4`，解码宽高非零，未出现 `video.error`：

| 案例 | 完整时长（秒） | 实际解码尺寸 |
| --- | ---: | --- |
| Super Heavy 捕获对照 | 11.5 | 640 × 360 |
| Clairval 森林村庄 | 42.794667 | 640 × 360 |
| J 型挂钩对照 | 43.333333 | 592 × 360 |
| Melon Jelly 对照 | 18.581333 | 480 × 540 |

浏览器 `dev.logs({levels:['warn','error'],limit:30})` 返回空数组。播放状态与控制台结果保存在忽略目录 `work/refresh-2026-09-30-second/`；首页、案例列表及手机截图位于 `docs/media/*-second-2026-09-30.jpg`。测试标签已关闭，临时本地预览服务收尾时停止。
