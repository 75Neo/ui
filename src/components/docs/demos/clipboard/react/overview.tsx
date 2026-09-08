import { Check, Copy } from "lucide-react";
import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardTrigger,
} from "@/components/react";

export default function ClipboardOverview() {
  return (
    <div className="max-w-md">
      <Clipboard defaultValue="npx shadcn@latest add @75neo/button">
        <ClipboardLabel>Install command</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput />
          <ClipboardTrigger>
            <ClipboardIndicator copied={<Check />}>
              <Copy />
            </ClipboardIndicator>
            Copy
          </ClipboardTrigger>
        </ClipboardControl>
      </Clipboard>
    </div>
  );
}
