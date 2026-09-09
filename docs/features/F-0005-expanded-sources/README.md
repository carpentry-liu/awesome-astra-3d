# 2026-09-09 第二轮：跨平台扩充与 GitHub 封面

## 范围与验收

在已发布的 73 条 Astra 案例基础上扩大公开来源检索，覆盖 X、GitHub、B 站、Reddit、作者博客和日文技术文章。遵守用户当天对小红书的停用要求，不访问该平台。优先不同工具、题材和实际产物，去除重复、无法确认模型归属的项目。

收录作者声明、原始链接与实际日期；X 镜像仍标记转引。已有模型、混合工作流、公开工具与完整作品工程分别说明。新 X 视频保存未剪辑的原平台 MP4，核对来源、时长、大小和 SHA-256，并全长解码播放版本；发布独立的扩充批次 Release。

更新网站精选、中英文 README 六图预览、真实桌面及手机截图、About 和自动生成目录。保留旧案例及历史媒体。验证数据、行为、TypeScript、lint、构建、响应式布局与控制台后推送；同步 GitHub Pages 和现有 Sites 的原访问范围。未授权的社交发帖不在本次范围内。

## 来源与验证记录

新增 30 条：16 条 X、5 个 GitHub 项目、4 条 B 站视频、4 篇日文作者文章、1 条 Reddit 实验。逐条证据保存在案例数据中，搜索覆盖和排除理由写入 `data/research.json` 的 `expanded-public-sources` 批次。案例总计 103 条 Astra，另有 12 条方法参考；39 条源码 / 工程，47 个演示入口，41 个完整视频。

Elderwood 原站返回 HTTP 200，却明确宣布停止运营。已移除 `demoUrl`，保留历史原帖录像与停运说明。未把关闭页面计作可玩游戏。GitHub 创建时间与 Reddit 不稳定相对时间均未冒充首次发布日期。

## 实际验证

- `python work/download-expansion.py`：28 个 MP4，275,834,813 字节；14 个播放版本全长解码通过。全部时长与原帖对应媒体的差值在 0.2 秒以内，未剪辑、未转码。
- `python work/publish-expansion.py`：独立 [media-2026-09-09-expansion](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-09-09-expansion)，28 个附件按大小与 GitHub SHA-256 校验；发布后刷新下载地址。旧批次全部保留，累计 82 个 MP4 文件（原画与播放版本）。
- `python work/audit-0909.py`：48 个演示候选返回 HTTP 200；逐一读取标题和最终地址，另读取 Elderwood 停运正文并剔除该入口，当前 47 个。该检查不表示完成所有作品试玩。
- `python work/audit-expansion-images.py`：27 张新增作者图片返回 HTTP 200；3 条无可靠对应截图的记录保留空值。
- `npm run catalog`：生成 115 条公开记录、目录、更新日志、README 统计和 sitemap。
- `npm run check`：数据来源、日期、媒体映射通过；11 个行为测试通过；TypeScript 通过。
- `npm run lint`：退出码 0。
- Sites 0.1.66 的 `node .../scripts/build-site.mjs` 在本机 Windows 上定位 npm 失败（错误指向项目内不存在的 `node_modules/npm/bin/npm-cli.js`）；没有修改插件或依赖，改用项目既有 `npm run build`，退出码 0，预渲染与 9 个资源引用验证通过。保留已有构建提示。
- 比较 `git show HEAD:data/cases.json` 与本次事实源：之前的 85 条记录逐字段一致，无覆盖丢失。
- 真实浏览器：桌面 1440 × 1400、手机 390 × 844，无横向溢出；首页统计显示 103 / 39 / 47 / 41；最新排序显示本轮作品；VRM 搜索返回一条对应记录，明确显示混合流程。控制台 error / warn 为空。
- 实拍：[桌面首页](../../media/expanded-desktop-2026-09-09.png)、[手机首页](../../media/expanded-mobile-2026-09-09.png)、[最新案例](../../media/expanded-cases-2026-09-09.png)。

## 展示与传播入口

首页精选改为 Rhine Lab、Asteria 与 Microduck；中英文 README 更新介绍、六张可点击效果图、最新八条、真实桌面和手机截图。About 同步实际数量及 Blender、Three.js、WebGL、CAD、VRM 等可检索主题。未发布任何社交文章，也不声称这些改动会保证 Star 增长。
