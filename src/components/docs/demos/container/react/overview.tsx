import { Container } from "@/components/react";

export default function ContainerOverview() {
  return (
    <div className="w-full rounded-md bg-muted/40 py-6">
      <Container className="rounded-md bg-default py-6 text-center text-sm text-muted ring ring-default">
        Centred, held to the width in <code className="text-default">--ui-container</code>
      </Container>
    </div>
  );
}
