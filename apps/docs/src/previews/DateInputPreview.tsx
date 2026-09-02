import { CalendarDays } from "lucide-react";
import { DateInput, parseDate } from "@75neo/react";

export function DateInputPreview() {
  return (
    <DateInput
      label="Published"
      leadingIcon={<CalendarDays />}
      defaultValue={parseDate(["2026-03-14"])}
    />
  );
}
