import { useState } from "react";
import {
  SignaturePad,
  SignaturePadClearTrigger,
  SignaturePadControl,
  SignaturePadGuide,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  SignaturePadSegment,
} from "@/components/react";

export default function SignaturePadOverview() {
  const [value, setValue] = useState("");

  return (
    <div className="max-w-md">
      <SignaturePad onDrawEnd={(details) => details.getDataUrl("image/png").then(setValue)}>
        <SignaturePadLabel>Sign here</SignaturePadLabel>
        <SignaturePadControl>
          <SignaturePadSegment />
          <SignaturePadGuide />
        </SignaturePadControl>
        <SignaturePadClearTrigger>Clear</SignaturePadClearTrigger>
        <SignaturePadHiddenInput value={value} />
      </SignaturePad>
    </div>
  );
}
