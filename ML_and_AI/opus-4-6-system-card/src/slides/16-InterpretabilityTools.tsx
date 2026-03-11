import { SlideHeader } from '../components/layout/SlideHeader';
import { Callout } from '../components/ui/Callout';
import { InterpretabilityFlow } from '../components/diagrams/InterpretabilityFlow';

export default function InterpretabilityTools() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="Interpretability as an Alignment Tool"
        subtitle="First practical use of interpretability methods for safety assessment"
        slideNumber={16}
      />

      <div className="flex-1">
        <InterpretabilityFlow />
      </div>

      <Callout>
        This is the first system card to use interpretability methods as practical alignment
        investigation tools, not just research curiosities.
      </Callout>
    </div>
  );
}
