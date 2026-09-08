import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
} from "@/components/react";

const sizes = ["sm", "md", "lg"] as const;

export default function RadioGroupSizes() {
  return (
    <div className="flex flex-col gap-6">
      {sizes.map((size) => (
        <RadioGroup key={size} size={size} defaultValue="a" orientation="horizontal">
          <RadioGroupItem value="a">
            <RadioGroupItemControl />
            <RadioGroupItemText>{size}</RadioGroupItemText>
            <RadioGroupItemHiddenInput />
          </RadioGroupItem>
          <RadioGroupItem value="b">
            <RadioGroupItemControl />
            <RadioGroupItemText>Second</RadioGroupItemText>
            <RadioGroupItemHiddenInput />
          </RadioGroupItem>
        </RadioGroup>
      ))}
    </div>
  );
}
