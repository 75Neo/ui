import { Combobox } from "@75neo/react/combobox";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];

export function ComboboxPreview() {
  return (
    <div className="max-w-xs">
      <Combobox items={items} label="Framework" placeholder="Type to filter" />
    </div>
  );
}
