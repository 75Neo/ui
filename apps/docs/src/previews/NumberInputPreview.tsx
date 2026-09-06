import { NumberInput } from "@75neo/react/number-input";

export function NumberInputPreview() {
  return (
    <div className="max-w-xs">
      <NumberInput label="Quantity" defaultValue="4" min={0} max={10} />
    </div>
  );
}
