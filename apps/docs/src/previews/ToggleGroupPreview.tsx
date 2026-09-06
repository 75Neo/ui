import { ToggleGroup } from "@75neo/react/toggle-group";

const items = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

export function ToggleGroupPreview() {
  return (
    <div className="max-w-xs">
      <ToggleGroup items={items} defaultValue={["week"]} />
    </div>
  );
}
