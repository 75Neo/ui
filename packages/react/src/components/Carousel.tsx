import * as React from "react";
import { Carousel as ArkCarousel } from "@ark-ui/react/carousel";
import { carousel, type CarouselVariants, type SlotClass } from "@75neo/styles";
import { useComponentUI } from "../hooks/useComponentUI";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { twMerge } from "tailwind-merge";

export type CarouselUI = {
  root?: SlotClass;
  control?: SlotClass;
  itemGroup?: SlotClass;
  item?: SlotClass;
  indicatorGroup?: SlotClass;
  indicator?: SlotClass;
  prevTrigger?: SlotClass;
  nextTrigger?: SlotClass;
  autoplayTrigger?: SlotClass;
  autoplayIndicator?: SlotClass;
  progressText?: SlotClass;
};

export type CarouselItemData = {
  content?: React.ReactNode;
  ui?: Partial<Record<"item" | "indicator", SlotClass>>;
};

export type CarouselProps = Omit<
  React.ComponentProps<typeof ArkCarousel.Root>,
  "children" | "slideCount"
> & {
  slideCount?: number;
  items?: CarouselItemData[];
  orientation?: CarouselVariants["orientation"];
  ui?: CarouselUI;
  children?: React.ReactNode;
  showIndicators?: boolean;
  showControls?: boolean;
};

function applySlotClass(base: string, slotClass?: SlotClass): string {
  if (!slotClass) return base;
  if (typeof slotClass === "function") return slotClass(base);
  return twMerge(base, slotClass);
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      ui,
      items,
      orientation,
      children,
      className,
      slideCount,
      showIndicators = true,
      showControls = true,
      ...props
    },
    ref,
  ) => {
    const tvSlots = React.useMemo(() => carousel({ orientation }), [orientation]);
    const resolved = useComponentUI("carousel", tvSlots, ui);

    const count = items?.length ?? slideCount ?? 0;

    if (children) {
      return (
        <ArkCarousel.Root
          ref={ref}
          slideCount={count}
          orientation={orientation}
          className={resolved.root({ className })}
          data-slot="root"
          {...props}
        >
          {children}
        </ArkCarousel.Root>
      );
    }

    if (items?.length) {
      return (
        <ArkCarousel.Root
          ref={ref}
          slideCount={items.length}
          orientation={orientation}
          className={resolved.root({ className })}
          data-slot="root"
          {...props}
        >
          {showControls && (
            <ArkCarousel.Control className={resolved.control()} data-slot="control">
              <ArkCarousel.PrevTrigger className={resolved.prevTrigger()} data-slot="prevTrigger">
                <ChevronLeft />
              </ArkCarousel.PrevTrigger>
              <ArkCarousel.NextTrigger className={resolved.nextTrigger()} data-slot="nextTrigger">
                <ChevronRight />
              </ArkCarousel.NextTrigger>
            </ArkCarousel.Control>
          )}
          <ArkCarousel.ItemGroup className={resolved.itemGroup()} data-slot="itemGroup">
            {items.map((item, index) => {
              const itemClass = applySlotClass(resolved.item(), item.ui?.item);
              return (
                <ArkCarousel.Item key={index} index={index} className={itemClass} data-slot="item">
                  {item.content}
                </ArkCarousel.Item>
              );
            })}
          </ArkCarousel.ItemGroup>
          {showIndicators && (
            <ArkCarousel.IndicatorGroup
              className={resolved.indicatorGroup()}
              data-slot="indicatorGroup"
            >
              {items.map((item, index) => {
                const indicatorClass = applySlotClass(resolved.indicator(), item.ui?.indicator);
                return (
                  <ArkCarousel.Indicator
                    key={index}
                    index={index}
                    className={indicatorClass}
                    data-slot="indicator"
                  />
                );
              })}
            </ArkCarousel.IndicatorGroup>
          )}
        </ArkCarousel.Root>
      );
    }

    return (
      <ArkCarousel.Root
        ref={ref}
        slideCount={count}
        orientation={orientation}
        className={resolved.root({ className })}
        data-slot="root"
        {...props}
      >
        {children}
      </ArkCarousel.Root>
    );
  },
);
Carousel.displayName = "Carousel";

// --- Primitive exports for composition ---

export const CarouselRoot = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ArkCarousel.Root> & {
    orientation?: CarouselVariants["orientation"];
    ui?: CarouselUI;
  }
>(({ orientation, ui, className, ...props }, ref) => {
  const tvSlots = React.useMemo(() => carousel({ orientation }), [orientation]);
  const resolved = useComponentUI("carousel", tvSlots, ui);
  return (
    <ArkCarousel.Root
      ref={ref}
      orientation={orientation}
      className={resolved.root({ className })}
      data-slot="root"
      {...props}
    />
  );
});
CarouselRoot.displayName = "CarouselRoot";

export const CarouselControl = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ArkCarousel.Control> & { ui?: CarouselUI }
>(({ className, ui, ...props }, ref) => {
  const tvSlots = React.useMemo(() => carousel({}), []);
  const resolved = useComponentUI("carousel", tvSlots, ui);
  return (
    <ArkCarousel.Control
      ref={ref}
      className={resolved.control({ className })}
      data-slot="control"
      {...props}
    />
  );
});
CarouselControl.displayName = "CarouselControl";

export const CarouselItemGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ArkCarousel.ItemGroup> & { ui?: CarouselUI }
>(({ className, ui, ...props }, ref) => {
  const tvSlots = React.useMemo(() => carousel({}), []);
  const resolved = useComponentUI("carousel", tvSlots, ui);
  return (
    <ArkCarousel.ItemGroup
      ref={ref}
      className={resolved.itemGroup({ className })}
      data-slot="itemGroup"
      {...props}
    />
  );
});
CarouselItemGroup.displayName = "CarouselItemGroup";

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ArkCarousel.Item> & { ui?: CarouselUI }
>(({ className, ui, ...props }, ref) => {
  const tvSlots = React.useMemo(() => carousel({}), []);
  const resolved = useComponentUI("carousel", tvSlots, ui);
  return (
    <ArkCarousel.Item
      ref={ref}
      className={resolved.item({ className })}
      data-slot="item"
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

export const CarouselIndicatorGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ArkCarousel.IndicatorGroup> & { ui?: CarouselUI }
>(({ className, ui, ...props }, ref) => {
  const tvSlots = React.useMemo(() => carousel({}), []);
  const resolved = useComponentUI("carousel", tvSlots, ui);
  return (
    <ArkCarousel.IndicatorGroup
      ref={ref}
      className={resolved.indicatorGroup({ className })}
      data-slot="indicatorGroup"
      {...props}
    />
  );
});
CarouselIndicatorGroup.displayName = "CarouselIndicatorGroup";

export const CarouselIndicator = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof ArkCarousel.Indicator> & { ui?: CarouselUI }
>(({ className, ui, ...props }, ref) => {
  const tvSlots = React.useMemo(() => carousel({}), []);
  const resolved = useComponentUI("carousel", tvSlots, ui);
  return (
    <ArkCarousel.Indicator
      ref={ref}
      className={resolved.indicator({ className })}
      data-slot="indicator"
      {...props}
    />
  );
});
CarouselIndicator.displayName = "CarouselIndicator";

export const CarouselPrevTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof ArkCarousel.PrevTrigger> & { ui?: CarouselUI }
>(({ className, ui, children, ...props }, ref) => {
  const tvSlots = React.useMemo(() => carousel({}), []);
  const resolved = useComponentUI("carousel", tvSlots, ui);
  return (
    <ArkCarousel.PrevTrigger
      ref={ref}
      className={resolved.prevTrigger({ className })}
      data-slot="prevTrigger"
      {...props}
    >
      {children ?? <ChevronLeft />}
    </ArkCarousel.PrevTrigger>
  );
});
CarouselPrevTrigger.displayName = "CarouselPrevTrigger";

export const CarouselNextTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof ArkCarousel.NextTrigger> & { ui?: CarouselUI }
>(({ className, ui, children, ...props }, ref) => {
  const tvSlots = React.useMemo(() => carousel({}), []);
  const resolved = useComponentUI("carousel", tvSlots, ui);
  return (
    <ArkCarousel.NextTrigger
      ref={ref}
      className={resolved.nextTrigger({ className })}
      data-slot="nextTrigger"
      {...props}
    >
      {children ?? <ChevronRight />}
    </ArkCarousel.NextTrigger>
  );
});
CarouselNextTrigger.displayName = "CarouselNextTrigger";

export const CarouselAutoplayTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof ArkCarousel.AutoplayTrigger> & { ui?: CarouselUI }
>(({ className, ui, ...props }, ref) => {
  const tvSlots = React.useMemo(() => carousel({}), []);
  const resolved = useComponentUI("carousel", tvSlots, ui);
  return (
    <ArkCarousel.AutoplayTrigger
      ref={ref}
      className={resolved.autoplayTrigger({ className })}
      data-slot="autoplayTrigger"
      {...props}
    />
  );
});
CarouselAutoplayTrigger.displayName = "CarouselAutoplayTrigger";

export const CarouselAutoplayIndicator = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<typeof ArkCarousel.AutoplayIndicator> & { ui?: CarouselUI }
>(({ className, ui, ...props }, ref) => {
  const tvSlots = React.useMemo(() => carousel({}), []);
  const resolved = useComponentUI("carousel", tvSlots, ui);
  return (
    <ArkCarousel.AutoplayIndicator
      ref={ref}
      className={resolved.autoplayIndicator({ className })}
      data-slot="autoplayIndicator"
      {...props}
    />
  );
});
CarouselAutoplayIndicator.displayName = "CarouselAutoplayIndicator";

export const CarouselProgressText = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<typeof ArkCarousel.ProgressText> & { ui?: CarouselUI }
>(({ className, ui, ...props }, ref) => {
  const tvSlots = React.useMemo(() => carousel({}), []);
  const resolved = useComponentUI("carousel", tvSlots, ui);
  return (
    <ArkCarousel.ProgressText
      ref={ref}
      className={resolved.progressText({ className })}
      data-slot="progressText"
      {...props}
    />
  );
});
CarouselProgressText.displayName = "CarouselProgressText";

export const CarouselContext = ArkCarousel.Context;
