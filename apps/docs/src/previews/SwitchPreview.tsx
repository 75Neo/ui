import { Moon, Sun } from "lucide-react";
import { Switch } from "@75neo/react";

export function SwitchPreview() {
  return (
    <div className="flex flex-col gap-4">
      <Switch label="Airplane mode" defaultChecked />
      <Switch
        label="Weekly digest"
        description="One email on Monday with everything that changed."
        color="success"
        defaultChecked
      />
      <Switch label="Dark theme" checkedIcon={<Moon />} uncheckedIcon={<Sun />} size="lg" />
      <Switch label="Saving" loading defaultChecked />
    </div>
  );
}
