# 10 月 4 日：近期作品与可查看材料

## 范围与方案

从干净的 `fcdf942` 开始，基线 247 条档案（235 Astra + 12 方法参考）、110 段完整录像。再次检索 GitHub、X、Reddit、Zenn、Qiita、Bilibili、小红书与作者网站，优先新近原作和有实质变化的工程，也补充此前遗漏且仍可核对的作品；发表日、今日收录和今日观察分开。

只有明确作者模型声明及实际可见效果才收录，未知版本、日期、提示词与工具分工保持缺失或明确局限。混合流程按各工具职责表述，任务计划与可选模型配置不能替代已完成输出；跨平台转帖和一个项目的多场景不重复计数。

沿用现有布局和六件稳定精选，增量生成中英文目录、详情页与 README，更新真实截图。X 若有合格的新原作，先下载完整原版及播放版，核对字节、SHA-256、原帖时长和全长解码后发布媒体 Release；没有新片段时保留原数量。Bilibili 等只按核对到的可见材料展示，不把视频入口称为完整归档。

运行数据、行为测试、TypeScript、lint、普通与 Pages 构建；浏览器检查新增图片、宽屏、手机和控制台。只发布 GitHub Pages，不部署 ChatGPT 站点或向外部社区发帖。相比重做首页，此次以内容增量和真实展示为主，保留现有导航和历史作品，可通过 Git / Pages 回滚。

## 调研、验证与发布

新增 H3 Battle Lab、FORM / 001、Monsoon Funnel、古画楼阁猫角色动作游戏、Fluffy Grove 五条。当前 252 条档案（240 Astra + 12 方法参考）、65 个源码 / 工程入口、93 个演示入口、110 段完整录像。旧 247 条逐字段未改，220 条媒体清单未改；没有合格的新 X 原视频。

H3 保留文章 9/21 首发和 10/3 实质进展，Meshy 基础资产、Astra 修模 / 动作 / 导出 / 渲染与 VCMI 原生规则分开；完整模型版本未知。FORM 首发未知，固定姿势、11 轮与主观 73 分均如实记录，95 分与 20,000 轮属于未达成目标。Tianyu 两件分别发表于 10/2 与 9/27，保留 Astra / Opus / Blender / Seedance 分工，未将报名链接计为试玩。WuTian 主源视频 9/5，北京时间由 Bilibili API 核实；更早 9/4 论坛记录未明时区且不是转引，日期仅在说明保留。

## 实际验证

- 原图：研究阶段实际查看 H3 两图、FORM 正背面和工作台三图、LinkedIn 两封面及 WuTian 首帧。后者为实际小屋成品，未将输入参考图当结果。两件 LinkedIn 原帖独立 HTTP 200，精确时间与 41 秒 / 12 分 46 秒平台元数据一致；没有将视频入口标为完整归档。
- 来源覆盖：GitHub、X、Reddit、Zenn、Qiita、Bilibili、小红书、LINUX DO、LinkedIn 与作者站。X / 小红书本轮未确认合格新原创；既有工程、转帖、教程和只有模型配置的工具不凑数。`data/research.json` 追加本轮覆盖与排除依据。
- `D:/miniforge3/python.exe -X utf8 work/refresh-2026-10-04/link-audit.py`：14 个去重主入口增量核查。LINUX DO 普通请求 403，web 索引原文可读；一次 LinkedIn 图请求遇到主机名证书不匹配，随后 `retry-image.py` 保持证书校验的普通 HTTPS GET 成功 200 / 44,052 字节。失败观察保留，不改写历史全库审计日期。
- 独立只读内容复核：五件归属、混合贡献、原帖时间、成品图与许可边界通过。WuTian 较早同作者记录移出转引日期。独立检查当前旧 247 条与 `fcdf942` 逐字段相同，媒体清单相同。
- `npm run catalog` 后 `npm run check`：252 条数据、19 项行为测试与 TypeScript 通过；`npm run lint` 通过。调整 FORM 宽幅封面与补齐浏览器事实后重复相同检查，通过。
- `npm run build`：最终普通构建通过，504 个中英文案例页、8 专题、14 目录；526 静态页、11,268 本地引用、252 详情 JSON 与 527 sitemap URL 通过。没有添加依赖、测试或改变布局。
- 作者演示：实际浏览器打开 FORM 工作台，正面人物、第 11 轮记录可见，Back 与 Clay 切换后背包和手部可见，warn/error 为空。没有完整验证 GLB、下载按钮、手机与全部交互，也没有独立生成。
- 本库浏览器：宽屏 1440×1100，五张新增图均加载到非零实际尺寸；中文手机 390×844 无整页横向溢出。英文 390px / 320px 无整页溢出，Curation notes 与返回 Astra works 240 可操作，warn/error 为空。首次恢复宽屏时 viewport 仍作用于刚查看的作者页，关闭该临时页后本库确认实际 1440×1100；截图按确认后的页面生成。
- 截图选择：FORM 竖版图在卡片中裁掉头部，改用已检查的原作者宽幅工作台截图；中间为完整成品、左侧参考照片明确标注。中英文 README 更新首页、案例区、手机、H3 详情四张真实 JPG，分享封面使用首页实拍。
- `$env:GITHUB_PAGES='true'; npm run build`：最终 Pages 前缀构建通过相同静态检查。`D:/miniforge3/python.exe -X utf8 work/final-oct04.py` 核对 252 条、旧 247 条、220 条媒体、公开 JSON 与 README 图片入口通过；`git diff --check` 通过。

## GitHub Pages 发布

- 实施提交 `a6a592b` 已推送 main。首次 push 遇到 GitHub DNS 解析失败，普通重试 `git -c http.version=HTTP/1.1 push origin main` 成功；没有更改 TLS 或认证设置。
- `D:/miniforge3/python.exe -X utf8 work/ci-oct04.py`：[Pages 工作流 37171425556](https://github.com/carpentry-liu/awesome-astra-3d/actions/runs/37171425556) 的 build、deploy 与整轮结论均 success，现有 110 段完整录像下载 / 字节 / SHA 校验步骤成功。
- `D:/miniforge3/python.exe -X utf8 work/published-oct04.py`：线上 252 条 JSON 与本地逐条相同；新增五条详情 JSON、十个中英文详情页的 canonical、实际图片及过程提示通过。527 sitemap URL、分享封面及首页三段非空 JavaScript 资源通过；两份 README 与公开仓库统一行尾后相同，四张 JPG 按字节相同，仓库公开且 About / 主页地址正确。
- 实际浏览器打开发布后的最新收录页，标题 / 数量为 240 Astra，五张新增图均为非零实际尺寸，warn/error 为空。发布实拍保存于 ignored `work/refresh-2026-10-04/production-collection.jpg`；默认浏览器尺寸已恢复，公开最新页保留供浏览，本地临时页和服务器已关闭。
- `D:/miniforge3/python.exe -X utf8 work/final-oct04.py` 再次通过旧 247 条、媒体、生成物、README 和分支一致性检查，工作区无任务外修改。此发布记录以单独文档提交补齐，不重复触发站点构建。
