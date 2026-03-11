import type { BenchmarkScore } from '../types/slides';

export const benchmarks: BenchmarkScore[] = [
  {
    name: 'SWE-bench Verified',
    opus46: 80.8, opus45: 80.9, sonnet45: 77.2, gemini3Pro: 76.2, gpt52: 80.0,
    unit: '%', description: 'Real-world software engineering tasks verified by human engineers (500 problems)',
    category: 'coding',
  },
  {
    name: 'SWE-bench Multilingual',
    opus46: 77.8, opus45: 74.0, sonnet45: 67.5, gemini3Pro: undefined, gpt52: undefined,
    unit: '%', description: '300 problems across 9 programming languages',
    category: 'coding',
  },
  {
    name: 'Terminal-Bench 2.0',
    opus46: 65.4, opus45: 59.8, sonnet45: 51.0, gemini3Pro: 56.2, gpt52: 64.7,
    unit: '%', description: 'Real-world terminal/command-line tasks (89 tasks, 15 trials each)',
    category: 'coding',
  },
  {
    name: 'OSWorld',
    opus46: 72.7, opus45: 66.3, sonnet45: 61.4, gemini3Pro: undefined, gpt52: undefined,
    unit: '%', description: 'Real-world computer tasks on live Ubuntu VM (mouse + keyboard)',
    category: 'agentic',
  },
  {
    name: 'tau2-bench (Retail)',
    opus46: 91.9, opus45: 88.9, sonnet45: 86.2, gemini3Pro: 85.3, gpt52: 82.0,
    unit: '%', description: 'Retail customer service agent simulation',
    category: 'agentic',
  },
  {
    name: 'tau2-bench (Telecom)',
    opus46: 99.3, opus45: 98.2, sonnet45: 98.0, gemini3Pro: 98.0, gpt52: 98.7,
    unit: '%', description: 'Technical support agent simulation',
    category: 'agentic',
  },
  {
    name: 'OpenRCA',
    opus46: 34.9, opus45: 26.9, sonnet45: 12.9, gemini3Pro: undefined, gpt52: undefined,
    unit: '%', description: 'Root cause analysis across 335 enterprise software failures',
    category: 'agentic',
  },
  {
    name: 'ARC-AGI-2',
    opus46: 68.8, opus45: 37.6, sonnet45: 13.6, gemini3Pro: 45.1, gpt52: 54.2,
    unit: '%', description: 'Fluid intelligence: novel pattern recognition from few examples',
    category: 'reasoning',
  },
  {
    name: 'GPQA Diamond',
    opus46: 91.3, opus45: 87.0, sonnet45: 83.4, gemini3Pro: 91.9, gpt52: 93.2,
    unit: '%', description: 'Graduate-level science questions (198 Diamond subset)',
    category: 'knowledge',
  },
  {
    name: 'AIME 2025',
    opus46: 99.8, opus45: 93.0, sonnet45: 85.0, gemini3Pro: undefined, gpt52: undefined,
    unit: '%', description: 'American Invitational Mathematics Examination (possibly contaminated)',
    category: 'reasoning',
  },
  {
    name: 'MMMLU',
    opus46: 91.1, opus45: 90.8, sonnet45: 89.5, gemini3Pro: 91.8, gpt52: 89.6,
    unit: '%', description: 'Multilingual knowledge across 57 subjects and 14 languages',
    category: 'knowledge',
  },
  {
    name: 'MMMU-Pro',
    opus46: 73.9, opus45: 70.6, sonnet45: 63.4, gemini3Pro: 81.0, gpt52: 79.5,
    unit: '%', description: 'Multimodal understanding (no tools)',
    category: 'multimodal',
  },
  {
    name: 'MMMU-Pro (tools)',
    opus46: 77.3, opus45: 73.9, sonnet45: 68.9, gemini3Pro: undefined, gpt52: 80.4,
    unit: '%', description: 'Multimodal understanding with tool access',
    category: 'multimodal',
  },
  {
    name: 'BrowseComp',
    opus46: 84.0, opus45: 64.0, sonnet45: 40.0, gemini3Pro: undefined, gpt52: 72.0,
    unit: '%', description: 'Finding specific facts from large, unstructured web documents',
    category: 'search',
  },
  {
    name: 'DeepSearchQA',
    opus46: 91.3, opus45: 82.0, sonnet45: 70.0, gemini3Pro: undefined, gpt52: 85.0,
    unit: '%', description: 'Multi-hop question-answering over dense reference material (F1)',
    category: 'search',
  },
  {
    name: 'MCP-Atlas',
    opus46: 59.5, opus45: 62.3, sonnet45: 43.8, gemini3Pro: 54.1, gpt52: 60.6,
    unit: '%', description: 'Multi-step tool workflows',
    category: 'agentic',
  },
  {
    name: 'Finance Agent',
    opus46: 60.7, opus45: 55.2, sonnet45: 55.3, gemini3Pro: undefined, gpt52: undefined,
    unit: '%', description: 'SEC filings research on public companies (Vals AI)',
    category: 'finance',
  },
  {
    name: 'Vending-Bench 2',
    opus46: 8018, opus45: 6500, sonnet45: 4200, gemini3Pro: 5478, gpt52: undefined,
    unit: '$', description: 'Simulated year-long business operations (final balance from $500)',
    category: 'finance',
  },
  {
    name: 'CyberGym',
    opus46: 66.6, opus45: 51.0, sonnet45: 40.0, gemini3Pro: undefined, gpt52: undefined,
    unit: '%', description: 'Vulnerability reproduction across 1,507 real vulnerabilities',
    category: 'coding',
  },
  {
    name: 'LAB-Bench FigQA',
    opus46: 78.3, opus45: 72.0, sonnet45: 65.0, gemini3Pro: undefined, gpt52: undefined,
    unit: '%', description: 'Scientific figure question answering (surpasses human experts at 77%)',
    category: 'multimodal',
  },
];

export const effortScaling = [
  { effort: 'Low', terminalBench: 55.1, tokenReduction: '40% fewer tokens' },
  { effort: 'Medium', terminalBench: 61.1, tokenReduction: '23% fewer tokens' },
  { effort: 'High', terminalBench: 63.0, tokenReduction: '' },
  { effort: 'Max', terminalBench: 65.4, tokenReduction: 'Full compute' },
];

export const radarData = [
  { axis: 'Coding', opus46: 80.8, opus45: 80.9, gemini3Pro: 76.2, gpt52: 80.0 },
  { axis: 'Agentic', opus46: 72.7, opus45: 66.3, gemini3Pro: 70, gpt52: 70 },
  { axis: 'Reasoning', opus46: 68.8, opus45: 37.6, gemini3Pro: 45.1, gpt52: 54.2 },
  { axis: 'Knowledge', opus46: 91.3, opus45: 87.0, gemini3Pro: 91.9, gpt52: 93.2 },
  { axis: 'Multimodal', opus46: 77.3, opus45: 73.9, gemini3Pro: 81, gpt52: 80.4 },
  { axis: 'Search', opus46: 84.0, opus45: 64.0, gemini3Pro: 60, gpt52: 72.0 },
];
