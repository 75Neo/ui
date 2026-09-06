import { Listbox } from "@75neo/react/listbox";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];

export function ListboxPreview() {
  return (
    <div className="max-w-xs">
      <Listbox items={items} label="Framework" defaultValue={["react"]} />
    </div>
  );
}
