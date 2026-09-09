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
      <Clipboard defaultValue="npx @75neo/ui@latest add button">
        <ClipboardLabel>Install command</ClipboardLabel>
        <ClipboardControl>
          <ClipboardInput />
          <ClipboardTrigger>
            <ClipboardIndicator copied={<Check />}>
              <Copy />
            </ClipboardIndicator>
          </ClipboardTrigger>
        </ClipboardControl>
      </Clipboard>
    </div>
  );
}
