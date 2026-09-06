import { Select } from "@75neo/react/select";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];

export function SelectPreview() {
  return (
    <div className="max-w-xs">
      <Select items={items} label="Framework" placeholder="Select" />
    </div>
  );
}
