import { Button, Popover } from "@75neo/react";

export function PopoverPreview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Popover
        title="Notifications"
        description="Where the noisy ones go."
        body="Every part of this panel is addressed by name rather than handed in as markup."
      >
        <Button variant="outline" color="neutral">
          Open
        </Button>
      </Popover>
      <Popover
        title="With an arrow"
        body="Pointing back at the button that opened it."
        placement="bottom"
        arrow
        close
      >
        <Button variant="soft" color="neutral">
          With an arrow
        </Button>
      </Popover>
    </div>
  );
}
