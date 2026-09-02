import { Combobox } from "@75neo/react";

const languages = [
  { value: "ts", label: "TypeScript" },
  { value: "js", label: "JavaScript" },
  { value: "rs", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "py", label: "Python" },
];

export function ComboboxPreview() {
  return <Combobox label="Language" items={languages} openOnClick placeholder="Start typing" />;
}
