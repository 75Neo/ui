import { Select } from "@75neo/react";

const languages = [
  { value: "ts", label: "TypeScript" },
  { value: "js", label: "JavaScript" },
  { value: "rs", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "py", label: "Python" },
];

export function SelectPreview() {
  return <Select label="Language" items={languages} placeholder="Pick one" />;
}
