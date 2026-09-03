import { RadioGroup } from "@75neo/react";

const items = [
  { value: "weekly", label: "Weekly", description: "One digest on Monday morning." },
  { value: "daily", label: "Daily", description: "One digest a day, at nine." },
  { value: "never", label: "Never", description: "Nothing at all, ever." },
];

export function RadioGroupPreview() {
  return (
    <div className="flex flex-col gap-6">
      <RadioGroup legend="Digest" items={items} defaultValue="weekly" />
      <RadioGroup
        color="success"
        legend="Plan"
        orientation="horizontal"
        items={[
          { value: "free", label: "Free" },
          { value: "pro", label: "Pro" },
          { value: "team", label: "Team", disabled: true },
        ]}
        defaultValue="pro"
      />
    </div>
  );
}
