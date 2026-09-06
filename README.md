# Awesome Astra 3D · 三维作品档案

一个可溯源的 **GPT-6 Astra 3D 案例库**：建筑漫游、Blender 建模、Three.js / WebGL 世界、3D 游戏、空间创作工具与失败样本。

**[浏览网站](https://carpentry-liu.github.io/awesome-astra-3d/) · [全部案例](CATALOG.md) · [结构化数据](data/cases.json) · [贡献案例](CONTRIBUTING.md)**

首批整理于 **2026-09-06（Asia/Shanghai）**，收录 **29 条 Astra 案例 + 12 条独立方法参考**。覆盖官方、X/Twitter、GitHub、Reddit、YouTube、个人网站。模型归属按公开来源分级，未在本机重新运行这些第三方作品。

## 精选起点

- [Solace 建筑工作流](https://developers.openai.com/blog/architectural-visualization-with-astra)：Blender → Cycles → UE5。
- [Simon Willison 的鹈鹕骑车](https://github.com/simonw/gpt-6-astra-blender-pelican-bicycle)：`.blend`、Python 与完整 Codex 记录。
- [Gogh Strike](https://github.com/petergpt/gogh-strike)：三维绘画世界与游戏，公开 GLB 和 Blender 构建器。
- [PhiloLabs 联合广场](https://github.com/PhiloLabs/fable51-worlds/tree/main/union-square-sf-gpt-astra)：可漫游城市及双模型对照；只收 Astra 子项目。
- [Void Explorer](https://developers.openai.com/showcase/void-explorer)：可降落的程序化宇宙。

## 收录标准

| 标记 | 含义 |
|---|---|
| 官方展示 | OpenAI 作品详情直接标明 Astra |
| 作者自述 | 原作者文章、帖子或仓库可读，模型声明明确 |
| 转引待复核 | X 原页受限，依据原文镜像、引文或整理页；保留佐证 |
| 方法参考 | 不纳入 Astra 数量的图片构图与提示词参考 |

3D 风格图片、真实三维几何、可编辑工程和交互网页分别标注。概念图与实机截图不混用。原始日期未知为 `null`，转引日期另存；未找到提示词就保持缺失。对照和失败样本不作为通用性能排名。

小红书已进行公开检索和平台读取尝试：公开索引未取得可核实笔记，浏览器读取超时，本地专用会话检查为未登录。当前没有小红书案例，不代表平台上不存在。Bilibili 与其他媒体结果用于发现线索，未把预测和重复转载计为作品。

## 参考仓库

组织方式参考 [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) 与 [wuyoscar/GPT-Image2-Skill](https://github.com/wuyoscar/GPT-Image2-Skill)。它们不是 Astra 案例库；个别原链接属于其他模型或只有作者主页，因此本库单设“方法参考”。完整观察见 [检索记录](data/research.json)。

## 本地运行

Node.js 22.13+，推荐 Node.js 22.22.0。沿用 Sites Vinext / React / Shadcn 脚手架与 npm 锁文件。静态部署不调用 OpenAI API，不需要 API Key。

```sh
npm ci
npm run dev
npm run check
npm run build
```

`npm run check` 校验来源数据、执行筛选与证据语义测试、运行 TypeScript 检查。`npm run build` 同步目录与公开 JSON，静态站输出到 `dist/client/`。Windows Node 24+ 会自动使用 npm 官方发行的 Node 22.22.0，避免已复现的预渲染退出断言。生成文件通过 `npm run catalog` 同步，勿独立编辑 `public/cases.json` 和 `CATALOG.md`。

## 完整视频

已归档 **10 个完整视频**：9 条以 X 为主来源的案例，以及 AI Kai 作者博客明确链接的同一条 X 视频。每条保存最高码率 MP4 和原平台提供的完整播放版本，不剪辑、不转码。网页可直接播放并下载最高画质。

[全部视频附件](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-09-06) · [时长与 SHA-256 清单](data/videos.json)。下载文件的时长与原帖媒体元数据核对，Pages 构建逐文件验证字节数和 SHA-256。视频放在 Release，避免把大文件写进 Git 历史。

## 数据与维护

- `data/cases.json`：事实源；统一的作者、来源、日期、模型、证据、产物、提示词、媒体和许可字段。
- `src/catalog.ts`：搜索与分组契约。`app/`：响应式案例站。
- `components/ui/` 与 `hooks/`：脚手架提供的 Shadcn 组件，保留上游结构；原创代码检查不将未使用的供应商组件纳入修改范围。
- `scripts/` / `tests/`：数据校验、目录生成和行为测试。
- [文档索引](docs/README.md)：需求、设计、实施与实际验证证据。

## 权利

本仓库原创代码按 [MIT](LICENSE) 许可。第三方作品、图片、视频、商标、外部提示词及上游素材继续适用各自权利，不因本库 MIT 而获得重新分发授权。本库保存元数据并外链图片；按用户要求归档 X 案例的完整视频，作为 GitHub Release 附件发布。视频版权归原作者，不适用本库 MIT 许可，不代表已获得作者另行授权。请通过 Issue 提交更正或移除请求。

独立整理，非 OpenAI 官方项目。
