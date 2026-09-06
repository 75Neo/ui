import { Button } from "@75neo/react/button";
import { Tooltip } from "@75neo/react/tooltip";

export function TooltipPreview() {
  return (
    <Tooltip text="Copied to the clipboard" arrow>
      <Button variant="outline" color="neutral">
        Hover me
      </Button>
    </Tooltip>
  );
}
