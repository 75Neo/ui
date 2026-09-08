import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchThumb,
} from "@/components/react";

const colors = ["primary", "secondary", "success", "info", "warning", "error"] as const;

export default function SwitchColors() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {colors.map((color) => (
        <Switch key={color} color={color} defaultChecked>
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <SwitchLabel>{color}</SwitchLabel>
          <SwitchHiddenInput />
        </Switch>
      ))}
    </div>
  );
}
