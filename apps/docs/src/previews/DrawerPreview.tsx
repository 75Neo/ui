import { Drawer } from "@75neo/react/drawer";

export function DrawerPreview() {
  return (
    <Drawer
      title="Settings"
      description="Tune the workspace."
      body="Every control lives in the panel, so the page behind stays put."
    >
      <button type="button">Settings</button>
    </Drawer>
  );
}
