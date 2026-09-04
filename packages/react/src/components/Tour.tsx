import type React from "react";
import { Tour as Ark, type UseTourReturn } from "@ark-ui/react/tour";
import { Portal } from "@ark-ui/react/portal";
import { X } from "lucide-react";
import { tour as tourRecipe, type TourProps as TourContract } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Tour.
 *
 * @remarks
 * The tour itself — the steps, the current position, `start()` — comes from Ark's
 * `useTour`, because React and Vue hold it too differently to share one type. Build
 * it next to the targets it points at and hand it over; this component only styles
 * the anatomy it renders.
 */
export interface TourProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "dir">, TourContract<React.ReactNode> {
  /** Built with Ark's `useTour`. Drives every part below. */
  tour: UseTourReturn;
}

export function Tour({
  ui,
  size,
  close,
  transition,
  arrow = true,
  backdrop = true,
  spotlight = true,
  closeIcon,
  portal = true,
  lazyMount,
  unmountOnExit,
  tour,
  className,
  ...rest
}: TourProps) {
  const theme = useResolvedTheme(tourRecipe, "tour", { ui, size, close, transition }, className);

  const panel = (
    <>
      {backdrop && <Ark.Backdrop data-slot="backdrop" className={theme.class.backdrop} />}
      {spotlight && <Ark.Spotlight data-slot="spotlight" className={theme.class.spotlight} />}
      <Ark.Positioner data-slot="positioner" className={theme.class.positioner}>
        <Ark.Content {...rest} data-slot="base" className={theme.class.base}>
          {arrow && (
            <Ark.Arrow data-slot="arrow" className={theme.class.arrow}>
              <Ark.ArrowTip data-slot="arrowTip" className={theme.class.arrowTip} />
            </Ark.Arrow>
          )}

          {close && (
            <Ark.CloseTrigger
              aria-label="Close tour"
              data-slot="closeTrigger"
              className={theme.class.closeTrigger}
            >
              {closeIcon ?? <X />}
            </Ark.CloseTrigger>
          )}

          <Ark.ProgressText data-slot="progressText" className={theme.class.progressText} />
          <Ark.Title data-slot="title" className={theme.class.title} />
          <Ark.Description data-slot="description" className={theme.class.description} />

          <Ark.Control data-slot="control" className={theme.class.control}>
            <Ark.Actions>
              {(actions) =>
                actions.map((action) => (
                  <Ark.ActionTrigger
                    key={action.label}
                    action={action}
                    data-slot="actionTrigger"
                    className={theme.class.actionTrigger}
                  >
                    {action.label}
                  </Ark.ActionTrigger>
                ))
              }
            </Ark.Actions>
          </Ark.Control>
        </Ark.Content>
      </Ark.Positioner>
    </>
  );

  return (
    <Ark.Root tour={tour} lazyMount={lazyMount} unmountOnExit={unmountOnExit}>
      {portal ? <Portal>{panel}</Portal> : panel}
    </Ark.Root>
  );
}
