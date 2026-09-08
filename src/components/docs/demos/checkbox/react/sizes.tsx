import { Check } from "lucide-react";
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/react";

const sizes = ["sm", "md", "lg"] as const;

export default function CheckboxSizes() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {sizes.map((size) => (
        <Checkbox key={size} size={size} defaultChecked>
          <CheckboxControl>
            <CheckboxIndicator>
              <Check />
            </CheckboxIndicator>
          </CheckboxControl>
          <CheckboxLabel>{size}</CheckboxLabel>
          <CheckboxHiddenInput />
        </Checkbox>
      ))}
    </div>
  );
}
