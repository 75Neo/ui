import { DatePicker, parseDate } from "@75neo/react";

export function DatePickerPreview() {
  return <DatePicker label="Due" openOnClick defaultValue={parseDate(["2026-03-14"])} />;
}
