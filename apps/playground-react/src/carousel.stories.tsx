import preview from "../.storybook/preview";
import { Carousel, Theme } from "@75neo/react";
import { useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

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

const basicItems = Array.from({ length: 5 }, (_, i) => ({
  content: (
    <div className="bg-muted flex h-48 items-center justify-center rounded-lg text-2xl font-semibold">
      {i + 1}
    </div>
  ),
}));

export const Default = meta.story({
  render: () => (
    <div className="w-full max-w-xl">
      <Carousel items={basicItems} />
      <p className="text-muted mt-2 text-xs">
        Swipe or drag — use <code>arrows</code>/<code>dots</code>
      </p>
    </div>
  ),
});

export const WithArrows = meta.story({
  render: () => (
    <div className="w-full max-w-xl">
      <Carousel arrows items={basicItems} />
    </div>
  ),
});

export const WithDots = meta.story({
  render: () => (
    <div className="w-full max-w-xl pb-8">
      <Carousel dots items={basicItems} />
    </div>
  ),
});

export const WithImages = meta.story({
  render: () => (
    <div className="w-full max-w-xl">
      <Carousel
        items={images.map((img) => ({
          content: (
            <img src={img.src} alt={img.alt} className="h-64 w-full rounded-lg object-cover" />
          ),
        }))}
      />
    </div>
  ),
});

const controlledItems = Array.from({ length: 5 }, (_, i) => ({
  content: (
    <div className="bg-muted flex h-48 items-center justify-center rounded-lg text-2xl font-semibold">
      {i + 1}
    </div>
  ),
}));

function ControlledDemo() {
  const [page, setPage] = useState(0);
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <Carousel items={controlledItems} page={page} onPageChange={(e) => setPage(e.page)} />
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

export const Vertical = meta.story({
  render: () => (
    <div className="w-full max-w-xl">
      <Carousel orientation="vertical" items={basicItems} />
    </div>
  ),
});

export const Slots = meta.story({
  render: () => (
    <div className="w-full max-w-xl">
      <Carousel
        arrows
        dots
        items={[1, 2, 3, 4, 5]}
        item={({ item, index }) => (
          <div className="bg-muted flex h-48 items-center justify-center rounded-lg text-2xl font-semibold">
            {item.content} · slide {index + 1}
          </div>
        )}
        prev={<ChevronsLeft />}
        next={<ChevronsRight />}
      />
      <p className="text-muted mt-2 text-xs">
        <code>item</code>, <code>prev</code> and <code>next</code> render props — <code>item</code>{" "}
        receives <code>{"{ item, index }"}</code>
      </p>
    </div>
  ),
});

export const Themed = meta.story({
  render: () => (
    <div className="flex w-full max-w-xl flex-col gap-6 pb-8">
      <Carousel dots arrows items={basicItems} />
      <Theme
        ui={{
          carousel: {
            dot: "bg-primary/30 data-[state=active]:bg-primary h-2 w-6 rounded-full",
            prev: "bg-primary text-white hover:bg-primary/90 border-transparent",
            next: "bg-primary text-white hover:bg-primary/90 border-transparent",
          },
        }}
      >
        <Carousel arrows dots items={basicItems} ui={{ item: "basis-1/2" }} />
      </Theme>
    </div>
  ),
});
