import { Footer } from "@75neo/react";

const link = "text-muted hover:text-highlighted text-sm transition-colors";
const items = ["Docs", "Components", "Releases"];

export function FooterPreview() {
  return (
    <div className="overflow-hidden rounded-lg ring ring-default">
      <Footer
        left={<span className="text-sm text-muted">© 2026 75NeoUI</span>}
        right={
          <nav className="flex gap-4">
            {items.map((item) => (
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
  );
}
