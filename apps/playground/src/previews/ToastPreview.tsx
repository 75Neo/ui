import type { ReactNode } from "react";
import { Toaster, createToaster } from "@75neo/react/toast";

const toaster = createToaster({ placement: "bottom-end", gap: 12, max: 3 });

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
const group = "flex flex-col gap-5";

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

function notify(type: "info" | "success" | "warning" | "error" | "loading") {
  toaster.create({
    title: `${type[0].toUpperCase()}${type.slice(1)} toast`,
    description: "Created from the store, styled by its type.",
    type,
  });
}

export default function ToastPreview() {
  return (
    <div className="@container">
      <div className={group}>
        <Row label="types">
          {(["info", "success", "warning", "error", "loading"] as const).map((type) => (
            <button key={type} type="button" onClick={() => notify(type)}>
              {type}
            </button>
          ))}
        </Row>

        <Row label="action">
          <button
            type="button"
            onClick={() =>
              toaster.create({
                title: "Undo available",
                description: "The file moved to trash.",
                action: { label: "Undo", onClick: () => {} },
              })
            }
          >
            Action toast
          </button>
        </Row>
      </div>

      <Toaster toaster={toaster} />
    </div>
  );
}
