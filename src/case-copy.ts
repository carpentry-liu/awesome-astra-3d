import type { Locale } from './catalog';

export type DetailStatusField =
  | 'promptAvailability'
  | 'outcome'
  | 'evidenceStatus';

// Translate stored status codes; retain authored notes without inventing facts.
const statusCopy: Record<
  DetailStatusField,
  Record<string, readonly [string, string]>
> = {
  promptAvailability: {
    'not-found': [
      '未找到公开的原始提示词。',
      'No public original prompt was found.',
    ],
    linked: [
      '已记录提示词或过程入口；完整内容请回源核对。',
      'A prompt or process link is recorded. Check the source for its complete context.',
    ],
    full: [
      '完整提示词见原始来源；请保留原文上下文。',
      'The complete prompt is linked at the original source. Read it in context.',
    ],
    'brief-summary-only': [
      '仅有任务摘要，未取得完整原始提示词。',
      'Only a task summary is available; the complete original prompt was not obtained.',
    ],
    'full-prompt-on-source': [
      '原始来源公开完整提示词；本页仅保留短摘录或摘要。',
      'The source provides the complete prompt; this page keeps only a short excerpt or summary.',
    ],
    'full-linked': [
      '已记录完整提示词入口；请回原文查看。',
      'A link to the complete prompt is recorded. Read the original source.',
    ],
    partial: [
      '仅公开部分提示词或任务要求，不能视为完整上下文。',
      'Only part of the prompt or task requirements is public, not the full context.',
    ],
    'linked-unreadable': [
      '已记录原始提示词入口，但本次未能读取全文。',
      'The original prompt link is recorded, but its full text could not be read during the check.',
    ],
    'full-prompt-in-repository': [
      '仓库收录完整提示词；请回仓库核对上下文。',
      'The repository includes the complete prompt. Read it there in context.',
    ],
    'full-prompt-and-reply-links-in-repository': [
      '仓库收录完整提示词与回复入口；请回源核对上下文。',
      'The repository includes the complete prompt and reply links. Check their original context.',
    ],
    'full-prompt-and-reply-link-in-repository': [
      '仓库收录完整提示词与回复入口；请回源核对上下文。',
      'The repository includes the complete prompt and a reply link. Check their original context.',
    ],
    'full-prompt-in-repository-and-source-linked': [
      '仓库收录完整提示词并附来源入口；请核对原文。',
      'The repository includes the complete prompt and a source link. Check the original text.',
    ],
    'author-description': [
      '仅记录作者描述，未找到完整原始提示词。',
      'Only the creator’s description is recorded; no complete original prompt was found.',
    ],
    excerpt: [
      '仅提供原文短摘录；完整上下文请回原始来源。',
      'Only a short original excerpt is provided. Visit the source for its full context.',
    ],
  },
  outcome: {
    showcase: [
      '作品效果展示；本库未独立复现生成过程。',
      'Work showcase; this collection has not independently reproduced its generation process.',
    ],
    comparison: [
      '对照展示；本库未独立复现或重跑评测。',
      'Comparison showcase; this collection has not independently reproduced the work or rerun the evaluation.',
    ],
    'showcase-with-limitations': [
      '作品展示含已知局限；具体限制见来源与证据说明。',
      'The showcase has known limitations. See the source and evidence notes for details.',
    ],
    reference: [
      '独立方法参考；不计入 Astra 案例，也不代表已验证模型归属。',
      'Separate method reference, excluded from Astra cases; its model attribution is not independently verified.',
    ],
  },
  evidenceStatus: {
    'author-repo-readme': [
      '作者仓库 README 提供模型归属声明；不代表独立复现。',
      'The creator’s repository README provides a model attribution statement, not independent reproduction.',
    ],
    'official-astra': [
      '官方来源标注 Astra；具体生成与验证边界见证据说明。',
      'An official source labels the work Astra. See the evidence notes for generation and verification limits.',
    ],
    'explicit-astra': [
      '来源明确提到 Astra；具体模型设置以原文为准，未独立复现。',
      'The source explicitly mentions Astra. Consult the original model settings; the work is not independently reproduced.',
    ],
    'source-available-author-attributed': [
      '作者公开源码并提供模型归属声明；本库未独立复现。',
      'Public source code and a creator attribution statement are available; this collection has not independently reproduced the work.',
    ],
    'first-party-live-demo-and-prompt': [
      '作者提供演示与提示词或任务材料；不代表本库独立复现。',
      'The creator provides a demo and prompt or task materials; this is not independent reproduction by the collection.',
    ],
    'reference-only-non-astra': [
      '独立方法参考，没有可核实的 Astra 归属，不计入 Astra 案例。',
      'Separate method reference without verified Astra attribution, excluded from Astra cases.',
    ],
    'reference-only-model-mismatch': [
      '独立方法参考，没有可核实的 Astra 归属，不计入 Astra 案例。',
      'Separate method reference without verified Astra attribution, excluded from Astra cases.',
    ],
    'mirror-astra': [
      '依据原帖镜像或转引中的 Astra 声明；原始读取与核查限制见证据说明。',
      'Attribution relies on an Astra statement in a mirror or quotation. See the evidence notes for source-access and verification limits.',
    ],
    'mirror-astra-statement': [
      '镜像保留作者的 Astra 声明；工具分工与未核实部分见证据说明。',
      'A mirror retains the creator’s Astra statement. See the evidence notes for tool roles and unverified details.',
    ],
  },
};

export function readerStatus(
  field: DetailStatusField,
  value: unknown,
  locale: Locale,
): string {
  const unknown =
    locale === 'en' ? 'Not public / unverified' : '未公开 / 未核实';
  if (typeof value !== 'string' || !value.trim()) return unknown;
  const copy = statusCopy[field];
  if (Object.hasOwn(copy, value)) return copy[value][locale === 'en' ? 1 : 0];
  return /^[a-z][a-z0-9_-]*$/iu.test(value) ? unknown : value;
}
