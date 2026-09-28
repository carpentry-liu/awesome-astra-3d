# F-0021 · 9 月 28 日：城市与历史场景

基线 7ada324，工作区干净；检索近期网页、X、Reddit 与作者博客。发现 Routine labo 于 9 月 27 日发表的京都、桶狭间、涩谷三项制作实测。分别核对作者效果图；只有实际媒体可加载的作品进入目录。人物的 Tripo / Mixamo 分工保留，历史解释和模拟数值不视为独立验证。

Falcon 9 多模型对照仅看到任务规范与外部视频链接，未确认可直接展示的 Astra 结果图，暂不收录。无新增可核验的 X 录像，不把静态图计入归档视频。

范围：事实源、精选、README、实拍与 GitHub Pages；不改依赖、布局或播放器，不部署 ChatGPT Sites。原 208 条与 97 段录像保持不变。Git 可回滚。

## 实际验证

- `npm run check`：210 条数据、11 项测试与 TypeScript 均通过。
- `npm run build`：静态构建、导出首页及 9 个资源引用验证成功，保留已有体积和 Node 弃用提示。
- `python work/finish-sep28.py`：原 208 条逐对象不变、视频清单不变；新增图在实际页面加载为 1920 × 1080。
- 首页、最新列表与手机实拍已检查，手机无横向溢出；控制台 warn/error 为空。
- 涩谷图两次 HTTPS 握手超时，未收录；仅追加本次两图审计，不更改历史媒体检查日期。

## 发布结果

- 内容提交 `bf642fa` 已推送 main；[Actions 36367357129](https://github.com/carpentry-liu/awesome-astra-3d/actions/runs/36367357129) 的 build / deploy 均成功。
- `python work/published-sep28.py`：正式站 210 条数据逐对象匹配本地，今日两例已上线。
- `python work/readme-check-sep28.py`：中英文 README 远端一致、9 个图片标签存在，三张新实拍字节一致。
- `python work/about-sep28.py`：公开仓库 About 更新为 198 / 54 / 83 / 97。
- 本次预览标签页与本地开发进程已关闭，未部署 ChatGPT Sites。
