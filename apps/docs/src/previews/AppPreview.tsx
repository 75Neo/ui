import { App, Button, Switch } from "@75neo/react";

const frame = "flex flex-col gap-3 rounded-lg p-4 ring ring-default";

export function AppPreview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {(["en-US", "ar-EG"] as const).map((locale) => (
        <App key={locale} locale={locale} className={frame}>
          <p className="font-mono text-xs text-dimmed">{locale}</p>
          <Switch label="Notifications" defaultChecked />
          <Button>Continue</Button>
        </App>
      ))}
    </div>
  );
}
