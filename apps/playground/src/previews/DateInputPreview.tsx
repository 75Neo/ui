import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { dateInput, variantValues } from "@75neo/themes";
import { DateInput, type DateValue, parseDate } from "@75neo/react";

const sizes = variantValues(dateInput, "size");
const colors = variantValues(dateInput, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

export default function DateInputPreview() {
  const [date, setDate] = useState<DateValue[]>(() => parseDate(["2026-03-14"]));

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <DateInput size={size} defaultValue={parseDate(["2026-03-14"])} />
        </div>
      ))}

      <hr className="border-muted" />

      {/* The accent reaches the ring around the field and the tint on the segment
          holding the caret, so tab in and arrow between the parts to see it. */}
      {colors.map((accent) => (
        <div key={accent} className={row}>
          <p className={rowLabel} data-identifier>
            {accent}
          </p>
          <DateInput color={accent} size="sm" defaultValue={parseDate(["2026-03-14"])} />
        </div>
      ))}

      <hr className="border-muted" />

      <div className="flex flex-wrap items-start gap-8">
        <DateInput label="With an icon" leadingIcon={<CalendarDays />} />
        <DateInput label="To the minute" granularity="minute" />
        <DateInput label="Read in German" locale="de-DE" defaultValue={parseDate(["2026-03-14"])} />
        <DateInput
          label="Padded"
          shouldForceLeadingZeros
          defaultValue={parseDate(["2026-03-04"])}
        />
        <DateInput label="Disabled" disabled defaultValue={parseDate(["2026-03-14"])} />
      </div>

      <hr className="border-muted" />

      <div className="flex flex-wrap items-start gap-8">
        <DateInput
          label="A stay"
          selectionMode="range"
          defaultValue={parseDate(["2026-03-14", "2026-03-21"])}
        />
      </div>

      <hr className="border-muted" />

      {/* Controlled: the value is an array of DateValue whatever the selection mode. */}
      <div className="flex flex-wrap items-center gap-8">
        <DateInput
          label="Controlled"
          value={date}
          onValueChange={(details: { value: DateValue[] }) => setDate(details.value)}
        />
        <output className="font-mono text-sm text-toned">
          {date.map((entry) => entry.toString()).join(" ")}
        </output>
      </div>
    </div>
  );
}
