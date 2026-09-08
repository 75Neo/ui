import { Star } from "lucide-react";
import { Toggle, ToggleIndicator } from "@/components/react";

export default function ToggleOverview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle>
        <ToggleIndicator>
          <Star />
        </ToggleIndicator>
        Watch
      </Toggle>

      <Toggle defaultPressed>Pressed</Toggle>
      <Toggle disabled>Disabled</Toggle>
    </div>
  );
}
