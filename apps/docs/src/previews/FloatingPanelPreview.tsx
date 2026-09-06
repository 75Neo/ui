import { FloatingPanel } from "@75neo/react/floating-panel";

export function FloatingPanelPreview() {
  return (
    <FloatingPanel
      title="Notes"
      body="Drag the header, stage the window, pull a corner to resize."
      defaultOpen
    >
      <button type="button">Notes</button>
    </FloatingPanel>
  );
}
