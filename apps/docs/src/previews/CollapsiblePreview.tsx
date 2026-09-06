import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@75neo/react/collapsible";

export function CollapsiblePreview() {
  return (
    <Collapsible className="w-full max-w-sm" defaultOpen>
      <CollapsibleTrigger>What is a design token?</CollapsibleTrigger>
      <CollapsibleContent>
        A named value for a design decision, so the decision is made once and spent everywhere.
      </CollapsibleContent>
    </Collapsible>
  );
}
