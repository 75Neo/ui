import { DatePicker } from "@75neo/react/date-picker";

export function DatePickerPreview() {
  return (
    <div className="max-w-xs">
      <DatePicker label="Birthday" placeholder="Pick a date" />
    </div>
  );
}
