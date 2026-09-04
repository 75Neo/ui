import { useState } from "react";
import { segmentGroup, variantValues } from "@75neo/themes";
import { SegmentGroup } from "@75neo/react";

const sizes = variantValues(segmentGroup, "size");
const colors = variantValues(segmentGroup, "color");
const orientations = variantValues(segmentGroup, "orientation");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const views = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

export default function SegmentGroupPreview() {
  const [view, setView] = useState<string | null>("week");

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <div>
            <SegmentGroup size={size} items={views} defaultValue="week" />
          </div>
        </div>
      ))}

      <hr className="border-muted" />

      {/* The accent reaches the chosen option's text. The pill stays the surface
          colour, so the row reads as one control with a position in it. */}
      {colors.map((accent) => (
        <div key={accent} className={row}>
          <p className={rowLabel} data-identifier>
            {accent}
          </p>
          <div>
            <SegmentGroup color={accent} size="sm" items={views} defaultValue="week" />
          </div>
        </div>
      ))}

      <hr className="border-muted" />

      <div className="flex flex-wrap items-start gap-6">
        {orientations.map((orientation) => (
          <SegmentGroup
            key={orientation}
            orientation={orientation}
            items={views}
            defaultValue="day"
          />
        ))}
        <SegmentGroup
          items={[
            { value: "all", label: "All" },
            { value: "mine", label: "Mine" },
            { value: "archived", label: "Archived", disabled: true },
          ]}
          defaultValue="all"
        />
        <SegmentGroup items={views} disabled defaultValue="month" />
      </div>

      <hr className="border-muted" />

      <div className="flex flex-wrap items-center gap-4">
        <SegmentGroup
          items={views}
          value={view}
          onValueChange={(details: { value: string | null }) => setView(details.value)}
        />
        <output className="font-mono text-sm text-toned">{view ?? "nothing"}</output>
      </div>
    </div>
  );
}
