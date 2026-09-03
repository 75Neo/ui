import type React from "react";
import { Container } from "@75neo/react";

export function ContainerPreview() {
  return (
    <div
      className="rounded-lg bg-muted py-4"
      style={{ "--ui-container": "36rem" } as React.CSSProperties}
    >
      <Container className="rounded-md bg-default py-4 text-center text-sm ring ring-accented">
        Held to the measure, and off the edge by the gutter
      </Container>
    </div>
  );
}
