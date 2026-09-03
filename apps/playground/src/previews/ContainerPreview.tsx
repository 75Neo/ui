import type React from "react";
import { Container } from "@75neo/react";

const measures = ["30rem", "48rem", "72rem"];
const label = "text-dimmed font-mono text-[0.6875rem] leading-none";

/*
 * The edges are drawn on the Container itself, so what is visible is the measure and
 * the gutter rather than a box around them. Each row narrows `--ui-container`, which is
 * the one number a site changes to move every Container, Header and Footer at once.
 */
export default function ContainerPreview() {
  return (
    <div className="flex flex-col gap-6">
      {measures.map((measure) => (
        <div key={measure} className="flex flex-col gap-2">
          <p className={label} data-identifier>
            {measure}
          </p>
          <div
            className="rounded-lg bg-muted py-3"
            style={{ "--ui-container": measure } as React.CSSProperties}
          >
            <Container className="rounded-md bg-default py-3 text-center text-sm ring ring-accented">
              Held to {measure}, and off the edge by the gutter
            </Container>
          </div>
        </div>
      ))}
    </div>
  );
}
