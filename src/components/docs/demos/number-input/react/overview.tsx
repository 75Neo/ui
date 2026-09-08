import { Minus, Plus } from "lucide-react";
import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
} from "@/components/react";

export default function NumberInputOverview() {
  return (
    <div className="max-w-56">
      <NumberInput defaultValue="3" min={0} max={12}>
        <NumberInputLabel>Seats</NumberInputLabel>
        <NumberInputControl>
          <NumberInputDecrementTrigger>
            <Minus />
          </NumberInputDecrementTrigger>
          <NumberInputInput />
          <NumberInputIncrementTrigger>
            <Plus />
          </NumberInputIncrementTrigger>
        </NumberInputControl>
      </NumberInput>
    </div>
  );
}
