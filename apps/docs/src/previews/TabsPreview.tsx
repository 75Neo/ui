import { CreditCard, KeyRound, User } from "lucide-react";
import { Tabs } from "@75neo/react";

const items = [
  {
    value: "account",
    label: "Account",
    content: "Your name, your handle, and the avatar everyone sees.",
    icon: <User />,
  },
  { value: "password", label: "Password", content: "A new one, twice.", icon: <KeyRound /> },
  {
    value: "billing",
    label: "Billing",
    content: "The card on file and the last twelve invoices.",
    icon: <CreditCard />,
  },
];

export function TabsPreview() {
  return (
    <div className="flex flex-col gap-6">
      <Tabs items={items} defaultValue="account" />
      <Tabs variant="link" color="secondary" items={items} defaultValue="password" />
    </div>
  );
}
