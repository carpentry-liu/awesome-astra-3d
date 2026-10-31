# 文档入口

| 文档 | 用途 |
| --- | --- |
| [长期设计](../DESIGN.md) | 产品边界、架构、链接和媒体契约 |
| [维护说明](maintenance.md) | 日常收录、媒体核查、生成、验证与发布 |
| [当前网站实拍](media/README.md) | 中英文 README 共用的四张真实截图 |
| [贡献要求](../CONTRIBUTING.md) | 案例字段、模型证据与权利 |
| [初始需求](requirements/R-0001-astra-3d-atlas.md) · [扩充需求](requirements/R-0002-catalog-growth.md) | 收录和公开材料的验收范围 |
| [仓库审查与清理](refactoring/REF-0001-repository-cleanup/01-动机与方案.md) | 清理无消费者的组件、依赖与旧文档 |
| [生成与发布审查](refactoring/REF-0002-catalog-build/01-动机与方案.md) · [验证](refactoring/REF-0002-catalog-build/03-验证.md) | 专题与模板分离、首次启动、PR 检查和录像下载 |

案例事实以 `data/cases.json` 为准，完整视频以 `data/videos.json` 为准。来源研究、链接与媒体检查仍保留在 `data/`；下架案例的原始字段与原因保留于 [审核档案](archive/unlisted-cases-2026-09-25.json)。

过期阶段日志、营销草稿与已替换截图从 Git 历史恢复，不继续堆积在当前目录。新的非平凡功能或重构先在 `features/` 或 `refactoring/` 记录可评审方案，完成后将长期约束归入设计或维护说明。
