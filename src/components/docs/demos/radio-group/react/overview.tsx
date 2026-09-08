import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupLabel,
} from "@/components/react";

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "both", label: "Both adapters" },
];

export default function RadioGroupOverview() {
  return (
    <RadioGroup defaultValue="vue">
      <RadioGroupLabel>Which adapter should the CLI install?</RadioGroupLabel>
      {frameworks.map((framework) => (
        <RadioGroupItem key={framework.value} value={framework.value}>
          <RadioGroupItemControl />
          <RadioGroupItemText>{framework.label}</RadioGroupItemText>
          <RadioGroupItemHiddenInput />
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
}
