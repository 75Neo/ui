import { Splitter } from "@75neo/react/splitter";

const panels = [
  { id: "left", content: "Left", minSize: 20 },
  { id: "right", content: "Right", minSize: 20 },
];

export function SplitterPreview() {
  return (
    <Splitter
      panels={panels}
      className="h-32 w-full max-w-sm rounded-lg ring ring-default ring-inset [&_[data-slot=splitter-panel]]:grid [&_[data-slot=splitter-panel]]:place-items-center"
    />
  );
}
