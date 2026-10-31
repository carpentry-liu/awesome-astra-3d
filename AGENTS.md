# Astra 3D Atlas

独立 Git 根；不修改父工作区或复制上游源码。先读 README.md、DESIGN.md 与 docs/README.md。

- `data/cases.json` 是案例事实源；不能用 GPT Image 2 冒充 Astra，未知日期和提示词保持 null。
- `app/` 为交互网站，`src/` 放筛选、站点和数据契约。专题选集在 `data/topics.json`；静态页面的路由、文案与模板在 `scripts/static-pages/`，生成与验证入口在 `scripts/`。
- 图片优先引用原站。原帖封面无法展示成果时，可将完整来源录像的实际截帧归档至 Release，标注来源和截帧时间，不提交媒体到代码目录；不将第三方媒体纳入代码许可证。原始提示词仅摘录短句或链接回源。
- 必跑 `npm run check`、`npm run build`。UI 需宽屏/移动真实截图和控制台检查。
- 来源变化只更新有证据的字段；社媒转述与原作者声明分级，声明不能标为独立复现。
