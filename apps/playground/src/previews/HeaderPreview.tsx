import { Header } from "@75neo/react";

const label = "text-dimmed font-mono text-[0.6875rem] leading-none";
const link = "text-muted hover:text-highlighted text-sm transition-colors";
const items = ["Docs", "Components", "Themes", "Releases"];

/*
 * The frame is `transform-gpu`, which makes it the containing block for anything
 * `fixed` inside it, and the menu is rendered with `portal={false}` so it stays in the
 * frame rather than covering the playground. In a real page both are the other way
 * round and the menu fills the viewport.
 */
const frame = "relative h-72 transform-gpu overflow-hidden rounded-lg ring ring-default";

function Nav() {
  return (
    <nav className="flex gap-4">
      {items.map((item) => (
        <a key={item} href="#" className={link}>
          {item}
        </a>
      ))}
    </nav>
  );
}

function Body() {
  return (
    <nav className="flex flex-col gap-3">
      {items.map((item) => (
        <a key={item} href="#" className="text-base text-highlighted">
          {item}
        </a>
      ))}
    </nav>
  );
}

export default function HeaderPreview() {
  return (
    <div className="flex flex-col gap-6">
      {(["end", "start"] as const).map((side) => (
        <div key={side} className="flex flex-col gap-2">
          <p className={label} data-identifier>
            toggle at the {side}
          </p>
          <div className={frame}>
            <div className="h-full overflow-y-auto">
              <Header
                title="75NeoUI"
                to="#"
                toggleSide={side}
                portal={false}
                body={<Body />}
                right={<span className={link}>Sign in</span>}
              >
                <Nav />
              </Header>

              <div className="mx-auto flex max-w-page flex-col gap-4 px-5 py-6 sm:px-8 lg:px-12">
                {Array.from({ length: 8 }, (_, at) => (
                  <p key={at} className="text-sm text-muted">
                    The bar is sticky, so scrolling this column leaves it where it is.
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
