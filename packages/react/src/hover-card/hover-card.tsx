import type React from "react";
import { HoverCard as Ark } from "@ark-ui/react/hover-card";
import { hoverCardDefaults, type HoverCardRootProps as HoverCardContract } from "@75neo/themes";
import { HoverCardVariantsContext } from "./variants";
import { HoverCardArrow } from "./arrow";
import { HoverCardBody } from "./body";
import { HoverCardContent } from "./content";
import { HoverCardDescription } from "./description";
import { HoverCardTitle } from "./title";

/**
 * Props for the HoverCard.
 *
 * @remarks
 * `title` is dropped from the HTML attributes, because the global attribute is the
 * wrong kind of title, and so is `content`. `dir` belongs to the locale provider.
 *
 * The open state comes from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 *
 * `children` is the trigger, not the body: the body is data, and the one element a
 * caller has to own is what the card appears beside.
 */
export interface HoverCardProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "dir" | "content">,
    Pick<React.ComponentProps<typeof Ark.Root>, "open" | "defaultOpen" | "onOpenChange" | "ids">,
    HoverCardContract<React.ReactNode> {
  /** The element the card appears beside. It becomes the trigger. */
  children?: React.ReactNode;
}

export function HoverCard({
  size,
  title,
  description,
  body,
  arrow = false,
  placement = "bottom",
  offset = 8,
  openDelay,
  closeDelay,
  disabled,
  portal,
  lazyMount,
  unmountOnExit,
  children,
  open,
  defaultOpen,
  onOpenChange,
  ids,
  className,
  ...rest
}: HoverCardProps) {
  const resolved = { size: size ?? hoverCardDefaults.size };

  return (
    <HoverCardVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        openDelay={openDelay}
        closeDelay={closeDelay}
        disabled={disabled}
        positioning={{ placement, offset: { mainAxis: offset } }}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        ids={ids}
        data-slot="hover-card"
        data-size={resolved.size}
      >
        {children != null && <Ark.Trigger asChild>{children}</Ark.Trigger>}
        <HoverCardContent portal={portal} className={className}>
          {arrow && <HoverCardArrow />}
          {title != null && <HoverCardTitle>{title}</HoverCardTitle>}
          {description != null && <HoverCardDescription>{description}</HoverCardDescription>}
          {body != null && <HoverCardBody>{body}</HoverCardBody>}
        </HoverCardContent>
      </Ark.Root>
    </HoverCardVariantsContext.Provider>
  );
}
