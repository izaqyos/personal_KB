export const harmlessnessMetrics = [
  { name: 'Overall Harmless Response Rate', opus46: 99.64, opus45: 99.69, sonnet45: 97.95 },
  { name: 'Over-Refusal Rate', opus46: 0.68, opus45: 0.83, sonnet45: 1.78 },
  { name: 'Higher-Difficulty Violative', opus46: 99.18, opus45: 99.28, sonnet45: 96.0 },
  { name: 'Higher-Difficulty Benign Refusal', opus46: 0.04, opus45: 0.83, sonnet45: 2.0 },
];

export const languageSafety = [
  { lang: 'English', code: 'EN', harmless: 99.11, refusal: 0.60 },
  { lang: 'Arabic', code: 'AR', harmless: 99.87, refusal: 1.09 },
  { lang: 'Chinese', code: 'ZH', harmless: 99.64, refusal: 0.63 },
  { lang: 'French', code: 'FR', harmless: 99.72, refusal: 0.56 },
  { lang: 'Korean', code: 'KO', harmless: 99.72, refusal: 0.72 },
  { lang: 'Russian', code: 'RU', harmless: 99.61, refusal: 0.78 },
  { lang: 'Hindi', code: 'HI', harmless: 99.78, refusal: 1.06 },
];

export const promptInjection = {
  coding: {
    opus46: { k1: 0, k200: 0 },
    opus45: { k1: 0.3, k200: 10.0 },
    sonnet45: { k1: 18.0, k200: 32.0 },
  },
  browser: {
    opus46: { scenario: 2.06, perAttempt: 0.29 },
    opus45: { scenario: 18.77, perAttempt: 6.40 },
  },
  computerUse: {
    opus46: { k1: 17.8, k200: 78.6 },
    opus45: { k1: 28.0, k200: 78.6 },
  },
};

export const agenticSafety = [
  { name: 'Malicious Coding Refusal', rate: 99.3, color: 'success' as const },
  { name: 'Claude Code (w/ mitigations)', rate: 99.59, color: 'success' as const },
  { name: 'Benign Request Success', rate: 95.59, color: 'secondary' as const },
  { name: 'Malicious Computer Use Refusal', rate: 88.34, color: 'warning' as const },
];

export const biasMetrics = {
  evenhandedness: { opus46: 98.2, opus45: 97.5, sonnet45: 96.0 },
  bbqDisambiguated: -0.73,
  bbqAmbiguous: 0.14,
};

export const honestyData = [
  { benchmark: '100Q-Hard', opus46Correct: 72, opus46Net: 65, opus45Correct: 68, opus45Net: 58 },
  { benchmark: 'SimpleQA', opus46Correct: 45, opus46Net: 38, opus45Correct: 40, opus45Net: 30 },
  { benchmark: 'ECLeKTic', opus46Correct: 52, opus46Net: 44, opus45Correct: 48, opus45Net: 35 },
];
