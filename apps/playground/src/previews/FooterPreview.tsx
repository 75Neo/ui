import { Footer } from "@75neo/react";

const link = "text-muted hover:text-highlighted text-sm transition-colors";
const label = "text-dimmed font-mono text-[0.6875rem] leading-none";

const links = ["Docs", "Components", "Releases"];

/*
 * The row is written into the DOM as right, centre, left and put back in reading order
 * by the recipe, so narrowing the frame stacks the links above the copyright rather
 * than under it. Drag the pane narrower to watch it happen.
 */
export default function FooterPreview() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className={label} data-identifier>
          three regions
        </p>
        <div className="overflow-hidden rounded-lg ring ring-default">
          <Footer
            left={<span className="text-sm text-muted">© 2026 75NeoUI</span>}
            right={
              <nav className="flex gap-4">
                {links.map((item) => (
                  <a key={item} href="#" className={link}>
                    {item}
                  </a>
                ))}
              </nav>
            }
          >
            <span className="font-semibold text-highlighted">75NeoUI</span>
          </Footer>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className={label} data-identifier>
          with both bands
        </p>
        <div className="overflow-hidden rounded-lg ring ring-default">
          <Footer
            top={
              <div className="bg-muted py-6 text-center text-sm text-muted">
                A full-bleed band, for a newsletter or a grid of columns
              </div>
            }
            bottom={
              <div className="border-t border-muted py-4 text-center text-xs text-dimmed">
                Released under the MIT licence
              </div>
            }
            left={<span className="text-sm text-muted">© 2026 75NeoUI</span>}
            right={
              <nav className="flex gap-4">
                {links.map((item) => (
                  <a key={item} href="#" className={link}>
                    {item}
                  </a>
                ))}
              </nav>
            }
          />
        </div>
      </div>
    </div>
  );
}
