# Astra 3D Atlas

独立 Git 根；不修改父工作区或复制上游源码。先读 README.md、DESIGN.md 与 docs/README.md。

- `data/cases.json` 是案例事实源；不能用 GPT Image 2 冒充 Astra，未知日期和提示词保持 null。
- `app/` 为网站，`src/` 为筛选与数据契约，`scripts/` 为验证与目录生成。
- 图片引用原站，不将第三方媒体纳入代码许可证；原始提示词仅摘录短句或链接回源。
- 必跑 `npm run check`、`npm run build`。UI 需宽屏/移动真实截图和控制台检查。
- 来源变化只更新有证据的字段；社媒转述与原作者声明分级，声明不能标为独立复现。
