import { Button, Tooltip } from "@75neo/react";

export function TooltipPreview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Tooltip text="Saves without leaving the page" openDelay={150}>
        <Button variant="outline" color="neutral">
          Hover me
        </Button>
      </Tooltip>
      <Tooltip text="Points back at its trigger" placement="bottom" arrow openDelay={150}>
        <Button variant="soft" color="neutral">
          With an arrow
        </Button>
      </Tooltip>
      <Tooltip text="Stays open while the pointer is over it" interactive openDelay={150}>
        <Button variant="ghost" color="neutral">
          Interactive
        </Button>
      </Tooltip>
    </div>
  );
}
