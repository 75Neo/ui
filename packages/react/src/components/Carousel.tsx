import * as React from "react";
import { Carousel as ArkCarousel } from "@ark-ui/react/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { carousel, type CarouselVariants } from "@75neo/styles";
import {
  applySlotClass,
  carouselKey,
  normalizeCarouselItems,
  type CarouselItemData,
  type CarouselUI,
} from "@75neo/core";
import { useComponentUI } from "../hooks/useComponentUI";
import { renderSlot, type Slot } from "../utils/renderSlot";

export type CarouselItem = CarouselItemData<React.ReactNode>;

/** Scope handed to the `item` slot, matching Vue's `{ item, index }`. */
export type CarouselSlotBag = { item: CarouselItem; index: number };

export type CarouselProps = Omit<
  React.ComponentProps<typeof ArkCarousel.Root>,
  "children" | "slideCount" | "content" | "item"
> & {
  items?: (CarouselItem | string | number)[];
  orientation?: CarouselVariants["orientation"];
  arrows?: boolean;
  dots?: boolean;
  ui?: CarouselUI;
  /** Mirrors Vue's `#item` slot; falls back to `item.content`. */
  item?: Slot<CarouselSlotBag>;
  /** Mirrors Vue's `#prev` slot; falls back to a chevron. */
  prev?: Slot;
  /** Mirrors Vue's `#next` slot; falls back to a chevron. */
  next?: Slot;
  /** Mirrors Vue's `#empty` slot; rendered when `items` is empty. */
  empty?: Slot;
};

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      ui,
      items,
      orientation,
      arrows = false,
      dots = false,
      item,
      prev,
      next,
      empty,
      className,
      ...props
    },
    ref,
  ) => {
    const tvSlots = React.useMemo(() => carousel({ orientation }), [orientation]);
    const resolved = useComponentUI(carouselKey, tvSlots, ui);

    const normalized = React.useMemo(() => normalizeCarouselItems<React.ReactNode>(items), [items]);

    return (
      <ArkCarousel.Root
        ref={ref}
        slideCount={normalized.length}
        orientation={orientation}
        className={resolved.root({ className })}
        data-slot="root"
        {...props}
      >
        {normalized.length === 0 ? (
          renderSlot(empty)
        ) : (
          <>
            <div data-slot="viewport" className={resolved.viewport()}>
              <ArkCarousel.ItemGroup data-slot="container" className={resolved.container()}>
                {normalized.map((entry, index) => (
                  <ArkCarousel.Item
                    key={index}
                    index={index}
                    data-slot="item"
                    className={twMerge(
                      applySlotClass(resolved.item(), entry.ui?.item),
                      entry.class,
                    )}
                  >
                    {renderSlot(item, { item: entry, index }, entry.content)}
                  </ArkCarousel.Item>
                ))}
              </ArkCarousel.ItemGroup>
            </div>

            {(arrows || dots) && (
              <div data-slot="controls" className={resolved.controls()}>
                {arrows && (
                  <div data-slot="arrows" className={resolved.arrows()}>
                    <ArkCarousel.PrevTrigger
                      data-slot="prev"
                      aria-label="Previous slide"
                      className={resolved.prev()}
                    >
                      {renderSlot(prev, undefined, <ChevronLeft />)}
                    </ArkCarousel.PrevTrigger>
                    <ArkCarousel.NextTrigger
                      data-slot="next"
                      aria-label="Next slide"
                      className={resolved.next()}
                    >
                      {renderSlot(next, undefined, <ChevronRight />)}
                    </ArkCarousel.NextTrigger>
                  </div>
                )}
                {dots && (
                  <ArkCarousel.IndicatorGroup data-slot="dots" className={resolved.dots()}>
                    {normalized.map((_, index) => (
                      <ArkCarousel.Indicator
                        key={index}
                        index={index}
                        data-slot="dot"
                        className={resolved.dot()}
                      />
                    ))}
                  </ArkCarousel.IndicatorGroup>
                )}
              </div>
            )}
          </>
        )}
      </ArkCarousel.Root>
    );
  },
);
Carousel.displayName = "Carousel";
