import type React from "react";
import { Clipboard as Ark } from "@ark-ui/react/clipboard";
import { Check, Copy } from "lucide-react";
import { type ClipboardProps as ClipboardContract, clipboard } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Clipboard.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name. `defaultValue` goes with it, because
 * the attribute admits numbers and arrays where Ark's root takes a string.
 */
export interface ClipboardProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue">,
    Pick<React.ComponentProps<typeof Ark.Root>, "ids" | "onStatusChange">,
    ClipboardContract<React.ReactNode> {}

export function Clipboard({
  ui,
  color,
  size,
  value,
  label,
  timeout,
  copyIcon,
  copiedIcon,
  className,
  ids,
  onStatusChange,
  ...rest
}: ClipboardProps) {
  const theme = useResolvedTheme(clipboard, "clipboard", { ui, color, size }, className);

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      value={value}
      timeout={timeout}
      ids={ids}
      onStatusChange={onStatusChange}
    >
      {label != null && (
        <Ark.Label data-slot="label" className={theme.class.label}>
          {label}
        </Ark.Label>
      )}
      <Ark.Control data-slot="control" className={theme.class.control}>
        <Ark.Input data-slot="input" className={theme.class.input} />
        <Ark.Trigger data-slot="trigger" className={theme.class.trigger}>
          <Ark.Indicator
            data-slot="indicator"
            className={theme.class.indicator}
            copied={copiedIcon ?? <Check />}
          >
            {copyIcon ?? <Copy />}
          </Ark.Indicator>
        </Ark.Trigger>
      </Ark.Control>
    </Ark.Root>
  );
}
