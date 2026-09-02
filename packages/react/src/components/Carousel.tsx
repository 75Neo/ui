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
      <Ark.Control data-slot="controls" className={theme.class.controls}>
        <Ark.PrevTrigger data-slot="prev" className={theme.class.prev}>
          {prevIcon ?? <ChevronLeft />}
        </Ark.PrevTrigger>
        <Ark.ItemGroup data-slot="viewport" className={theme.class.viewport}>
          {items.map((item, index) => (
            <Ark.Item key={item.id} index={index} data-slot="item" className={theme.class.item}>
              {renderItem?.(item, index) ?? item.content}
            </Ark.Item>
          ))}
        </Ark.ItemGroup>
        <Ark.NextTrigger data-slot="next" className={theme.class.next}>
          {nextIcon ?? <ChevronRight />}
        </Ark.NextTrigger>
      </Ark.Control>
      <Ark.IndicatorGroup data-slot="dots" className={theme.class.dots}>
        {items.map((_, index) => (
          <Ark.Indicator key={index} index={index} data-slot="dot" className={theme.class.dot} />
        ))}
      </Ark.IndicatorGroup>
    </Ark.Root>
  );
}
