import { SegmentGroup } from "@75neo/react/segment-group";

const items = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

export function SegmentGroupPreview() {
  return (
    <div className="max-w-xs">
      <SegmentGroup items={items} defaultValue="week" />
    </div>
  );
}
