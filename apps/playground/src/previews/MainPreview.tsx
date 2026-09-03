import { Container, Footer, Header, Main } from "@75neo/react";

const label = "text-dimmed font-mono text-[0.6875rem] leading-none";
const frame = "relative h-96 transform-gpu overflow-hidden rounded-lg ring ring-default";

/*
 * What the Main is for, in one picture: two pages with the same chrome, one with a
 * paragraph in it and one with eight. The Footer is at the bottom of the frame in both
 * rather than halfway up the short one, because the Main claims what the Header leaves.
 *
 * The recipe measures that against `dvh`, which is the real viewport and not this
 * frame, so the preview swaps the rule for the flex equivalent at frame scale. Every
 * other class is the recipe's own.
 */
export default function MainPreview() {
  return (
    <div className="grid gap-6 @2xl:grid-cols-2">
      {([1, 8] as const).map((lines) => (
        <div key={lines} className="flex flex-col gap-2">
          <p className={label} data-identifier>
            {lines === 1 ? "short page" : "long page"}
          </p>
          <div className={frame}>
            <div className="flex h-full flex-col overflow-y-auto">
              <Header title="75NeoUI" to="#" />

              <Main ui={{ base: "min-h-0 flex-1" }}>
                <Container className="flex flex-col gap-4 py-6">
                  {Array.from({ length: lines }, (_, at) => (
                    <p key={at} className="text-sm text-muted">
                      The Main is at least the viewport less the Header, so the Footer sits at the
                      bottom whatever is above it.
                    </p>
                  ))}
                </Container>
              </Main>

              <Footer left={<span className="text-sm text-muted">© 2026 75NeoUI</span>} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
