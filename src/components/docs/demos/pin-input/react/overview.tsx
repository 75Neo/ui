import {
  PinInput,
  PinInputControl,
  PinInputHiddenInput,
  PinInputInput,
  PinInputLabel,
} from "@/components/react";

export default function PinInputOverview() {
  return (
    <PinInput otp placeholder="0">
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        {[0, 1, 2, 3].map((index) => (
          <PinInputInput key={index} index={index} />
        ))}
      </PinInputControl>
      <PinInputHiddenInput />
    </PinInput>
  );
}
