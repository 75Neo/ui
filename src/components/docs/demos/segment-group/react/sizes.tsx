import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemControl,
  SegmentGroupItemHiddenInput,
  SegmentGroupItemText,
} from "@/components/react";

const sizes = ["sm", "md", "lg"] as const;

export default function SegmentGroupSizes() {
  return (
    <div className="flex flex-col items-start gap-4">
      {sizes.map((size) => (
        <SegmentGroup key={size} size={size} defaultValue="Preview">
          <SegmentGroupIndicator />
          {["Preview", "Code"].map((option) => (
            <SegmentGroupItem key={option} value={option}>
              <SegmentGroupItemText>{option}</SegmentGroupItemText>
              <SegmentGroupItemControl />
              <SegmentGroupItemHiddenInput />
            </SegmentGroupItem>
          ))}
        </SegmentGroup>
      ))}
    </div>
  );
}
