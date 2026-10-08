# 10 月 8 日：新材料核查与作品展示更新

## 范围与方案

从干净的 `43a0ba9` 开始：272 条档案（260 Astra + 12 方法参考）、73 工程、97 演示入口、118 段完整录像。检索 GitHub、X、Reddit、LinkedIn、中文及日文作者平台，优先 10 月 7–8 日作品与未收录的可查看成果。作品首发、收录和核查分别记录；未知日期保持 null，仓库提交日期不冒充首发。

沿用现有六件稳定精选、双语目录与静态详情，不重排界面或改动既有分享地址。这轮选择补充真实成果与作者材料；相比重新设计首页，这可保留已有浏览和引用路径，修改按 Git / Pages 版本回退。不以重复过程或同一次合集中的多个阶段增加数量。

每条新增必须明确 Astra 归属，并实际查看输出图或录像。记录其他模型、资产生成器、人工修正的职责与局限，第三方媒体不纳入本库 MIT。X 原帖全片段下载原平台完整最高码率原版与完整播放版，检查媒体 ID、Content-Length、时长、SHA-256 和严格全长解码后发布媒体 Release。无法查看效果的线索不进入展示库。

执行 catalog、check、lint、普通与 Pages 构建；核对新增图片、播放器、宽屏/手机和控制台，更新双语 README 四张网页实拍与 share.jpg。仅发布 GitHub Pages，不创建自动化或外部社媒发布。验证与发布结果完成后填写。

## 实施与验证

新增 13 条，全部有经完整下载、解码和目视检查的输出预览。档案现为 285 条（273 Astra + 12 方法参考），80 个工程、102 个演示入口、121 段完整录像。272 条旧案例、236 条旧媒体和全部 19 项旧 Release 保留；独立比对 54 项断言无失败。四套 RetroStyle 包合并一条，同一生产过程的多个阶段不重复计数。

| 作品 | 首发（上海日期） |
| --- | --- |
| [マツダ兔角色：Tripo 分件到 Astra 修复与 VRM](https://carpentry-liu.github.io/awesome-astra-3d/cases/matsuda-tripo-rabbit-vrm/) | 2026-10-03 |
| [前桥育英高校：三种甜甜圈与杯柄修正](https://carpentry-liu.github.io/awesome-astra-3d/cases/maeiku-donut-blender-iterations/) | 2026-10-05 |
| [LATTE Df：FreeCAD 拉花相机从动画到实物修正](https://carpentry-liu.github.io/awesome-astra-3d/cases/shirotsume-latte-df-freecad/) | 2026-09-29 |
| [Aetheris 差分机：层级 CAD 装配与机械算术演示](https://carpentry-liu.github.io/awesome-astra-3d/cases/yuechen-aetheris-difference-engine/) | 未知 |
| [苍穹交锋：程序化喷气战机与三维空战](https://carpentry-liu.github.io/awesome-astra-3d/cases/flying37520-astra-air-combat/) | 未知 |
| [Sunward：Unity 海岸赛车与可导出摄影模式](https://carpentry-liu.github.io/awesome-astra-3d/cases/yjrocks-sunward-racing/) | 未知 |
| [Rift Chess：可滑动棋盘与程序化三维棋子](https://carpentry-liu.github.io/awesome-astra-3d/cases/hailey-rift-chess/) | 未知 |
| [Villa Jelly：热带别墅、果冻海与双模型对照](https://carpentry-liu.github.io/awesome-astra-3d/cases/vib3coded-villa-jelly/) | 2026-10-07 |
| [同图重建道具：Astra、Sol、Sonnet 与 Opus 四格对照](https://carpentry-liu.github.io/awesome-astra-3d/cases/tural-four-model-3d-prop/) | 2026-10-06 |
| [四套资产包：美术师主导、Astra 辅助 Blender 流程](https://carpentry-liu.github.io/awesome-astra-3d/cases/retrostyle-four-asset-packs/) | 2026-09-24 |
| [Neural Sight：实景高斯泼溅与预录武器动画的浏览器 FPS](https://carpentry-liu.github.io/awesome-astra-3d/cases/monstercameron-neural-sight/) | 未知 |
| [SUNBREAK：程序化 BMX 下坡赛与特技镜头](https://carpentry-liu.github.io/awesome-astra-3d/cases/imirushik-sunbreak-downhill/) | 2026-09-06 |
| [Saber Descent：Imagegen 参考到 Blender 网格的光剑地牢](https://carpentry-liu.github.io/awesome-astra-3d/cases/vheissu-saber-descent/) | 2026-09-06 |

检索覆盖与排除记录写入 data/research.json：GitHub、X、Reddit、LinkedIn、note、LINUX DO、Bilibili、小红书、Zenn、Qiita、知乎、掘金与作者网站。66 个增量 URL GET 200；24 张图片包含 13 张主图，均完整获取并解码。三个 note 原页在增量链接扫描中有 512 KiB 读取上限，作者全文另由研究步骤读取。历史检查保留原日期，不将本轮检索称为全库复查。

原帖 Astra / Opus / Sol / Sonnet 对照分别注明；Tripo、Imagegen、ACE Music、已有 Gaussian Splat 采集与手工美术保留独立角色。排除 One Life 的错误 Astra 标签、Hit & Run 缺明确模型归属、付费区外仅宣传封面的舞台作品及 Opus 动画。Neural Sight 的具体场景为 tosolini / CC BY 4.0；RetroStyle 官方文章与 LinkedIn 发布时间分别换算。

## 验证命令与结果

- `npm run catalog`：生成 README 统计、目录、公开 JSON 和 sitemap。
- `npm run check`：285 条数据契约、19 项既有测试及 TypeScript 全部通过。浏览核查说明更新后再次执行通过。
- `npm run lint`：通过。
- `npm run build`：普通构建通过。
- `$env:GITHUB_PAGES='true'; npm run check; npm run build`：Pages 构建通过，生成 570 双语作品页、8 专题页、16 分页目录；验证 594 静态页、12,722 本地引用、285 详情 JSON 与 595 sitemap URL。Windows 兼容构建的既有 DEP0190 提示仍存在。
- `python media/download.py`（本地调研脚本）：三个 X 原帖所有片段，共 6 个原版/播放文件、118,894,777 字节。媒体 ID、Content-Length、时长误差不超过 0.2 秒、SHA-256 和完整最高码率均核对。
- `ffmpeg -v error -xerror -err_detect explode -i FILE -f null -`：SUNBREAK 与 Villa 原版/播放版全长严格解码，exit 0 且 stderr 空。Saber 的两版本使用 `-fps_mode passthrough -enc_time_base demux` 保留输入时间精度，同样 exit 0 且 stderr 空；默认 null 输出的名义帧率时间基取整曾造成重复 DTS 提示。原 MP4 未修改、裁剪或转码。
- 媒体 [media-2026-10-08](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-10-08)：发布 6 项附件，服务器尺寸与 SHA-256 digest 核对，data/videos.json 保留 20 项 Release 和 242 个文件。
- Codex 浏览器：差分机自动演示、空战进入战区、Rift Chess 进入棋盘、Saber 进入地牢，均实际看到三维画面；没有完整通关或验证物理与性能。Aetheris 与 Rift 作者演示有着色器警告，未当作性能结论。Neural Sight 仅 HTTP 及原作者成果图核查。
- 本地 Pages 输出：13 张新增预览全部加载，三段视频分别完整播放到 17.045333 / 43.968 / 55.993083 秒，ended=true、error=null、控制台无告警或错误。宽屏 1440、手机 390、窄屏 320 检查，无横向页面溢出；本库页面控制台无告警或错误。
- 四张真实截图：[首页](../../media/homepage-2026-10-08.jpg)、[案例区](../../media/collection-2026-10-08.jpg)、[手机](../../media/mobile-2026-10-08.jpg)、[详情](../../media/case-2026-10-08.jpg)。中英文 README 已同步，public/share.jpg 与首页实拍字节一致。

## 发布核查

提交与正式网站结果完成后补录。

