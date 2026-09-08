import { Minus, Plus } from "lucide-react";
import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
} from "@/components/react";

const sizes = ["sm", "md", "lg"] as const;

export default function NumberInputSizes() {
  return (
    <div className="flex max-w-56 flex-col gap-5">
      {sizes.map((size) => (
        <NumberInput key={size} size={size} defaultValue="3">
          <NumberInputLabel>{size}</NumberInputLabel>
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
      ))}
    </div>
  );
}
