import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchThumb,
} from "@/components/react";

const sizes = ["sm", "md", "lg"] as const;

export default function SwitchSizes() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {sizes.map((size) => (
        <Switch key={size} size={size} defaultChecked>
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <SwitchLabel>{size}</SwitchLabel>
          <SwitchHiddenInput />
        </Switch>
      ))}
    </div>
  );
}
