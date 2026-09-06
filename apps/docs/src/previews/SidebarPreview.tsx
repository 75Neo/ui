import { Sidebar } from "@75neo/react/sidebar";

export function SidebarPreview() {
  return (
    <div className="relative h-56 overflow-hidden rounded-lg ring ring-default ring-inset">
      <Sidebar
        collapsible="none"
        title="75NeoUI"
        description="Components"
        className="h-full [--sidebar-width:12rem]"
      >
        <nav className="flex flex-col gap-1 text-sm text-toned">
          <a href="#button">Button</a>
          <a href="#select">Select</a>
          <a href="#dialog">Dialog</a>
        </nav>
      </Sidebar>
    </div>
  );
}
