import { SegmentGroup } from "@75neo/react";

const views = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

export function SegmentGroupPreview() {
  return <SegmentGroup items={views} defaultValue="week" />;
}
