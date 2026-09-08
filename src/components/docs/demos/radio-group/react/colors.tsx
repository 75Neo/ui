import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
} from "@/components/react";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;

export default function RadioGroupColors() {
  return (
    <div className="flex flex-wrap gap-6">
      {colors.map((color) => (
        <RadioGroup key={color} color={color} defaultValue="on">
          <RadioGroupItem value="on">
            <RadioGroupItemControl />
            <RadioGroupItemText>{color}</RadioGroupItemText>
            <RadioGroupItemHiddenInput />
          </RadioGroupItem>
        </RadioGroup>
      ))}
    </div>
  );
}
