import type React from "react";
import { Clipboard as Ark } from "@ark-ui/react/clipboard";
import {
  clipboardDefaults,
  cn,
  type ClipboardIds,
  type ClipboardRootProps as ClipboardContract,
} from "@75neo/themes";
import { ClipboardVariantsContext } from "./variants";
import { ClipboardControl } from "./control";
import { ClipboardInput } from "./input";
import { ClipboardLabel } from "./label";
import { ClipboardTrigger } from "./trigger";

export interface ClipboardProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue">,
    Pick<React.ComponentProps<typeof Ark.Root>, "onStatusChange">,
    Omit<ClipboardContract<React.ReactNode>, "ids"> {
  ids?: ClipboardIds;
}

export function Clipboard({
  color,
  size,
  value,
  label,
  timeout,
  copyIcon,
  copiedIcon,
  ids,
  onStatusChange,
  className,
  ...rest
}: ClipboardProps) {
  const resolved = {
    color: color ?? clipboardDefaults.color,
    size: size ?? clipboardDefaults.size,
  };

  return (
    <ClipboardVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        value={value}
        timeout={timeout}
        ids={ids}
        onStatusChange={onStatusChange}
        data-slot="clipboard"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn("flex min-w-0 flex-col gap-1.5", className)}
      >
        {label != null && <ClipboardLabel>{label}</ClipboardLabel>}
        <ClipboardControl>
          <ClipboardInput />
          <ClipboardTrigger copyIcon={copyIcon} copiedIcon={copiedIcon} />
        </ClipboardControl>
      </Ark.Root>
    </ClipboardVariantsContext.Provider>
  );
}
