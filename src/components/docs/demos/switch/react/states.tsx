import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchThumb,
} from "@/components/react";

export default function SwitchStates() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Switch defaultChecked>
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <SwitchLabel>On</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>

      <Switch>
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <SwitchLabel>Off</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>

      <Switch disabled defaultChecked>
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <SwitchLabel>Disabled</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
    </div>
  );
}
