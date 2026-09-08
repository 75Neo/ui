import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemControl,
  SegmentGroupItemHiddenInput,
  SegmentGroupItemText,
} from "@/components/react";

const options = ["Preview", "Code", "Diff"];

export default function SegmentGroupOverview() {
  return (
    <SegmentGroup defaultValue="Preview">
      <SegmentGroupIndicator />
      {options.map((option) => (
        <SegmentGroupItem key={option} value={option}>
          <SegmentGroupItemText>{option}</SegmentGroupItemText>
          <SegmentGroupItemControl />
          <SegmentGroupItemHiddenInput />
        </SegmentGroupItem>
      ))}
    </SegmentGroup>
  );
}
