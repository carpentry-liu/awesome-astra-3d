# 10 月 7 日：近期作品与可查看材料

## 范围与方案

从 `3c954c9` 的 264 条档案（252 Astra + 12 方法参考）、70 工程、95 演示入口、113 段完整录像开始。

本轮检索 GitHub、X、Reddit、LinkedIn、中文及日文作者网站和平台，优先近期作品与尚未收录的真实成果。使用现有目录、六件稳定精选和双语分享页，避免改动已有分享地址；相比重新排版，这轮集中补充有材料可核查的作品。首发、收录和核查日期分别记录，未知为 null，不将旧作写为今日首发。同项目过程合并，不以重复阶段增加数量。

新增需明确 Astra 归属并实际检查成果图；混合工具职责、作者自述和未验证限制单独记录。新 X 视频下载原帖全部片段的完整原版和完整播放版，核对源 ID、时长、字节及 hash，全长严格解码后发布媒体 Release。缺失媒体不进入可播放列表。

执行 catalog、check、lint、普通及 Pages 构建，核查新增图片和视频实际播放、控制台、宽屏与手机。更新中英文 GitHub README 的四张真实实拍、分享封面和目录，仅发布 GitHub Pages。所有验证与发布结果在实施后填写，不将计划作为完成证据。

## 实施与验证

新增八条去重档案：Jill 角色修复、Tripo 三款游戏合并记录、DeepSeek 鲸鱼 CAD、击剑动作回放、Chess3DAstra、NVIDIA 传送带抓取、Higgsfield 椭圆形办公室与ちいさな街工房。来源包括作者 note、LINUX DO、GitHub、LinkedIn 和 NVIDIA 作者团队站。检索轨、实际查询和排除理由追加 `data/research.json`；LEGO-Anything 等旧案例不重复添加，Veras 示意图是输入参考，六足机器人未找到合格成果预览，均未进入新档案。首发保留九月或十月已知日期，棋盘、击剑与 NVIDIA 的准确首发日期未知；没有把今天收录写成今天创作。

Tripo 提供 Jill 部件和游戏角色，Astra 分别修复角色及编写游戏代码，Opus 负责 Jill 动作阶段，人工 Blender 修正另记。击剑使用 DeepMotion 动作和 UE 回放；棋盘后续部署由 Sonnet 完成；城镇子功能由 Luna 实现；NVIDIA 使用既有 SimReady / STEP 资产和 ovphysx / ovrtx。DeepSeek 是输入标志名称。原始工程与图片已读，不执行第三方代码；打印可行性、物理准确性及作者性能数字不当作独立测量。

现有 272 条档案：260 Astra + 12 方法参考、73 工程、97 演示入口、118 段完整录像。原 264 案例对象和 226 媒体记录逐项相同，旧 Release 保留。新增八张成果图全量 GET 200、实际图像解码与目视检查通过。增量检查 23 链接，其中 22 成功；LINUX DO 原帖访问受限，保留原帖入口及作者公开工程和固定 SHA 的实际成果图，不把 403 当作成功。此轮没有复查所有历史链接。

五段 X 片段均归档原平台完整原版与完整播放版，发布于 [media-2026-10-07](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-10-07)。Jill 9.589 秒、三款游戏 34.4 / 28.8 / 33.333 秒、城镇 42.793 秒（源元数据）。十文件共 57,813,062 字节；媒体 ID、Content-Length、时长误差、SHA-256 及 `ffmpeg -v error -xerror -err_detect explode -i FILE -f null -` 严格全长解码通过，exit 0、stderr 空。Release 十个附件的服务端字节和 digest 匹配，未裁剪、未转码；现有 236 条原版/播放版记录。NVIDIA 与 LinkedIn 外部影片核查但不计入完整归档数量，第三方媒体不纳入本库 MIT。

实际打开作者棋盘演示，三维棋盘和控件可见；城镇演示由 24×24、151 栋建筑/203 棵树改为 16×16 并重新生成，显示 55 栋建筑/97 棵树，不据此宣称全部功能或 GLB 动画已验证。站内五个原生播放器都播放到结尾、readyState=4、ended=true：9.636281 / 34.453333 / 28.842667 / 33.386667 / 42.837333 秒，各页未捕获 warn/error。

普通生产构建的 1440×1100、390×844、320×800 视口内容宽 1425 / 375 / 305，无整体横向溢出。中英文新标题、材料入口、14 张首屏精选/新增图片 complete=true 且 naturalWidth>0。保存四张 `docs/media/*-2026-10-07.jpg` 实拍并更新双语 README；详情为 Jill 角色，首页图同步 share.jpg。截图来自真实浏览器页面。

`npm run catalog`、`npm run check`（272 档案、19 测试、TypeScript）、`npm run lint` 通过。普通 `npm run build` 与设置 `GITHUB_PAGES=true` 的生产构建都通过：544 双语详情、8 专题、16 目录，共 568 静态页；12,176 本地引用、272 详情 JSON、569 sitemap URL 验证通过，仅沿用已有 Windows DEP0190 警告。`D:/miniforge3/python.exe -X utf8 work/refresh-2026-10-07/verify.py` 验证 264 旧档案、226 旧媒体与 Release、十个新 MP4 字节/hash、公开 JSON、统计、569 sitemap、四截图与分享封面一致，通过。最终复跑 check / lint、`git diff --check` 通过。线上结果完成后补齐。
