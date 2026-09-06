import type React from "react";
import { Carousel as Ark } from "@ark-ui/react/carousel";
import { carouselDefaults, cn, type CarouselRootProps as CarouselContract } from "@75neo/themes";
import { CarouselVariantsContext } from "./variants";
import { CarouselControl } from "./control";
import { CarouselIndicator } from "./indicator";
import { CarouselIndicatorGroup } from "./indicator-group";
import { CarouselItem } from "./item";
import { CarouselItemGroup } from "./item-group";
import { CarouselNextTrigger } from "./next-trigger";
import { CarouselPrevTrigger } from "./prev-trigger";

/**
 * Props for the Carousel.
 *
 * @remarks
 * The current page comes from Ark, because React and Vue spell a controlled page too
 * differently to share one type.
 */
export interface CarouselProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "dir">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      "page" | "defaultPage" | "onPageChange" | "onDragStatusChange" | "ids"
    >,
    CarouselContract {
  children?: React.ReactNode;
}

export function Carousel({
  size,
  items,
  orientation,
  loop,
  autoplay,
  slidesPerPage,
  spacing,
  allowMouseDrag,
  page,
  defaultPage,
  onPageChange,
  onDragStatusChange,
  ids,
  className,
  children,
  ...rest
}: CarouselProps) {
  const resolved = { size: size ?? carouselDefaults.size };

  return (
    <CarouselVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        slideCount={items?.length ?? 0}
        orientation={orientation}
        loop={loop}
        autoplay={autoplay}
        slidesPerPage={slidesPerPage}
        spacing={spacing}
        allowMouseDrag={allowMouseDrag}
        page={page}
        defaultPage={defaultPage}
        onPageChange={onPageChange}
        onDragStatusChange={onDragStatusChange}
        ids={ids}
        data-slot="carousel"
        data-size={resolved.size}
        className={cn(
          "group/carousel flex flex-col gap-4 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-0",
          className,
        )}
      >
        {children ??
          (items != null && (
            <>
              <CarouselControl>
                <CarouselPrevTrigger />
                <CarouselItemGroup>
                  {items.map((item, index) => (
                    <CarouselItem key={item.id} index={index}>
                      {item.content}
                    </CarouselItem>
                  ))}
                </CarouselItemGroup>
                <CarouselNextTrigger />
              </CarouselControl>
              <CarouselIndicatorGroup>
                {items.map((item, index) => (
                  <CarouselIndicator key={item.id} index={index} />
                ))}
              </CarouselIndicatorGroup>
            </>
          ))}
      </Ark.Root>
    </CarouselVariantsContext.Provider>
  );
}
