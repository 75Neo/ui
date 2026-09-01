import type { ReactNode } from "react";
import { useState } from "react";
import { carousel } from "@75neo/themes";
import { Carousel } from "@75neo/react";
import type { CarouselItem } from "@75neo/themes";

const baseItems: CarouselItem[] = [
  { id: "1", content: "Slide 1 — The cascade, weakest first." },
  { id: "2", content: "Slide 2 — One word per slot." },
  { id: "3", content: "Slide 3 — Tokens flip, not classes." },
  { id: "4", content: "Slide 4 — Recipes describe themselves." },
  { id: "5", content: "Slide 5 — No per-component context." },
];

/*
 * Both adapters render this scaffold, so the two stages line up row for row and
 * any divergence between React and Vue shows as a break in the rhythm rather
 * than as something you have to hunt for.
 */
const row = "grid gap-2 @sm:grid-cols-[6rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-2";
const rowItems = "min-w-0";
const group = "flex flex-col gap-6";
const rule = "border-muted my-6";
const slide =
  "flex h-32 items-center justify-center rounded-md bg-muted p-4 text-center text-sm font-medium text-default";
const slideWide =
  "flex h-32 w-[80%] shrink-0 items-center justify-center rounded-md bg-muted p-4 text-center text-sm font-medium text-default";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={row}>
      <p className={rowLabel} data-identifier>
        {label}
      </p>
      <div className={rowItems}>{children}</div>
    </div>
  );
}

function Controlled() {
  const [page, setPage] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      <Carousel
        items={baseItems}
        page={page}
        onPageChange={(details) => setPage(details.page)}
        renderItem={(item) => <div className={slide}>{item.content}</div>}
      />
      <p className="font-mono text-xs text-toned" data-identifier>
        page {page}
      </p>
    </div>
  );
}

export default function CarouselPreview() {
  // keep ledger honest — read slots/variants off the recipe
  void carousel;

  return (
    <div className="@container">
      <div className={group}>
        <Row label="default">
          <Carousel
            items={baseItems}
            renderItem={(item) => <div className={slide}>{item.content}</div>}
          />
        </Row>

        <Row label="loop">
          <Carousel
            items={baseItems}
            loop
            renderItem={(item) => <div className={slide}>{item.content}</div>}
          />
        </Row>

        <Row label="autoplay">
          <Carousel
            items={baseItems}
            loop
            autoplay
            renderItem={(item) => <div className={slide}>{item.content}</div>}
          />
        </Row>

        <Row label="slidesPerPage">
          <Carousel
            items={baseItems}
            slidesPerPage={2}
            spacing="16px"
            renderItem={(item) => <div className={slide}>{item.content}</div>}
          />
        </Row>

        <Row label="spacing">
          <Carousel
            items={baseItems}
            slidesPerPage={1.5}
            spacing="16px"
            renderItem={(item) => <div className={slideWide}>{item.content}</div>}
          />
        </Row>

        <Row label="vertical">
          <div className="h-64 overflow-hidden">
            <Carousel
              items={baseItems.slice(0, 3)}
              orientation="vertical"
              renderItem={(item) => <div className={slide}>{item.content}</div>}
            />
          </div>
        </Row>

        <Row label="drag">
          <Carousel
            items={baseItems}
            allowMouseDrag
            renderItem={(item) => <div className={slide}>{item.content} — drag</div>}
          />
        </Row>

        <Row label="render">
          <Carousel
            items={baseItems.slice(0, 3)}
            renderItem={(item, index) => (
              <div className="flex h-32 flex-col items-center justify-center gap-1 rounded-md bg-primary p-4 text-center">
                <span className="font-mono text-xs text-primary-foreground" data-identifier>
                  {item.id} · {index}
                </span>
                <span className="text-sm font-semibold text-primary-foreground">
                  {item.content}
                </span>
              </div>
            )}
          />
        </Row>

        <Row label="controlled">
          <Controlled />
        </Row>
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="ui">
          <Carousel
            items={baseItems.slice(0, 3)}
            ui={{ item: "bg-primary text-primary-foreground" }}
            renderItem={(item) => (
              <div className="flex h-32 items-center justify-center p-4 text-sm">
                {item.content}
              </div>
            )}
          />
        </Row>
      </div>
    </div>
  );
}
