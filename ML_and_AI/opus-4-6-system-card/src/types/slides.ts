import type { ComponentType } from 'react';

export interface SlideConfig {
  id: number;
  title: string;
  component: ComponentType;
}

export interface BenchmarkScore {
  name: string;
  opus46: number;
  opus45: number;
  sonnet45: number;
  gemini3Pro?: number;
  gpt52?: number;
  unit: '%' | 'score' | '$';
  description: string;
  category: 'coding' | 'agentic' | 'reasoning' | 'knowledge' | 'multimodal' | 'search' | 'finance';
}

export interface SafetyMetric {
  name: string;
  opus46: number;
  opus45?: number;
  sonnet45?: number;
  higherIsBetter: boolean;
  description: string;
}

export interface WhatsNextArticle {
  title: string;
  authors: string;
  year: number;
  description: string;
  category: 'alignment' | 'interpretability' | 'policy' | 'safety' | 'foundational';
  url: string;
}
