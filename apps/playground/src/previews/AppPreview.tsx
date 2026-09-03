import { ArrowRight } from "lucide-react";
import { App, Button, Switch } from "@75neo/react";

const frame = "flex flex-col gap-3 rounded-lg p-4 ring ring-default";
const label = "text-dimmed font-mono text-[0.6875rem] leading-none";

/*
 * Two Apps, one per direction. The `rtl:` utilities inside every recipe read the `dir`
 * attribute the App writes, so the right-hand pair is the same markup mirrored with no
 * component knowing anything about it.
 */
export default function AppPreview() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 @md:grid-cols-2">
        {(["en-US", "ar-EG"] as const).map((locale) => (
          <App key={locale} locale={locale} className={frame}>
            <p className={label} data-identifier>
              {locale}
            </p>
            <Switch label="Notifications" defaultChecked />
            <Button trailingIcon={<ArrowRight />}>Continue</Button>
          </App>
        ))}
      </div>

      <hr className="border-muted" />

      {/* The theme an App publishes reaches everything below it, itself included. */}
      <App
        theme={{
          app: { ui: { base: `${frame} bg-muted` } },
          button: { ui: { base: "rounded-full" } },
        }}
      >
        <p className={label} data-identifier>
          themed
        </p>
        <Button>Rounded by the App above it</Button>
      </App>
    </div>
  );
}
