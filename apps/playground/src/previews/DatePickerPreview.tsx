import { useState } from "react";
import { datePicker, variantValues } from "@75neo/themes";
import { DatePicker, type DateValue, parseDate } from "@75neo/react";

const sizes = variantValues(datePicker, "size");
const colors = variantValues(datePicker, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

export default function DatePickerPreview() {
  const [date, setDate] = useState<DateValue[]>(() => parseDate(["2026-03-14"]));

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <DatePicker size={size} defaultValue={parseDate(["2026-03-14"])} />
        </div>
      ))}

      <hr className="border-muted" />

      {/* The accent reaches the field's focus ring, today's date, the selected day and
          the tint across a range, so open one to see it. */}
      {colors.map((accent) => (
        <div key={accent} className={row}>
          <p className={rowLabel} data-identifier>
            {accent}
          </p>
          <DatePicker color={accent} size="sm" defaultValue={parseDate(["2026-03-14"])} />
        </div>
      ))}

      <hr className="border-muted" />

      <div className="grid gap-6 @lg:grid-cols-2">
        <DatePicker label="Opens on click" openOnClick />
        <DatePicker label="Six weeks, always" fixedWeeks />
        <DatePicker label="Read in German" locale="de-DE" />
        <DatePicker label="Disabled" disabled defaultValue={parseDate(["2026-03-14"])} />
        <DatePicker
          label="Several days"
          selectionMode="multiple"
          defaultValue={parseDate(["2026-03-14", "2026-03-18"])}
        />
        <DatePicker
          label="A stay"
          selectionMode="range"
          defaultValue={parseDate(["2026-03-14", "2026-03-21"])}
        />
      </div>

      <hr className="border-muted" />

      {/* Controlled: the value is an array of DateValue whatever the selection mode. */}
      <div className="grid gap-3 @lg:grid-cols-[minmax(0,1fr)_auto] @lg:items-center @lg:gap-6">
        <DatePicker
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
