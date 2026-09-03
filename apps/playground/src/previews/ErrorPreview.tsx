import { TriangleAlert } from "lucide-react";
import { error, variantValues } from "@75neo/themes";
import { Button, Error } from "@75neo/react";

const colors = variantValues(error, "color");
const label = "text-dimmed font-mono text-[0.6875rem] leading-none";
const frame = "overflow-hidden rounded-lg ring ring-default";

/*
 * The page fills the viewport less a Header, which a frame this size cannot show, so
 * each specimen is capped and the rest is the recipe's own.
 */
const short = { base: "min-h-56 py-8" };

export default function ErrorPreview() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className={label} data-identifier>
          the whole page
        </p>
        <div className={frame}>
          <Error
            ui={short}
            icon={<TriangleAlert />}
            statusCode={404}
            statusMessage="Page not found"
            message="Nothing answers at that address. It may have moved, or never existed."
          >
            <Button>Back to home</Button>
            <Button variant="outline" color="neutral">
              Search the docs
            </Button>
          </Error>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className={label} data-identifier>
          status only
        </p>
        <div className={frame}>
          <Error ui={short} statusCode={500} statusMessage="Something went wrong" />
        </div>
      </div>

      <hr className="border-muted" />

      <div className="grid gap-4 @2xl:grid-cols-2">
        {colors.map((color) => (
          <div key={color} className="flex flex-col gap-2">
            <p className={label} data-identifier>
              {color}
            </p>
            <div className={frame}>
              <Error
                ui={{ base: "min-h-40 py-6" }}
                color={color}
                icon={<TriangleAlert />}
                statusCode={503}
                statusMessage="Down for maintenance"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
