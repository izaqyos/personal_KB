import { SlideHeader } from '../components/layout/SlideHeader';
import { Callout } from '../components/ui/Callout';
import { SafetyPipeline } from '../components/diagrams/SafetyPipeline';

export default function AlignmentAssessment() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="Alignment Assessment"
        subtitle="The most comprehensive alignment evaluation ever published"
        slideNumber={14}
      />

      <div className="flex-1 overflow-y-auto">
        <SafetyPipeline />
      </div>

      <Callout>
        This section uses automated audits of thousands of transcripts, interpretability tools,
        and external testing from the UK AISI and Apollo Research.
      </Callout>
    </div>
  );
}
