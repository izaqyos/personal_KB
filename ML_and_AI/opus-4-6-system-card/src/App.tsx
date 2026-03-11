import { useSlideNavigation } from './hooks/useSlideNavigation';
import { SlideContainer } from './components/layout/SlideContainer';
import { ProgressBar } from './components/layout/ProgressBar';
import { NavigationControls } from './components/layout/NavigationControls';

import TitleSlide from './slides/01-TitleSlide';
import WhatIsASystemCard from './slides/02-WhatIsASystemCard';
import ModelOverview from './slides/03-ModelOverview';
import CapabilitiesOverview from './slides/04-CapabilitiesOverview';
import CodingBenchmarks from './slides/05-CodingBenchmarks';
import AgenticBenchmarks from './slides/06-AgenticBenchmarks';
import ReasoningAndKnowledge from './slides/07-ReasoningAndKnowledge';
import AgenticSearch from './slides/08-AgenticSearch';
import SafeguardsOverview from './slides/09-SafeguardsOverview';
import HarmlessnessDeepDive from './slides/10-HarmlessnessDeepDive';
import HonestyEvaluations from './slides/11-HonestyEvaluations';
import AgenticSafety from './slides/12-AgenticSafety';
import PromptInjection from './slides/13-PromptInjection';
import AlignmentAssessment from './slides/14-AlignmentAssessment';
import SabotageAndDeception from './slides/15-SabotageAndDeception';
import InterpretabilityTools from './slides/16-InterpretabilityTools';
import ModelWelfare from './slides/17-ModelWelfare';
import RSPEvaluations from './slides/18-RSPEvaluations';
import ASL3Deployment from './slides/19-ASL3Deployment';
import WhatsNext from './slides/20-WhatsNext';

const slides = [
  { id: 1, title: 'Title', component: TitleSlide },
  { id: 2, title: 'What Is a System Card?', component: WhatIsASystemCard },
  { id: 3, title: 'Model Overview', component: ModelOverview },
  { id: 4, title: 'Capabilities Overview', component: CapabilitiesOverview },
  { id: 5, title: 'Coding Benchmarks', component: CodingBenchmarks },
  { id: 6, title: 'Agentic Benchmarks', component: AgenticBenchmarks },
  { id: 7, title: 'Reasoning & Science', component: ReasoningAndKnowledge },
  { id: 8, title: 'Agentic Search', component: AgenticSearch },
  { id: 9, title: 'Safeguards', component: SafeguardsOverview },
  { id: 10, title: 'Higher-Difficulty Safety', component: HarmlessnessDeepDive },
  { id: 11, title: 'Honesty', component: HonestyEvaluations },
  { id: 12, title: 'Agentic Safety', component: AgenticSafety },
  { id: 13, title: 'Prompt Injection', component: PromptInjection },
  { id: 14, title: 'Alignment Assessment', component: AlignmentAssessment },
  { id: 15, title: 'Sabotage & Deception', component: SabotageAndDeception },
  { id: 16, title: 'Interpretability Tools', component: InterpretabilityTools },
  { id: 17, title: 'Model Welfare', component: ModelWelfare },
  { id: 18, title: 'RSP Evaluations', component: RSPEvaluations },
  { id: 19, title: 'ASL-3 Deployment', component: ASL3Deployment },
  { id: 20, title: "What's Next", component: WhatsNext },
];

export default function App() {
  const { current, direction, next, prev, goTo } = useSlideNavigation(slides.length);
  const CurrentSlide = slides[current].component;

  return (
    <div className="w-screen h-screen bg-slide-bg overflow-hidden">
      <ProgressBar
        current={current}
        total={slides.length}
        titles={slides.map(s => s.title)}
        onGoTo={goTo}
      />
      <NavigationControls
        onPrev={prev}
        onNext={next}
        hasPrev={current > 0}
        hasNext={current < slides.length - 1}
      />
      <SlideContainer slideKey={current} direction={direction}>
        <CurrentSlide />
      </SlideContainer>
    </div>
  );
}
