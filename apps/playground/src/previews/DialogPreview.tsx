import { useState } from "react";
import { dialog, variantValues } from "@75neo/themes";
import { Button, Dialog } from "@75neo/react";
import { TriangleAlert } from "lucide-react";

const sizes = variantValues(dialog, "size");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const body = (
  <>
    <p>
      Deleting <strong>rings-of-power</strong> removes its themes, its adapters and every preview
      built from them. Nothing here is recoverable from the playground.
    </p>
    <p className="mt-3">
      Members keep their accounts. Anything they published from this project stops resolving within
      the hour.
    </p>
  </>
);

const footer = (
  <>
    <Button variant="ghost" color="neutral" size="sm">
      Cancel
    </Button>
    <Button color="error" size="sm">
      Delete project
    </Button>
  </>
);

export default function DialogPreview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Dialog
            size={size}
            title="Delete this project?"
            description="This cannot be undone."
            body={body}
            footer={footer}
          >
            <Button variant="outline" color="neutral" size="sm">
              The {size} size
            </Button>
          </Dialog>
        </div>
      ))}

      <hr className="border-muted" />

      {/* Nothing but the buttons closes this one: no Escape, no click outside, no ✕. */}
      <div className={row}>
        <p className={rowLabel} data-identifier>
          insistent
        </p>
        <Dialog
          role="alertdialog"
          dismissible={false}
          close={false}
          title="Your session is about to expire"
          description="You will be signed out in two minutes."
          body={
            <p className="flex items-start gap-2">
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warning" />
              <span>
                Escape does nothing here and neither does a click outside, because losing unsaved
                work to a stray keypress is worse than an extra click.
              </span>
            </p>
          }
          footer={
            <Button color="warning" size="sm">
              Stay signed in
            </Button>
          }
        >
          <Button variant="outline" color="neutral" size="sm">
            Not dismissible
          </Button>
        </Dialog>
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          still
        </p>
        <Dialog
          transition={false}
          overlay={false}
          title="No motion, no overlay"
          description="The panel appears and leaves without animating, over an undimmed page."
          body={
            <p>
              {
                "Turn the transition off where the application already honours prefers-reduced-motion."
              }
            </p>
          }
        >
          <Button variant="outline" color="neutral" size="sm">
            No transition
          </Button>
        </Dialog>
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          fullscreen
        </p>
        <Dialog
          fullscreen
          title="The whole viewport"
          description="The panel fills the screen and the body scrolls inside it."
          body={
            <div className="flex flex-col gap-3">
              {Array.from({ length: 12 }, (_, index) => (
                <p key={index}>
                  Paragraph {index + 1}. The header and the footer stay pinned while this scrolls,
                  because the panel hides its own overflow and the body takes what height is left.
                </p>
              ))}
            </div>
          }
          footer={footer}
        >
          <Button variant="outline" color="neutral" size="sm">
            Fullscreen
          </Button>
        </Dialog>
      </div>

      <hr className="border-muted" />

      {/* Controlled: the button outside owns the state, and there is no trigger inside. */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          className="w-fit cursor-pointer text-sm text-primary underline-offset-4 hover:underline"
          onClick={() => setOpen(true)}
        >
          Open from out here
        </button>
        <Dialog
          open={open}
          onOpenChange={(details) => setOpen(details.open)}
          title="Controlled"
          description="No trigger inside this one; the link above owns the state."
          body={<p>Closing it any way at all reports back through onOpenChange.</p>}
        />
      </div>
    </div>
  );
}
