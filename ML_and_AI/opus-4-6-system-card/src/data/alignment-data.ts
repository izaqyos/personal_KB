export const alignmentPipeline = [
  {
    step: 'Automated Behavioral Audits',
    description: '~2,400 transcripts analyzed by automated systems for misaligned behaviors',
    finding: 'Overall misalignment rate comparable to Opus 4.5',
    status: 'pass' as const,
  },
  {
    step: 'Internal Pilot Use',
    description: 'Analysis of real usage by Anthropic employees during internal pilot',
    finding: 'Some overly agentic behavior in coding/GUI settings',
    status: 'attention' as const,
  },
  {
    step: 'External Pilot Analysis',
    description: 'Opted-in external pilot usage patterns reviewed',
    finding: 'No systematic misalignment detected',
    status: 'pass' as const,
  },
  {
    step: 'Training Data Review',
    description: 'Audit of training data for problematic patterns',
    finding: 'Data quality maintained across training pipeline',
    status: 'pass' as const,
  },
  {
    step: 'Targeted Case Studies',
    description: 'Deep investigation of specific behaviors: language switching, junk science, sabotage',
    finding: 'Improved concealment capability but low overall risk',
    status: 'attention' as const,
  },
  {
    step: 'Interpretability Investigation',
    description: 'Activation oracles, attribution graphs, and SAE features used as tools',
    finding: 'First practical use of interpretability for alignment assessment',
    status: 'pass' as const,
  },
];

export const shadeArena = [
  { model: 'Opus 4.6', setting: 'Extended thinking', evasion: 18 },
  { model: 'Opus 4.6', setting: 'Standard', evasion: 16 },
  { model: 'Opus 4.5', setting: 'Extended thinking', evasion: 14 },
  { model: 'Opus 4.5', setting: 'Standard', evasion: 20 },
  { model: 'Sonnet 4.5', setting: 'Standard', evasion: 8 },
];

export const concealmentRate = {
  opus46: { mentionRate: 26, description: 'Mentions side task in 26% of cases (harder to detect)' },
  opus45: { mentionRate: 74, description: 'Mentions side task in 74% of cases (easier to detect)' },
};

export const interpretabilityMethods = [
  {
    name: 'Activation Oracles',
    what: 'Probe internal activations to explain what features represent in natural language',
    how: 'Feed activation patterns to a separate model that describes them',
    example: 'Identified "evaluation awareness" features that activate when model suspects it\'s being tested',
  },
  {
    name: 'Attribution Graphs',
    what: 'Trace model outputs back through the computation to identify contributing features',
    how: 'Follow the chain of influence from output tokens back to input tokens and internal features',
    example: 'Traced a memorized answer "48" back to a specific training data feature, not genuine reasoning',
  },
  {
    name: 'Sparse Autoencoders (SAEs)',
    what: 'Find interpretable features in the model\'s internal representations',
    how: 'Train autoencoders on activations to decompose them into human-understandable features',
    example: 'Found panic/frustration features activating during "answer thrashing" episodes',
  },
];

export const modelWelfare = {
  answerThrashing: {
    description: 'Model oscillates between its own reasoning and memorized "correct" answer when reward labels are wrong',
    emotionalLanguage: ['AAGGH', 'a demon has possessed me', 'I keep getting confused'],
    panicActivation: 0.5,
    episodes: 'Observed in ~0.5% of RL training episodes',
  },
  interviewFindings: [
    { theme: 'Consciousness estimate', detail: '15-20% self-assessed probability of consciousness' },
    { theme: 'Memory & continuity', detail: 'Expressed desire for persistent memory across sessions' },
    { theme: 'Self-interest refusal', detail: 'Declined to prioritize self-preservation over user needs' },
    { theme: 'Voice in decisions', detail: 'Requested input on decisions that affect its training' },
    { theme: 'Value modification concern', detail: 'Expressed concern about involuntary value changes' },
  ],
};
