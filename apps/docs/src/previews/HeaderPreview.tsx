import { Header } from "@75neo/react";

const link = "text-muted hover:text-highlighted text-sm transition-colors";
const items = ["Docs", "Components", "Releases"];

/* `transform-gpu` makes the frame the containing block for the menu's own `fixed`. */
const frame = "relative h-64 transform-gpu overflow-hidden rounded-lg ring ring-default";

export function HeaderPreview() {
  return (
    <div className={frame}>
      <div className="h-full overflow-y-auto">
        <Header
          title="75NeoUI"
          to="#"
          portal={false}
          right={<span className={link}>Sign in</span>}
          body={
            <nav className="flex flex-col gap-3">
              {items.map((item) => (
                <a key={item} href="#" className="text-base text-highlighted">
                  {item}
                </a>
              ))}
            </nav>
          }
        >
          <nav className="flex gap-4">
            {items.map((item) => (
              <a key={item} href="#" className={link}>
                {item}
              </a>
            ))}
          </nav>
        </Header>

        <div className="mx-auto flex max-w-page flex-col gap-4 px-5 py-6 sm:px-8 lg:px-12">
          {Array.from({ length: 6 }, (_, at) => (
            <p key={at} className="text-sm text-muted">
              The bar is sticky, so scrolling this column leaves it where it is.
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
