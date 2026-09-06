import { useState, type ReactNode } from "react";
import { Moon, Pause, Play, Sun } from "lucide-react";
import { Button } from "@75neo/react/button";
import { Swap } from "@75neo/react/swap";
import { swapSchema } from "@75neo/themes";

const sizes = swapSchema.size.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-2";
const rowItems = "flex min-w-0 flex-wrap items-center gap-3";
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

export default function SwapPreview() {
  const [dark, setDark] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="@container">
      <div className={group}>
        <Row label="sizes">
          {sizes.map((size) => (
            <Swap key={size} size={size} swapped onIcon={<Moon />} offIcon={<Sun />} />
          ))}
        </Row>
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="off">
          <Swap onIcon={<Moon />} offIcon={<Sun />} />
        </Row>

        <Row label="on">
          <Swap swapped onIcon={<Moon />} offIcon={<Sun />} />
        </Row>

        <Row label="in a button">
          <Button variant="outline" color="neutral" square onClick={() => setDark(!dark)}>
            <Swap swapped={dark} onIcon={<Moon />} offIcon={<Sun />} />
          </Button>
          <Button variant="solid" square onClick={() => setPlaying(!playing)}>
            <Swap swapped={playing} onIcon={<Pause />} offIcon={<Play />} />
          </Button>
        </Row>
      </div>
    </div>
  );
}
