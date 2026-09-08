import {
  Splitter,
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterResizeTriggerIndicator,
} from "@/components/react";

export default function SplitterOverview() {
  return (
    <Splitter
      className="h-48 rounded-md ring ring-default"
      panels={[{ id: "source" }, { id: "preview" }]}
      defaultSize={[40, 60]}
    >
      <SplitterPanel id="source" className="p-4 text-sm text-muted">
        The adapter and the recipe, as the CLI wrote them.
      </SplitterPanel>
      <SplitterResizeTrigger id="source:preview">
        <SplitterResizeTriggerIndicator />
      </SplitterResizeTrigger>
      <SplitterPanel id="preview" className="p-4 text-sm text-muted">
        The component, rendered with the tokens from your own stylesheet.
      </SplitterPanel>
    </Splitter>
  );
}
