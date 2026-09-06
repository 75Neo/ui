import type { ReactNode } from "react";
import { Dialog } from "@75neo/react/dialog";
import { dialogSchema } from "@75neo/themes";

const sizes = dialogSchema.size.values;

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

export default function DialogPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Dialog
              size={size}
              title="Delete project?"
              description="This cannot be undone."
              body="The project and its history leave the workspace for good."
              footer="Cancel"
            >
              <button type="button">Open {size}</button>
            </Dialog>
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="overlay off">
          <Dialog title="No backdrop" body="The page behind stays interactive." overlay={false}>
            <button type="button">Bare</button>
          </Dialog>
        </Row>

        <Row label="close off">
          <Dialog
            title="Must choose"
            body="Answer through the footer."
            close={false}
            footer="Answer"
          >
            <button type="button">Choose</button>
          </Dialog>
        </Row>

        <Row label="fullscreen">
          <Dialog title="Full page" body="The panel takes the viewport." fullscreen>
            <button type="button">Expand</button>
          </Dialog>
        </Row>
      </div>
    </div>
  );
}
