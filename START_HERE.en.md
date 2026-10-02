# Start with a public project and make one small change

[English gallery](https://carpentry-liu.github.io/awesome-astra-3d/?lang=en) · [中文指南](START_HERE.md) · [Latest additions](UPDATES.md)

Choose the material you want first. These are links to creator-published projects, not a claim that every project has been reproduced by this collection. Check the original license, software version, external assets and current instructions before using them.

| What you want | Project | First action |
| --- | --- | --- |
| An editable Blender scene | [Pelican on a bicycle](https://github.com/simonw/gpt-6-astra-blender-pelican-bicycle) | Compare the three `.blend` iterations with the conversations, then open one |
| A model for a web page | [Orbital Core](https://github.com/wangruofeng/orbital-core-showcase) | Locate the `.blend`, GLB and page code that loads the model |
| A game to study | [Mosswing](https://github.com/Ayi1337/gpt6-astra-one-shot-games/tree/main/mosswing) | Read the creator's task and HTML, then locate its input handling |

<a id="blender"></a>

## Open a `.blend` and adjust a material or camera

**Materials:** Simon Willison's [three model iterations, Python scripts and conversations](https://github.com/simonw/gpt-6-astra-blender-pelican-bicycle). The [case page](https://carpentry-liu.github.io/awesome-astra-3d/en/cases/simonw-pelican-bicycle/) records attribution and model evidence.

**First action:** Read the creator's notes, download one `.blend` and inspect its objects, materials and cameras in your Blender installation. Compare the previous conversation before saving your own copy.

**Collection exercise:** Change one material color, or move the camera slightly to the left. Compare the before and after views and record your actual file and Blender version. This is our practice suggestion, not the creator's original prompt.

[More Blender projects](https://carpentry-liu.github.io/awesome-astra-3d/en/topics/blender/)

<a id="web"></a>

## Connect a GLB to a page and change one interaction

**Materials:** [Orbital Core Showcase](https://github.com/wangruofeng/orbital-core-showcase) provides `.blend`, `.glb`, Three.js code and deployment notes. The [case page](https://carpentry-liu.github.io/awesome-astra-3d/en/cases/ruofeng-orbital-core/) also links to the demo and complete posted clip.

**First action:** Find the GLB loading code, then inspect the model origin, materials and animation. Set up the project using its current README, check that the existing scene displays, and only then make a change. Exact commands depend on the creator's current project and your environment.

**Collection exercise:** Adjust one rotation speed or the camera's initial distance. Keep a screenshot and a note of your change. This is an exercise for the existing project, not an unpublished creator prompt.

[More public source / project links](https://carpentry-liu.github.io/awesome-astra-3d/?lang=en&resource=source#collection)

<a id="game"></a>

## Read a game task and trace it through the code

**Materials:** [Mosswing](https://github.com/Ayi1337/gpt6-astra-one-shot-games/tree/main/mosswing) includes an HTML artifact and the creator's task. The online demo can have access restrictions; public code and demo access are separate resources.

**First action:** Read the task and run instructions. Find movement, collision or restart handling and choose one to study. Follow the author's setup requirements; multiplayer projects may also need a server.

**Collection exercise:** In your own copy, change one input mapping or movement parameter. Record whether the behavior changed as expected. This is a reading and modification exercise proposed by the collection.

[Browser game topic](https://carpentry-liu.github.io/awesome-astra-3d/en/topics/browser-games/)

## Continue with other materials

The [Chinese advanced guide](START_HERE.md#advanced) retains the full collection of previous starting points and source limitations. A few useful directions:

| Direction | Materials and limits |
| --- | --- |
| Model construction | [Kiln / LANTERN S-4](https://github.com/matthew-kissinger/kiln/blob/main/examples/abyssal-surveyor.kiln.js) offers JavaScript, GLB and per-object provenance; only this example is attributed to Astra |
| Lighting and cameras | [Komorebi Shrine](https://github.com/CwC-HydeX/komorebi-shrine) has an editable V2 scene and day/night timeline; its scripts include local paths |
| Scan-based reconstruction | [Realsee × Astra × Blender](https://github.com/realsee-developer/realsee-astra-blender) provides prompts and a tutorial; full original scans are not public and large files use Git LFS |
| Character integration | [AtAt Orb](https://atatapp.com/blog/how-i-built-atats-3d-orb-with-gpt-6-astra) explains Blender, Three.js and Metal integration; the full project is not published |
| Architectural web scenes | [Suzhou Museum](https://github.com/vsme/suzhou-museum-three) publishes geometry, GLB and Three.js code; some offline `.blend` materials are not public |
| Multiplayer games | [Smash Karts](https://github.com/amsminn/gpt-6-astra-smash-karts) includes client, server and agent traces; multiplayer needs a backend |
| Game assets in another engine | [Belt Runner Godot 4](https://github.com/nrivali/BeltRunnerGoDot4) integrates assets the creator attributes to Astra; remaining porting work and attribution limits are recorded in the guide |
| Local multiplayer | [Toy2Game](https://github.com/asmoyou/toy2game) has six games collected as one project; its code uses a noncommercial license |

## Inspect the evidence while watching

| What you want to know | Evidence to look for |
| --- | --- |
| Can the model be edited? | Project files, meshes and material structure, beyond a turntable clip |
| Is the scene interactive? | A run entry point, recorded inputs and code |
| Was it made in one attempt? | Full conversations and revision history |
| Was it built from scratch? | Existing assets, other tools and upstream projects named by the creator |
| Can you continue the project? | Available files, environment requirements and known limits |

“Complete video” means the entire posted clip, not the creator's entire development process. [Watch complete clips](https://carpentry-liu.github.io/awesome-astra-3d/?lang=en&resource=video#collection).

## Keep a record of your first experiment

```text
Reference case and creator:
Actual model and environment:
Input materials:
Your task:
Changes made:
Files obtained:
Observed result:
Unresolved issues:
```

This template records your experiment; it is not an original prompt from any listed creator. Once you have a real result, [submit a case](https://github.com/carpentry-liu/awesome-astra-3d/issues/new?template=case.yml) with attribution and verifiable materials.
