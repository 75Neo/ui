import { Check } from "lucide-react";
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/react";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;

export default function CheckboxColors() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {colors.map((color) => (
        <Checkbox key={color} color={color} defaultChecked>
          <CheckboxControl>
            <CheckboxIndicator>
              <Check />
            </CheckboxIndicator>
          </CheckboxControl>
          <CheckboxLabel>{color}</CheckboxLabel>
          <CheckboxHiddenInput />
        </Checkbox>
      ))}
    </div>
  );
}
