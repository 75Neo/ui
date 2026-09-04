import { useState } from "react";
import { pagination, variantValues } from "@75neo/themes";
import { Pagination } from "@75neo/react";

const sizes = variantValues(pagination, "size");
const colors = variantValues(pagination, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

export default function PaginationPreview() {
  const [page, setPage] = useState(4);

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Pagination size={size} count={200} defaultPage={4} />
        </div>
      ))}

      <hr className="border-muted" />

      {/* The accent fills the current page and nothing else. */}
      {colors.map((accent) => (
        <div key={accent} className={row}>
          <p className={rowLabel} data-identifier>
            {accent}
          </p>
          <Pagination color={accent} size="sm" count={200} defaultPage={4} />
        </div>
      ))}

      <hr className="border-muted" />

      <div className="flex flex-col gap-5">
        {/* `count` is how many things there are, not how many pages. */}
        <Pagination count={95} pageSize={10} defaultPage={5} edges />
        <Pagination count={200} siblingCount={2} boundaryCount={2} defaultPage={10} />
        <Pagination count={200} siblingCount={0} boundaryCount={1} defaultPage={10} />
        <Pagination count={30} defaultPage={1} />

        {/* With addresses the pages are anchors, so a crawler can follow them. */}
        <Pagination count={200} defaultPage={4} href={(to) => `#page-${to}`} />
      </div>

      <hr className="border-muted" />

      <div className="flex flex-wrap items-center gap-4">
        <Pagination
          count={200}
          page={page}
          onPageChange={(details: { page: number }) => setPage(details.page)}
          edges
        />
        <output className="font-mono text-sm text-toned">page {page}</output>
      </div>
    </div>
  );
}
