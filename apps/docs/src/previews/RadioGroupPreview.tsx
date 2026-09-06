import { RadioGroup } from "@75neo/react/radio-group";

const items = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
];

export function RadioGroupPreview() {
  return (
    <div className="max-w-xs">
      <RadioGroup items={items} legend="Notify me" />
    </div>
  );
}
