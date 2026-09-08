import { Check, Minus } from "lucide-react";
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/react";

export default function CheckboxStates() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox>
        <CheckboxControl>
          <CheckboxIndicator>
            <Check />
          </CheckboxIndicator>
        </CheckboxControl>
        <CheckboxLabel>Unchecked</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>

      <Checkbox defaultChecked>
        <CheckboxControl>
          <CheckboxIndicator>
            <Check />
          </CheckboxIndicator>
        </CheckboxControl>
        <CheckboxLabel>Checked</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>

      <Checkbox defaultChecked="indeterminate">
        <CheckboxControl>
          <CheckboxIndicator indeterminate>
            <Minus />
          </CheckboxIndicator>
        </CheckboxControl>
        <CheckboxLabel>Indeterminate</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>

      <Checkbox disabled defaultChecked>
        <CheckboxControl>
          <CheckboxIndicator>
            <Check />
          </CheckboxIndicator>
        </CheckboxControl>
        <CheckboxLabel>Disabled</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    </div>
  );
}
