import type React from "react";
import { Carousel as Ark, type CarouselRootProps } from "@ark-ui/react/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type CarouselItem, type CarouselProps as CarouselContract, carousel } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

export interface CarouselProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "dir">,
    Pick<CarouselRootProps, "page" | "defaultPage" | "onPageChange" | "ids">,
    CarouselContract<React.ReactNode> {
  /** Replace a slide's content with arbitrary markup. Falls back to `item.content`. */
  renderItem?: (item: CarouselItem, index: number) => React.ReactNode;
}

export function Carousel({
  ui,
  items,
  orientation,
  loop,
  autoplay,
  slidesPerPage,
  spacing,
  allowMouseDrag,
  prevIcon,
  nextIcon,
  renderItem,
  className,
  page,
  defaultPage,
  onPageChange,
  ids,
  ...rest
}: CarouselProps) {
  const theme = useResolvedTheme(carousel, "carousel", { ui }, className);

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      slideCount={items.length}
      orientation={orientation}
      loop={loop}
      autoplay={autoplay}
      slidesPerPage={slidesPerPage}
      spacing={spacing}
      allowMouseDrag={allowMouseDrag}
      page={page}
      defaultPage={defaultPage}
      onPageChange={onPageChange}
      ids={ids}
    >
      <Ark.Control data-slot="control" className={theme.class.control}>
        <Ark.PrevTrigger data-slot="prevTrigger" className={theme.class.prevTrigger}>
          {prevIcon ?? <ChevronLeft />}
        </Ark.PrevTrigger>
        <Ark.ItemGroup data-slot="itemGroup" className={theme.class.itemGroup}>
          {items.map((item, index) => (
            <Ark.Item key={item.id} index={index} data-slot="item" className={theme.class.item}>
              {renderItem?.(item, index) ?? item.content}
            </Ark.Item>
          ))}
        </Ark.ItemGroup>
        <Ark.NextTrigger data-slot="nextTrigger" className={theme.class.nextTrigger}>
          {nextIcon ?? <ChevronRight />}
        </Ark.NextTrigger>
      </Ark.Control>
      <Ark.IndicatorGroup data-slot="indicatorGroup" className={theme.class.indicatorGroup}>
        {items.map((_, index) => (
          <Ark.Indicator
            key={index}
            index={index}
            data-slot="indicator"
            className={theme.class.indicator}
          />
        ))}
      </Ark.IndicatorGroup>
    </Ark.Root>
  );
}
