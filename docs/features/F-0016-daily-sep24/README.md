# F-0016 · 9 月 24 日内容更新

基线 `1f535ed`，工作区干净，git fetch 成功且 HEAD 与 origin/main 一致。阅读工作区规则、项目 AGENTS、DESIGN、README 和 F-0015。

仅更新内容与真实截图，不调整布局或依赖。选择核对原作者说明后补收三条，保留历史精选；不从聚合目录批量搬入或为了日更混入其他模型成果。旧记录与完整录像保持原样，可通过 Git revert 回滚。GitHub / Pages 同步，ChatGPT / Sites 不部署，小红书排除。

计划收录同图房间重建对照、Tripo 龙骨模型、Godot ARPG 资产流程。工具仓库不是案例工程；打印目标不等于打印成功；外部资产不标为 Astra 原生几何。原页相对时间不够确认精确日期，保留 null。

研究附记：[HARMONY](https://arxiv.org/abs/2609.26793) 于 9 月 22 日提交，摘要报告与 Astra 的定性对照。作为后续研究线索，未把 HARMONY 自身列成 Astra 作品，也不据此声称普遍胜负。

验证范围：数据、11 项既有测试、TypeScript、静态构建、增量链接检查、桌面和手机截图与控制台、远端 README / Pages / About。

## 实施与验证

- 新增 3 条，总计 238 条（226 Astra + 12 方法参考）、65 工程、103 演示入口、97 完整录像。原 235 条记录和全部视频记录保持不变。
- `npm run catalog`：更新 README 统计、目录、更新记录、公开 JSON、sitemap。
- `npm run check`：238 条数据、11 项测试、TypeScript 全部通过。
- `npm run build`：静态导出及首页 9 项资源引用通过；保留既有大包和 DEP0190 警告。
- `work/audit-sep24.py`：Tripo 模型页 HTTP 200，标题与龙骨模型一致；网页搜索打开曾失败，以本次有界 GET 记录可达性，不代表已下载或打印验证。
- 浏览器检查首页、最新列表和手机布局，控制台 warning/error 为空；真实截图 1425×1089、1425×1089、375×812。首次导航等待超时后页面已正常显示，随后核对通过。
- `work/document-sep24.py`：核对 235 条历史记录完全不变，增量链接审计保留历史时间。
- 无新增 X 完整视频；不部署 ChatGPT / Sites。

## 发布核对

- 内容提交 `929a546b3972400151c13af74fdc6099aedb8cd3` 已通过 `git push origin main` 同步。
- `work/about-sep24.py`：公开仓库 About 为 226 案例、65 工程、103 演示、97 视频，保留网站入口与 20 个 topics。
- `work/readme-check-sep24.py`：中英文远端 README 与本地一致，渲染包含 9 张图片；3 张新截图均与本地字节一致。
- [Pages 流程](https://github.com/carpentry-liu/awesome-astra-3d/actions/runs/35940821586)的 build / deploy 均为 success。
- 公开 `cases.json` 返回 238 条，解析后与本地公开 JSON 完全一致；仅验证本轮变化，未重新宣称历史全部录像检查。
