# 10 月 3 日下午：补充检索与可见作品

## 范围与方案

上午更新已经发布；本轮从干净的 `a0cc476` 开始，基线为 244 条档案（232 Astra + 12 方法参考）、110 段完整录像。再次搜索 GitHub、X、Reddit、Zenn、作者网站等来源，与上午及历史作品去重。只有作者模型声明和实际可见输出都能核实时才收录，历史作品保留真实发表日期，今日收录不改写为今日发表。

优先补充公开三维工程、互动演示和先前访问失败的作品；比较实验保留设置、输入和作者自报的边界，不从单次结果推导通用排名。X 新视频继续遵守完整下载、原版与播放版校验及 Release 发布要求；没有合格的新片段时保持完整录像数量。第三方图片外链原作者并保留权利说明。

增量更新 JSON 事实源、中英文目录与 README，更新真实案例区和详情截图，保持六件首页精选。运行数据检查、行为测试、TypeScript、lint、普通和 Pages 构建；浏览器检查新增图片、手机布局和控制台。只发布 GitHub Pages，不部署 ChatGPT 站点或向社区发帖。改动可通过 Git / Pages 历史回滚。

## 调研、验证与发布

本轮新增 WorldGen、Orbit Lab 和 DrLee 拉伸试样三条；合计 247 条（235 Astra + 12 方法参考）、63 条源码 / 工程入口、92 个演示入口、110 段完整录像。旧 244 条逐条未改，媒体清单未改。

浏览器发现英文手机页面横向溢出：三个不可换行的页签合计宽于容器，`Curation notes` 撑至 416px，而视口为 390px。将手机页签容器设为横向滚动，让所有入口仍可操作且不会撑宽整页；保持已有页签文案、宽屏和筛选契约。

## 来源与验证

- 原作者研究：WorldGen 的两张 Blender 场景 / 建筑图、Orbit Lab 的 Astra 独立地球图、DrLee 的最终试样 WebP 均实际查看。Orbit 独立演示在浏览器可见太阳、地球、月球与轨道，warn/error 为空；未完整测试演示交互或复现生成。
- 日期与分工：WorldGen 首发未知保持 null，Astra 规划和少量地标、参数生成器网格与 Unity 环境效果分开；Orbit 9 月 24 日发表、23 日执行且每模型一次；DrLee 9 月 8 日发表，初步手动运行脚本，后续解决权限后由 Astra 操作，未验证标准符合性。
- 去重与排除：Reddit 火箭对比与已收录 Lebo 作品内容吻合，未增加跨帖重复；LDraw 工具共同开发但示例具体归属不足，Bilibili MMD 混合模型分工与正片未充分核验，保持未采用。X、小红书未确认合格新原创作品，不把检索日写成作品发表日。
- `D:/miniforge3/python.exe -X utf8 work/refresh-2026-10-03-afternoon/link-audit.py`：新增三条的 9 个去重主入口均 reachable，3 图 HTTP 200。增量记录追加到历史审计，历史全库日期未改。
- `npm run check`：247 条来源数据、19 项行为测试和 TypeScript 通过；首次运行发现尚未生成索引，执行 `npm run catalog` 后通过。页签修正后再次通过。
- `npm run lint`：通过，页签修正后再次通过。
- `npm run build`：最终普通构建通过，494 个中英文案例页、8 专题、14 目录；516 个静态页、11,058 个本地引用、247 详情 JSON、517 sitemap URL 通过检查。没有新依赖或新测试；实际浏览器覆盖 CSS 行为。
- `$env:GITHUB_PAGES='true'; npm run build`：最终 Pages 前缀导出通过相同检查；本地交互使用普通构建，避免发布前的生产绝对脚本地址干扰验证。
- 浏览器：桌面 1440 × 1100、新增三图实际尺寸均非零、最新收录地址与滚动定位正常；中文 390 × 844 无横向溢出。英文页签修正后在 390px、320px 均无整页溢出，点击 `Curation notes` 与返回 `Astra works 235` 成功，控制台 warn/error 为空。一次测试定位器使用了与实际不同的英文词，读取当前页签后纠正，没有改动产品文案。
- 中英文 README 使用最终首页、案例区、手机、Orbit 档案真实实拍，文件为 `docs/media/*-2026-10-03-afternoon.jpg`；`public/share.jpg` 使用同一首页图。历史上午图保留。
- 独立只读复核：三条事实、日期、分工、封面与生成 README 统计一致，无重复；`work/final-oct03-afternoon.py` 核对旧 244 条与媒体逐条 / 字节不变、公开 JSON 与 README 图片引用正确。`git diff --check` 通过。

## GitHub Pages 发布

- `git commit` 与 `git -c http.version=HTTP/1.1 push origin main`：实施提交 `01629c7` 正常推送，包含本轮三条、页签修正与四张截图。仓库公开，About 的长期介绍与主页地址仍准确。
- `D:/miniforge3/python.exe -X utf8 work/ci-oct03-afternoon.py`：[Pages 工作流 37102075750](https://github.com/carpentry-liu/awesome-astra-3d/actions/runs/37102075750) 的 build、deploy 与整轮结果均 success；现有完整录像下载 / 字节与 SHA 校验步骤也成功。
- `D:/miniforge3/python.exe -X utf8 work/published-oct03-afternoon.py`：线上 247 条 JSON 与本地逐条一致；新增三条详情 JSON、六个中英文静态案例页的 canonical、实际图地址与过程说明通过。517 个 sitemap URL、分享封面、首页三段脚本的 HTTP / 类型 / 内容检查通过。中英文 README 统一行尾后与公开仓库一致，四张 JPG 按字节完全相同。
- `D:/miniforge3/python.exe -X utf8 work/verify-github-afternoon.py`：公开状态、About / 主页地址、两份 README 与四张实拍再次独立核对通过。
- 公开 Pages 浏览器实拍显示 235 数量、WorldGen、Orbit Lab 与拉伸试样的实际图片。默认浏览器尺寸已恢复，最新收录页保留供浏览；本地服务器与临时作者 / 本地页均已关闭。远程完整交互与控制台未重复检查，本地最终普通构建的行为和控制台结果单独列于上文。
- `D:/miniforge3/python.exe -X utf8 work/final-oct03-afternoon.py` 与 `git diff --check`：发布前数据、旧档案、媒体、生成物、README 与分支检查通过。真实截图与发布证据位于忽略目录 `work/refresh-2026-10-03-afternoon/`。本发布记录以单独文档提交补齐，不重复触发站点构建。
