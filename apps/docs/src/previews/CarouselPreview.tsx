import { Carousel } from "@75neo/react/carousel";

const items = [
  { id: "one", content: "Slide one" },
  { id: "two", content: "Slide two" },
  { id: "three", content: "Slide three" },
];

export function CarouselPreview() {
  return (
    <Carousel
      items={items}
      className="w-full max-w-sm [&_[data-slot=carousel-item]]:grid [&_[data-slot=carousel-item]]:h-32 [&_[data-slot=carousel-item]]:place-items-center"
    />
  );
}
