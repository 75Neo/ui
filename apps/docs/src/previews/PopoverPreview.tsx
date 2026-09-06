import { Popover } from "@75neo/react/popover";

export function PopoverPreview() {
  return (
    <Popover
      title="About this row"
      description="A quieter line under the heading."
      body="The panel's main content sits under both."
      arrow
    >
      <button type="button">More</button>
    </Popover>
  );
}
