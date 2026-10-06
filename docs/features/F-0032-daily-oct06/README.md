# 10 月 6 日：近期三维案例与可查看材料

## 范围与方案

从干净的 `2980d92` 开始，基线 257 条档案（245 Astra + 12 方法参考）、68 个工程入口、95 个演示入口、111 段完整录像。检索 GitHub、X、Reddit、LinkedIn、Bilibili、小红书、LINUX DO、Zenn、Qiita 和作者站，优先 10 月 5–6 日的新作、工程进展及此前遗漏的独立作品。保留首发日期、转引日期与今天收录/核查的区别；未知仍为 null。

新增必须有明确模型归属与实际检查的成果图或完整录像。复用现有目录、稳定六件精选、中英文详情和分页；相较于重做界面，这轮内容维护可保留已有分享地址，并由 Git / Pages 回退。相近工程与同作品过程不拆条增加数量，作者自评、图像生成、外部素材和其他模型的分工分别记录。

新 X 视频下载原帖全部片段的最高码率原版及完整播放版，核验媒体 ID、Content-Length、时长、SHA-256 和严格全长解码，再发布媒体 Release。没有新合格视频则不改变录像数量；第三方图片只外链署名。确认新的原作者证据时，允许更新已有档案对应字段，不以旧观察冒充今日检查。

执行 catalog、check、lint、普通与 Pages 构建；实际浏览器核对新增图片、宽屏/手机、控制台与新增播放文件。同步 GitHub README 四张实拍、分享封面和目录，只发布 GitHub Pages。原有内容和媒体无新证据时保留。

## 调研、验证与发布

本轮新增七条去重档案：LDraw Nova 大教堂/潮汐观测站合并工程、Renders 四建筑合并档案、MRI 衍生脑模型实物、Meshy 家具目录、Roomplay 房屋原型、Kureha 55 分件汽车与よぞねこ静态猫。LDraw 原作者 HN 发布帖为上海 10 月 3 日；其余保留九月首发，Renders 首发未知 null，10 月 4 日上传不当作首次创作。四条检索轨与排除记录追加 `data/research.json`，没有声称全网穷尽或把转帖拆成案例。

LDraw 两建筑明确 Astra xhigh，但尚未实体拼搭、物理稳定性未验证；工具开发混用 Opus。Renders 是作者仓库级 Astra 归属，完整型号未知，历史重建含艺术推测，缺失影片不提供播放。MRI 分割职责与解剖准确性未公开；Meshy 承担几何与分件，Astra Medium 调用工具和制作网页。汽车打印实物和猫最终四视角已看，猫尾根缺陷、汽车人工装配保留。独立策展复核七条无阻挡问题，只纠正“项圈”用词。未运行第三方代码或复现工程。

统计为 264 条档案：252 Astra + 12 方法参考，70 工程、95 演示入口、113 段完整录像。原 257 条档案逐项保留；新作试玩短链未解析，演示数未增加。新增七张封面与其它成果图下载并实际查看；主要链接增量 GET 17 项全部返回可达，浏览器七张新增图片均 complete=true、naturalWidth>0。不是全历史链接审计。

两段 X 原帖全部片段已下载并发布 [media-2026-10-06](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-10-06)。脑打印媒体 ID 2099981342817529856，源时长 20.875 秒，原/播放版 20.88 秒、5,318,368 / 1,069,156 字节；家具媒体 ID 2101682626784571392，源时长 54.1 秒，原/播放版 54.15 秒、10,415,415 / 1,453,364 字节。四文件 Content-Length、SHA-256、媒体 ID、时长误差和 `ffmpeg -v error -xerror -err_detect explode -i FILE -f null -` 全长解码通过（exit 0、stderr 空），未裁剪、未转码。Release 四附件服务端字节与 digest 匹配；原 222 条媒体记录和旧 Release 保留，现 226 条。作者图片、视频及第三方素材许可不纳入本库 MIT；LinkedIn 录像仅视觉核查，不计完整归档数。

`npm run catalog`、`npm run check`（264 条数据、19 测试、TypeScript）与 `npm run lint` 通过。`npm run build` 普通生产构建通过：528 中英文案例页、8 专题、16 目录，共 552 静态页；11,840 本地引用、264 详情 JSON、553 sitemap URL 通过内置验证。沿用现有 Windows Node 22 兼容路径，只出现已有 DEP0190 警告。

实际普通构建浏览器检查 1440×1100、390×844、320×800 视口，内容宽分别 1425 / 375 / 305，无整体横向溢出；英文七件新标题与材料入口正确，原有精选横向轨道保持可用。七张新增图 complete=true、naturalWidth>0，渲染图 contain，控制台未捕获本站 warn/error。脑打印原生播放器实际播放至终点，duration=20.875 秒、readyState=4、currentTime=20.875，控制台无 warn/error；源完整文件此前严格全帧解码通过，家具片段线上播放继续核查。

已更新四张 `docs/media/*-2026-10-06.jpg` 实拍、中英文 README 和 share.jpg；详情图为 LDraw Nova 独立页面，截图不是生成概念图。`D:/miniforge3/python.exe -X utf8 work/refresh-2026-10-06/verify.py` 检查 257 旧档案逐项相同、222 旧媒体与 Release 保留、四个新 MP4 字节/hash、公开 JSON、统计、553 sitemap 与四截图/分享封面一致，通过。`git diff --check` 通过。

`$env:GITHUB_PAGES='true'; npm run build` 通过，同样验证 552 静态页、11,840 本地引用、264 详情 JSON 和 553 sitemap URL。只发布 Pages，线上结果在下节补齐。
