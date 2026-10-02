# 从一个公开工程开始，完成自己的第一个小改动

[浏览作品库](https://carpentry-liu.github.io/awesome-astra-3d/) · [English guide](START_HERE.en.md) · [最新收录](UPDATES.md)

先选你想拿到的材料，再做一个可观察的小改动。以下入口指向作者公开文件和说明；本库没有逐一复现第三方工程。先核对原项目许可、软件版本、外部资产与运行要求。

| 想得到什么 | 从哪里开始 | 第一步 |
| --- | --- | --- |
| 可编辑的 Blender 场景 | [鹈鹕骑车工程](https://github.com/simonw/gpt-6-astra-blender-pelican-bicycle) | 对照三轮 `.blend` 与对话记录，选择一轮打开 |
| 能接到网页的模型 | [Orbital Core 工程](https://github.com/wangruofeng/orbital-core-showcase) | 对照 `.blend`、GLB 与网页加载代码 |
| 可以继续研究的游戏 | [Mosswing 目录](https://github.com/Ayi1337/gpt6-astra-one-shot-games/tree/main/mosswing) | 先读作者任务与 HTML，找输入处理对应的代码 |

<a id="blender"></a>

## 打开一个 `.blend`，改材质或镜头

**材料：**Simon Willison 的[三轮模型、Python 脚本与完整对话](https://github.com/simonw/gpt-6-astra-blender-pelican-bicycle)。[作品档案](https://carpentry-liu.github.io/awesome-astra-3d/cases/simonw-pelican-bicycle/)保留来源和模型说明。

**第一步：**读作者说明，下载其中一轮 `.blend`，在自己的 Blender 中检查对象、材质与相机。对照上一轮记录，先理解作者的修改，再保存自己的副本。

**本库练习：**只改一个材质颜色，或把相机略向左移动，比较修改前后的画面。记录实际文件与 Blender 版本；这是练习建议，不是作者原始提示词。

[继续看 Blender 专题](https://carpentry-liu.github.io/awesome-astra-3d/topics/blender/)

<a id="web"></a>

## 把一个 GLB 接到网页，改一项交互

**材料：**[Orbital Core Showcase](https://github.com/wangruofeng/orbital-core-showcase) 中的 `.blend`、`.glb`、Three.js 代码与作者部署说明。[作品档案](https://carpentry-liu.github.io/awesome-astra-3d/cases/ruofeng-orbital-core/)含演示和完整录像。

**第一步：**找到网页加载 GLB 的位置，再核对模型原点、材质与动画。按作者当前 README 配置环境和本地运行，确认已有场景可显示后再修改。具体命令以作者当前说明为准，环境仍需在本机检查。

**本库练习：**只调整一个旋转速度或相机初始距离，保留截图与自己的改动记录。先修改现有产物，再尝试扩展交互；练习说明不是原作者提示词。

[查看更多公开源码 / 工程](https://carpentry-liu.github.io/awesome-astra-3d/?resource=source#collection)

<a id="game"></a>

## 阅读一个游戏任务，追到对应代码

**材料：**[Mosswing](https://github.com/Ayi1337/gpt6-astra-one-shot-games/tree/main/mosswing) 的 HTML 产物与作者原始任务。在线演示可能有访问限制，公开代码入口与演示入口分别记录。

**第一步：**先读任务和运行说明，在代码中找到移动、碰撞或重开逻辑，选一项研究。按作者要求检查本地运行；需要网络服务的项目应先核对后端要求。

**本库练习：**在自己的副本中只改一个输入映射或移动参数，记录是否改变了预期行为。这是本库给出的阅读与修改练习，不承诺一次修改即可运行所有作品。

[浏览器游戏专题](https://carpentry-liu.github.io/awesome-astra-3d/topics/browser-games/)

---

<a id="advanced"></a>

## 进阶材料：按作品继续研究

下面保留已有模型、网页与游戏资料，便于完成第一步后继续比较流程。材料与限制来自各作者说明；较早核查记录不能替代当前文件检查。

### 更多模型与 Blender 工程

另一种模型制作路线：[Kiln / LANTERN S-4](https://github.com/matthew-kissinger/kiln/blob/main/examples/abyssal-surveyor.kiln.js) 用 JavaScript 建立深海探测器，可对照源码、GLB 与单件 `provenance.json` 研究曲面和装配。仅该作品明确归于 Astra；仓库其他作品使用不同模型。先读来源记录中的人工反馈与机械验证限制。

从 [Simon Willison 的鹈鹕骑车](https://github.com/simonw/gpt-6-astra-blender-pelican-bicycle) 入手。作者保留了三轮 `.blend`、Python 脚本与对话记录，适合对照“提出什么要求 → 哪些内容发生变化”。

建议第一次只做一个小改动，例如换材质或改镜头。先检查模型结构、外部素材依赖与作者环境，再尝试扩展场景。不要把渲染图当作已经拿到模型文件。

**可带走的材料：**工程、脚本、过程记录。

想练习精确修改，可以看 [Fieldnote R1 探测车](https://kingy.ai/blog/drawing-to-editable-3d-astra-blender-video-walkthrough/) 的基础工程、修改工程和 GLB。先查看作者记录的部件尺寸，再比较同一文件经过编辑后的变化；视频是后续核验回放，早期 Sol 基线与当前 Astra 续作分别保留。

想练建筑摄影，可以打开 [仙林校园](https://github.com/super-xinz/nju-xianlin-campus-3d) 的 Blender 工程，比较同一场景的八组取景和 38 秒漫游。模型是近似外观展示；拍摄脚本依赖已完成的工程。

想用自己的扫描资料重建空间，可以读 [Realsee × Astra × Blender](https://github.com/realsee-developer/realsee-astra-blender) 的快速提示词和教程。先检查墙、门窗与房间连接，再加家具；大文件通过 Git LFS 提供，完整原始扫描不在公开仓库中。公开脚本针对原案例，需要适配自己的资料。

想研究机器人视觉重建，可以读 [Real2Sim 三视角重放](https://github.com/hku-sail/Real2Sim_GPT6_ASTRA) 的任务提示、流程复盘和可编辑场景。复跑需要自行准备输入帧；模型中的相机、尺寸与动作来自视觉估计，30fps 是播放假设，不能当作真机运动恢复。

其他公开材料：[木漏日社](https://github.com/CwC-HydeX/komorebi-shrine) 提供可直接打开的神社工程与昼夜时间轴，适合练习灯光和镜头。它的 V2 工程可编辑，但制作脚本含本机路径，不能当作跨机器一键重建流程。

### 更多模型到网页的流程

角色集成案例：[AtAt Orb](https://atatapp.com/blog/how-i-built-atats-3d-orb-with-gpt-6-astra) 记录角色从 Blender 到 Three.js 与 Metal 的八种动作集成。适合研究分件、动作导出和真实显示尺寸下的反复修改；文章提供流程与在线角色，未公开完整工程。两端共享外置动画 JSON，GLB 本身不带动画片段。

[Orbital Core Showcase](https://github.com/wangruofeng/orbital-core-showcase) 同时包含 Blender 源文件、GLB 与 Three.js 网页。可以沿着文件结构看模型如何进入网页，以及旋转、缩放和不同动画模式如何连接到界面。

从一个已存在的 GLB 开始，检查材质、模型原点和动画，再改网页交互。这样每次修改都能在同一个产物上观察结果。

**可带走的材料：**`.blend`、`.glb`、前端代码、部署说明。[更多有源码案例](https://carpentry-liu.github.io/awesome-astra-3d/?resource=source#collection)

想直接在浏览器检查 `.blend`，可以从 [Pluribus 彩蛋](https://simonwillison.net/2026/Sep/9/blender-viewer/) 打开作者查看器和工程。网页会近似呈现材质与文字、忽略未应用修改器；完整外观仍需回到 Blender 检查。

想理解更轻的三维表现，可以看 [GENESIS AI Atlas](https://github.com/sayanpersonal123/AI-learning)：它把模型空间坐标投影到 Canvas 2D，而非使用 WebGL。适合研究旋转、深度排序与分步教学；场景是概念图，不是某个模型的真实内部结构。

想研究建筑网页，可以看 [苏州博物馆](https://github.com/vsme/suzhou-museum-three) 的独立建筑几何、GLB 与 Three.js 场景。公共文件树包含网页模型；README 中提到的部分离线 `.blend` 和校对渲染没有公开，先确认能取得的材料再安排复现。

其他公开材料：[入画·汴京](https://github.com/Rising1234Sun/qingmingshanghetu) 保留建模、GLB 导出、中文提示词整理与网页交互；[Grand Atelier](https://github.com/Anionex/grand-atelier) 则适合研究三维钢琴与 Web Audio 的连接。两者都是经过迭代的作品，收录不等于一次输入即可复现。

### 更多游戏与平台实现

游戏资产集成案例：[Belt Runner Godot 4 移植](https://github.com/nrivali/BeltRunnerGoDot4) 展示如何把作者归为 Astra 制作的 Blender / GLB 资产接入 Godot。9 月 17 日复查已推进至后续里程碑，包含近景 LOD 0、船体碰撞、雷达和配乐；先对照最新 README 与模型文件，机翼选择和船体配色仍待移植，原浏览器仓库当前不可访问，归因只覆盖已说明的资产。

想看单文件游戏，选择 [Mosswing](https://github.com/Ayi1337/gpt6-astra-one-shot-games/tree/main/mosswing)，配合仓库中的原始任务阅读。作者提供的在线演示可能有访问限制，HTML 产物另行公开。

想看多人交互，选择 [Smash Karts Arena](https://github.com/amsminn/gpt-6-astra-smash-karts)。它有客户端、服务器和公开的 agent 轨迹；联网对战需要服务器，不能把静态托管当成联机后端。

想看原生平台开发，选择 [FACET FIGHTER](https://github.com/GOROman/gpt-6-astra-ps1-game-benchmark)。作者公开了 PS1 源码、镜像和模拟器记录，实体主机验证另有边界。

**可带走的材料：**游戏代码、作者的输入要求、运行说明与已有验证证据。

想研究本地同屏玩具游戏，可以读 [Toy2Game](https://github.com/asmoyou/toy2game) 的大厅、各款游戏与验证说明。当前六款游戏按一个作品集收录；代码使用非商业许可，商业用途需要作者另行授权。

## 看视频时顺手检查

[H3 Max Blender](https://github.com/gokayfem/H3-Max-Blender) 提供另一种路线：Astra 编写 Blender 演示脚本，H3 生成风格化视频。先读作者对几何一致性、剪辑展示和付费请求的说明；生成视频的细节不能当作可编辑网格。

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

## 进阶：驾驶游戏与混合工作流

- [Cabsolutely 源码](https://github.com/ilkerzg/cabsolutely)：对照城市、车辆、角色 GLB 与驾驶逻辑研究浏览器游戏；作者使用 Astra 与 fal，不能把全部资产归于单个模型。
- [Hezo 制作过程](https://hiddentao.com/archives/2026/09/16/building-a-high-fidelity-3d-realtime-rendered-background-scene-using-fable-and-astra/)：参考视频 → Fable 布局 → Astra 场景代码 → Opus 优化，适合研究滚动驱动的 Three.js / WebGPU 场景；这是作者的制作记录，性能未由本库独立复现。
