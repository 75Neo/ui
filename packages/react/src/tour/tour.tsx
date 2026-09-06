import type React from "react";
import { Tour as Ark, useTour } from "@ark-ui/react/tour";
import { Portal } from "@ark-ui/react/portal";
import { tourDefaults, type TourRootProps as TourContract } from "@75neo/themes";
import { TourVariantsContext } from "./variants";
import { TourActions } from "./actions";
import { TourActionTrigger } from "./action-trigger";
import { TourArrow } from "./arrow";
import { TourBackdrop } from "./backdrop";
import { TourCloseTrigger } from "./close-trigger";
import { TourContent } from "./content";
import { TourControl } from "./control";
import { TourDescription } from "./description";
import { TourPositioner } from "./positioner";
import { TourProgressText } from "./progress-text";
import { TourSpotlight } from "./spotlight";
import { TourTitle } from "./title";

/**
 * Props for the Tour.
 *
 * @remarks
 * The steps live in `useTour`, not here: the tour object carries the current
 * title, description and actions, and the parts render them the way Toast's do.
 * The open state is the tour object's too — `tour.start()` opens it, `dismiss`
 * closes it — so there is no `open` prop here.
 */
export interface TourProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "dir">,
    TourContract<React.ReactNode, ReturnType<typeof useTour>> {
  children?: React.ReactNode;
}

export function Tour({
  size,
  tour,
  arrow,
  close,
  closeIcon,
  portal,
  lazyMount,
  unmountOnExit,
  className,
  children,
  ...rest
}: TourProps) {
  const resolved = { size: size ?? tourDefaults.size };
  const overlay = (
    <>
      <TourBackdrop />
      <TourSpotlight />
      <TourPositioner>
        <TourContent className={className}>
          {(arrow ?? true) && <TourArrow />}
          <TourProgressText />
          <TourTitle />
          <TourDescription />
          <TourControl>
            <TourActions>
              {(actions) =>
                actions.map((stepAction) => (
                  <TourActionTrigger key={stepAction.label} action={stepAction}>
                    {stepAction.label}
                  </TourActionTrigger>
                ))
              }
            </TourActions>
          </TourControl>
          {(close ?? true) && (
            <TourCloseTrigger aria-label="Close tour">{closeIcon}</TourCloseTrigger>
          )}
          {children}
        </TourContent>
      </TourPositioner>
    </>
  );

  return (
    <TourVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        tour={tour}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        data-slot="tour"
        data-size={resolved.size}
      >
        {(portal ?? true) ? <Portal>{overlay}</Portal> : overlay}
      </Ark.Root>
    </TourVariantsContext.Provider>
  );
}

export { useTour };
