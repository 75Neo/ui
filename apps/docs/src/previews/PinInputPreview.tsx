import { PinInput } from "@75neo/react/pin-input";

export function PinInputPreview() {
  return (
    <div className="max-w-xs">
      <PinInput label="Code" length={6} />
    </div>
  );
}
