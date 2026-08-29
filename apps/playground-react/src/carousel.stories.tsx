import preview from "../.storybook/preview";
import {
  Carousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  Theme,
} from "@75neo/react";
import { useState } from "react";

const meta = preview.meta({
  title: "Carousel",
  component: Carousel,
});

const images = [
  { src: "https://nstcrystal.is-a.dev/images/Thirty_seven_1.png", alt: "nstcrystal" },
  { src: "https://nstcrystal.is-a.dev/images/Voyager.png", alt: "2giosangmitom" },
  { src: "https://nstcrystal.is-a.dev/images/Thirty_seven_2.png", alt: "nstcrystal" },
  { src: "https://nstcrystal.is-a.dev/images/Cosmic_overture.png", alt: "2giosangmitom" },
  {
    src: "https://nstcrystal.is-a.dev/_vercel/image?url=%2Fimages%2Freverse1999.png&w=1536&q=100",
    alt: "nstcrystal",
  },
];

export const Default = meta.story({
  render: () => (
    <div className="w-full max-w-xl">
      <Carousel
        items={Array.from({ length: 5 }, (_, i) => ({
          content: (
            <div className="bg-muted flex h-48 items-center justify-center rounded-lg text-2xl font-semibold">
              {i + 1}
            </div>
          ),
        }))}
      />
    </div>
  ),
});

export const WithImages = meta.story({
  render: () => (
    <div className="w-full max-w-xl">
      <Carousel
        items={images.map((img) => ({
          content: (
            <img
              src={img.src}
              alt={img.alt}
              className="h-64 w-full rounded-lg object-cover"
              width={500}
              height={300}
            />
          ),
        }))}
      />
    </div>
  ),
});

function ControlledDemo() {
  const [page, setPage] = useState(0);
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Carousel
        items={Array.from({ length: 5 }, (_, i) => ({
          content: (
            <div className="bg-muted flex h-48 items-center justify-center rounded-lg text-2xl font-semibold">
              {i + 1}
            </div>
          ),
        }))}
        page={page}
        onPageChange={(e) => setPage(e.page)}
      />
      <div className="text-muted flex items-center justify-between text-sm">
        <span>
          Page: <span className="text-default font-mono font-semibold">{page + 1} / 5</span>
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="bg-muted hover:bg-accented rounded px-2 py-1 text-xs"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(4, p + 1))}
            className="bg-muted hover:bg-accented rounded px-2 py-1 text-xs"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export const Controlled = meta.story({
  render: () => <ControlledDemo />,
});

export const Autoplay = meta.story({
  render: () => (
    <div className="w-full max-w-xl">
      <Carousel
        items={images.map((img) => ({
          content: (
            <img src={img.src} alt={img.alt} className="h-64 w-full rounded-lg object-cover" />
          ),
        }))}
        autoplay
        loop
      />
      <p className="text-muted mt-2 text-xs">Autoplay with loop — advances every 4s.</p>
    </div>
  ),
});

export const Loop = meta.story({
  render: () => (
    <div className="w-full max-w-xl">
      <Carousel
        items={Array.from({ length: 5 }, (_, i) => ({
          content: (
            <div className="bg-muted flex h-48 items-center justify-center rounded-lg text-2xl font-semibold">
              {i + 1}
            </div>
          ),
        }))}
        loop
      />
      <p className="text-muted mt-2 text-xs">Loop enabled — navigation wraps around.</p>
    </div>
  ),
});

export const Vertical = meta.story({
  render: () => (
    <div className="w-full max-w-xl">
      <Carousel
        orientation="vertical"
        items={Array.from({ length: 5 }, (_, i) => ({
          content: (
            <div className="bg-muted flex h-48 items-center justify-center rounded-lg text-2xl font-semibold">
              {i + 1}
            </div>
          ),
        }))}
      />
    </div>
  ),
});

export const SlidesPerPage = meta.story({
  render: () => (
    <div className="w-full max-w-xl">
      <Carousel
        slideCount={6}
        slidesPerPage={2}
        spacing="12px"
        items={Array.from({ length: 6 }, (_, i) => ({
          content: (
            <div className="bg-muted flex h-32 items-center justify-center rounded-lg text-lg font-semibold">
              {i + 1}
            </div>
          ),
        }))}
      />
      <p className="text-muted mt-2 text-xs">slidesPerPage=2 with 12px spacing.</p>
    </div>
  ),
});

export const Spacing = meta.story({
  render: () => (
    <div className="w-full max-w-xl">
      <Carousel
        slideCount={6}
        slidesPerPage={1.5}
        spacing="16px"
        items={Array.from({ length: 6 }, (_, i) => ({
          content: (
            <div className="bg-muted flex h-32 items-center justify-center rounded-lg text-lg font-semibold">
              {i + 1}
            </div>
          ),
        }))}
      />
      <p className="text-muted mt-2 text-xs">slidesPerPage=1.5 shows partial next slide.</p>
    </div>
  ),
});

export const Composition = meta.story({
  render: () => (
    <div className="flex w-full max-w-xl flex-col gap-2">
      <Carousel slideCount={images.length} className="gap-4">
        <CarouselControl>
          <CarouselPrevTrigger />
          <CarouselNextTrigger />
        </CarouselControl>
        <CarouselItemGroup>
          {images.map((img, index) => (
            <CarouselItem key={index} index={index}>
              <img src={img.src} alt={img.alt} className="h-64 w-full rounded-lg object-cover" />
            </CarouselItem>
          ))}
        </CarouselItemGroup>
        <CarouselIndicatorGroup>
          {images.map((_, index) => (
            <CarouselIndicator key={index} index={index} />
          ))}
        </CarouselIndicatorGroup>
      </Carousel>
      <span className="text-muted text-xs">Built from primitives for full customization.</span>
    </div>
  ),
});

export const Themed = meta.story({
  render: () => (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <Carousel
        items={Array.from({ length: 3 }, (_, i) => ({
          content: (
            <div className="bg-muted flex h-32 items-center justify-center rounded-lg text-lg font-semibold">
              {i + 1}
            </div>
          ),
        }))}
      />
      <Theme
        ui={{
          carousel: {
            indicator: "bg-primary/30 data-[current]:bg-primary h-2 w-6 rounded-full",
            prevTrigger: "bg-primary text-white hover:bg-primary/90 border-transparent",
            nextTrigger: "bg-primary text-white hover:bg-primary/90 border-transparent",
          },
        }}
      >
        <Carousel
          items={Array.from({ length: 3 }, (_, i) => ({
            content: (
              <div className="bg-muted flex h-32 items-center justify-center rounded-lg text-lg font-semibold">
                {i + 1}
              </div>
            ),
          }))}
        />
      </Theme>
      <p className="text-muted text-xs">
        Bottom carousel themed via <code>Theme</code> provider (custom indicators & triggers).
      </p>
    </div>
  ),
});
