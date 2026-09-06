import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@75neo/react/button";
import { Error } from "@75neo/react/error";
import { errorSchema } from "@75neo/themes";

const colors = errorSchema.color.values;

const frame = "min-h-44 rounded-lg bg-muted";

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0";
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

export default function ErrorPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {colors.map((color) => (
          <Row key={color} label={color}>
            <Error
              className={frame}
              color={color}
              icon={<TriangleAlert />}
              statusCode={404}
              statusMessage="Page not found"
            />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="bare">
          <Error className={frame} statusCode={500} statusMessage="Something went wrong" />
        </Row>

        <Row label="full">
          <Error
            className={frame}
            icon={<TriangleAlert />}
            statusCode={404}
            statusMessage="Page not found"
            message="The page you asked for is not here."
          >
            <Button variant="outline" color="neutral">
              Go back
            </Button>
          </Error>
        </Row>
      </div>
    </div>
  );
}
