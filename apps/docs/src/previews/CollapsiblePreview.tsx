import { Collapsible } from "@75neo/react";

export function CollapsiblePreview() {
  return (
    <div className="flex flex-col gap-4">
      <Collapsible label="What is 75NeoUI?" defaultOpen>
        One set of styles in @75neo/themes, shipped for React and Vue by two thin adapters.
      </Collapsible>
      <Collapsible label="Show more" collapsedHeight="2.5rem" variant="soft">
        <p>A collapsed height clips the panel instead of hiding it.</p>
        <p className="mt-2">
          The first lines stay on the page, and the rest slides in behind them when the trigger is
          pressed.
        </p>
      </Collapsible>
    </div>
  );
}
