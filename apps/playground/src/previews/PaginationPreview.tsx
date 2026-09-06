import type { ReactNode } from "react";
import { Pagination } from "@75neo/react/pagination";
import { paginationSchema } from "@75neo/themes";

const sizes = paginationSchema.size.values;
const colors = paginationSchema.color.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";

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

export default function PaginationPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Pagination size={size} count={96} defaultPage={4} />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        {colors.map((color) => (
          <Row key={color} label={color}>
            <Pagination color={color} count={48} defaultPage={2} />
          </Row>
        ))}

        <Row label="edges">
          <Pagination count={200} defaultPage={7} edges />
        </Row>

        <Row label="links">
          <Pagination count={48} defaultPage={2} href={(page) => `#page-${page}`} />
        </Row>
      </div>
    </div>
  );
}
