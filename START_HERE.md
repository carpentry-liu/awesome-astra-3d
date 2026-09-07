# 从一个能继续修改的作品开始

[浏览全部](https://carpentry-liu.github.io/awesome-astra-3d/) · [English overview](README.en.md) · [最新收录](UPDATES.md)

先按想拿到的产物选路线。这里链接的是作者公开材料；本库没有逐一复现第三方工程。

## 路线一：打开一个 Blender 工程

从 [Simon Willison 的鹈鹕骑车](https://github.com/simonw/gpt-6-astra-blender-pelican-bicycle) 入手。作者保留了三轮 `.blend`、Python 脚本与对话记录，适合对照“提出什么要求 → 哪些内容发生变化”。

建议第一次只做一个小改动，例如换材质或改镜头。先检查模型结构、外部素材依赖与作者环境，再尝试扩展场景。不要把渲染图当作已经拿到模型文件。

**可带走的材料：**工程、脚本、过程记录。

## 路线二：把三维模型接到网页上

[Orbital Core Showcase](https://github.com/wangruofeng/orbital-core-showcase) 同时包含 Blender 源文件、GLB 与 Three.js 网页。可以沿着文件结构看模型如何进入网页，以及旋转、缩放和不同动画模式如何连接到界面。

从一个已存在的 GLB 开始，检查材质、模型原点和动画，再改网页交互。这样每次修改都能在同一个产物上观察结果。

**可带走的材料：**`.blend`、`.glb`、前端代码、部署说明。[更多有源码案例](https://carpentry-liu.github.io/awesome-astra-3d/?resource=source#collection)

## 路线三：研究一个完整游戏

想看单文件游戏，选择 [Mosswing](https://github.com/Ayi1337/gpt6-astra-one-shot-games/tree/main/mosswing)，配合仓库中的原始任务阅读。作者提供的在线演示可能有访问限制，HTML 产物另行公开。

想看多人交互，选择 [Smash Karts Arena](https://github.com/amsminn/gpt-6-astra-smash-karts)。它有客户端、服务器和公开的 agent 轨迹；联网对战需要服务器，不能把静态托管当成联机后端。

想看原生平台开发，选择 [FACET FIGHTER](https://github.com/GOROman/gpt-6-astra-ps1-game-benchmark)。作者公开了 PS1 源码、镜像和模拟器记录，实体主机验证另有边界。

**可带走的材料：**游戏代码、作者的输入要求、运行说明与已有验证证据。

## 看视频时顺手检查

| 想判断的内容 | 可以找的证据 |
| --- | --- |
| 模型能否继续修改 | 工程文件、网格与材质结构，而不只是转台录屏 |
| 是否存在交互 | 作者提供的运行入口、输入过程与代码 |
| 是否一次完成 | 完整对话、修改记录；一次展示不能证明一次生成 |
| 是否从零生成 | 作者列出的既有模型、贴图、其他生成工具与上游项目 |
| 是否值得复现 | 当前可取得的文件、软件环境和已知限制 |

“完整视频”表示保存了原帖附带视频的全部时长，不表示包含作者全部开发过程。[播放完整视频](https://carpentry-liu.github.io/awesome-astra-3d/?resource=video#collection)

## 给自己的第一个实验留一个记录

```text
参考案例与原作者：
实际模型与运行环境：
输入素材：
原始任务：
做过的修改：
得到的文件：
真实运行结果：
尚未解决的问题：
```

这份模板只用于记录自己的实验，不是上述作者的原始提示词。有了真实结果后，可以通过 [案例投稿](https://github.com/carpentry-liu/awesome-astra-3d/issues/new?template=case.yml) 补充到索引。
