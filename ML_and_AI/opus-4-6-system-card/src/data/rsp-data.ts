export const aslLevels = [
  {
    level: 'ASL-1',
    name: 'Basic Safety',
    description: 'Models with no meaningful uplift risk',
    status: 'archived' as const,
  },
  {
    level: 'ASL-2',
    name: 'Standard Safety',
    description: 'Models that could provide some uplift but not beyond what\'s freely available online',
    status: 'archived' as const,
  },
  {
    level: 'ASL-3',
    name: 'Enhanced Safety',
    description: 'Models requiring enhanced containment. Current level for Opus 4.6.',
    status: 'current' as const,
  },
  {
    level: 'ASL-4',
    name: 'Advanced Safety',
    description: 'Models that could substantially uplift state-level CBRN programs or fully automate AI R&D',
    status: 'threshold' as const,
  },
];

export const rspEvaluations = {
  cbrn: {
    label: 'CBRN Risk',
    status: 'Below CBRN-4 Threshold',
    statusColor: 'success' as const,
    detail: 'Improved biology performance, but critical errors remain in protocols. Does not cross CBRN-4.',
  },
  cyber: {
    label: 'Cyber Capability',
    status: 'Benchmarks SATURATED',
    statusColor: 'warning' as const,
    detail: 'Cybench ~100% (pass@30), CyberGym 66% (pass@1). Evaluation infrastructure needs upgrading.',
    scores: { cybench: 100, cybergym: 66.6 },
  },
  autonomy: {
    label: 'Autonomy Risk',
    status: 'Below AI R&D-4 Threshold',
    statusColor: 'success' as const,
    detail: '0/16 internal survey participants believe it can fully automate entry-level research roles.',
    surveyResult: '0/16',
  },
};

export const deploymentQuote = '"Confidently ruling out ASL-4 thresholds is becoming increasingly difficult. This is in part because the model is approaching or surpassing high levels of capability in our rule-out evaluations."';
