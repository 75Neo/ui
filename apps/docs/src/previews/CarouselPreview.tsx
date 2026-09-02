import { Carousel } from "@75neo/react";

const items = [
  { id: "recipe", content: "The recipe" },
  { id: "theme", content: "Theme layers" },
  { id: "ui", content: "The ui prop" },
  { id: "class", content: "class at the call site" },
];

export function CarouselPreview() {
  return (
    <Carousel
      items={items}
      loop
      allowMouseDrag
      ui={{ item: "grid h-32 place-items-center text-sm text-highlighted" }}
    />
  );
}
