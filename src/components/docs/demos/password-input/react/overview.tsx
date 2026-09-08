import { Eye, EyeOff } from "lucide-react";
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from "@/components/react";

export default function PasswordInputOverview() {
  return (
    <div className="max-w-sm">
      <PasswordInput>
        <PasswordInputLabel>Registry token</PasswordInputLabel>
        <PasswordInputControl>
          <PasswordInputInput placeholder="Paste the token" />
          <PasswordInputVisibilityTrigger>
            <PasswordInputIndicator fallback={<EyeOff />}>
              <Eye />
            </PasswordInputIndicator>
          </PasswordInputVisibilityTrigger>
        </PasswordInputControl>
      </PasswordInput>
    </div>
  );
}
