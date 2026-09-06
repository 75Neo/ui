import { Footer } from "@75neo/react/footer";

export default function FooterPreview() {
  return (
    <div className="overflow-hidden rounded-lg ring ring-default ring-inset">
      <Footer
        start={<span>© 2026 75Neo</span>}
        center={
          <nav className="flex gap-3 text-sm text-toned">
            <a href="#docs">Docs</a>
            <a href="#github">GitHub</a>
          </nav>
        }
        end={<span className="text-sm text-muted">MIT</span>}
      />
    </div>
  );
}
