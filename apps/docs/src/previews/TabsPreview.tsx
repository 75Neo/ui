import { Tabs } from "@75neo/react/tabs";

const items = [
  { value: "account", label: "Account", content: "Make changes here." },
  { value: "password", label: "Password", content: "Change it here." },
];

export function TabsPreview() {
  return (
    <div className="max-w-md">
      <Tabs items={items} defaultValue="account" />
    </div>
  );
}
