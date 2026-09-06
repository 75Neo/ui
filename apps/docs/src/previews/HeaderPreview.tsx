import { Button } from "@75neo/react/button";
import { Header } from "@75neo/react/header";

export function HeaderPreview() {
  return (
    <div className="overflow-hidden rounded-lg ring ring-default ring-inset">
      <Header
        title="75NeoUI"
        href="#"
        className="static"
        end={<Button size="sm">Sign in</Button>}
        menu={<p className="text-sm text-toned">Components · Guides · Docs</p>}
      >
        <nav className="flex gap-3 text-sm text-toned">
          <a href="#components">Components</a>
          <a href="#guides">Guides</a>
        </nav>
      </Header>
    </div>
  );
}
