import { PinInput, PinInputControl, PinInputInput, PinInputLabel } from "@/components/react";

const sizes = ["sm", "md", "lg"] as const;

export default function PinInputSizes() {
  return (
    <div className="flex flex-col gap-5">
      {sizes.map((size) => (
        <PinInput key={size} size={size} placeholder="0">
          <PinInputLabel>{size}</PinInputLabel>
          <PinInputControl>
            {[0, 1, 2, 3].map((index) => (
              <PinInputInput key={index} index={index} />
            ))}
          </PinInputControl>
        </PinInput>
      ))}
    </div>
  );
}
