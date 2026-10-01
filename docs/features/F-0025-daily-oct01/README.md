# 10 月 1 日：可运行世界、场景重建与近期展示

## 调研与实施范围

在 221 条记录（209 Astra、12 方法参考）的已发布基线上，检索 X、GitHub、作者站点、arXiv、Reddit 与公开整理页。优先收录可查看实际效果、有明确 Astra 证据的新作品；同一作品跨平台去重。今日收录时间与作品原始日期分开，不将未知日期填为今天。

沿用现有 JSON 契约、页面布局与媒体归档方式。图片外链原作者；新 X 录像下载原始最高码率和完整播放版本，核验时长、字节、全长解码及 SHA-256 后才归档并展示。不运行第三方工程或付费生成。论文中的基准、目标场景和 Astra 实际结果需明确区分；研究结果不冒充独立复现。

同步首页精选、README 中英文预览、目录、GitHub About 和实际桌面/手机截图。必跑 `npm run check`、`npm run build`，检查图片、播放、控制台及布局；仅推送 GitHub 和发布 Pages，不部署 ChatGPT 站点。保留历史记录和媒体，失败候选留在检索覆盖中；可通过 Git 提交和历史部署回滚。

## 验证与发布

新增八个档案：Pelagic 海洋、Code4Scene 城镇构建与修复、Isaac Sim 工作台、LEGO-Anything 单图重建、官方 Ultrafast 展示、火箭发射模型对照、F-22 飞行对照、CRISPR 教学对照。共 229 条记录（217 Astra + 12 方法参考）、56 工程、85 演示、106 完整录像。原 221 条案例和 202 个媒体清单记录保持原样。

回查整理页候选后，排除明确属于 Opus 的地震和 Game of Thrones 录像；EvoLink 提示帖关联 Sol 6.1，未建立 Astra 归属，且小黄人原图本轮返回 403。另排除仅有提示要求、无结果的生产线和 Jelly Press。具体来源与排除理由已写入 `data/research.json`。Bilibili / Zenn 日期检索未取得新的合格作品，不用泛新闻或旧转载凑数。

F-22 文字声称同推理级别，但实际录像标为 Astra medium / Sol high / Opus medium，已保留差异。CRISPR 原帖未逐段标明模型，两个完整片段按源顺序展示，不推断各段归属。官方账号视频仅经镜像读取，仍为 secondary；宣传片计时不作为独立测速。论文样例与人工资产、基准目标及其他模型图明确区分；LEGO-Anything 代码仍为 Coming soon，工程及演示字段保持 null。

- `D:/miniforge3/python.exe -X utf8 work/research-oct01.py`、`work/fetch-x-oct01.py`：读取仓库、作者网站、论文及 12 个近期 X 原帖镜像；原 X 直读错误已记录。
- `D:/miniforge3/python.exe -X utf8 work/download-oct01.py`：8 个文件完成检查，两份原文件字节数不足，未当作成功。
- `D:/miniforge3/python.exe -X utf8 work/range-retry-oct01.py`、`work/verify-ranges-oct01.py`：按 HTTP Content-Range 完整重取两份失败原文件，逐段字节数匹配，重组后全长解码通过；分别为 26,288,774 字节 / 60.05 秒、65,839,479 字节 / 82.93 秒。最终五个片段的 10 个 MP4 均通过全长解码、时长和 SHA-256 检查，未裁剪或转码。
- `D:/miniforge3/python.exe -X utf8 work/publish-oct01.py`、`work/verify-release-oct01.py`：公开 [media-2026-10-01](https://github.com/carpentry-liu/awesome-astra-3d/releases/tag/media-2026-10-01) 的 10 个文件大小、digest 和下载地址匹配。发布响应曾中断，回读确认已公开；复用相同 tag 和已上传资产恢复，没有重复创建。
- `npm run check`：229 条数据验证、11 项测试和 TypeScript 通过。
- `npm run build`：成功导出首页及目录，9 个首页资源引用检查通过。沿用已有大包体积提示、构建插件耗时提示及 Node DEP0190 警告。
- 真实浏览器：Pelagic 场景加载后点击 Below，海底鱼群可见，控制台为空；八张新案例图全部加载并取得非零尺寸。桌面 1440 × 1100 与手机 390 × 844 视口下无横向溢出；本地控制台 warn/error 为空。
- 实拍：[首页](../../media/homepage-2026-10-01.jpg)、[最新案例](../../media/collection-2026-10-01.jpg)、[手机首页](../../media/mobile-2026-10-01.jpg)。截图等待图片加载、滚动稳定后保存，没有用生成图替代网页。
- 独立只读复核：八条新增档案的来源、模型边界和日期无须修正；十个 MP4 的实际字节数、SHA-256、媒体 ID、封面与源时长一致。旧 221 条案例和旧 202 个媒体记录逐条不变。

构建与数据验证证据、原文、媒体核验、布局和控制台结果保存在忽略目录 `work/refresh-2026-10-01/`。部署及线上完整播放将在实际完成后追加。
