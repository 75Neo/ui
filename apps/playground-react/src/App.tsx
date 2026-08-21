import { Button } from "@75neo/react";
import { css } from "@75neo/styles/css";
import { useState } from "react";

const variants = ["solid", "outline", "ghost", "danger"] as const;
const sizes = ["sm", "md", "lg"] as const;

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <main className={css({ display: "grid", gap: "8", maxW: "3xl", mx: "auto", p: "10" })}>
      <header>
        <h1 className={css({ fontSize: "2xl", fontWeight: "bold" })}>75NeoUI · React</h1>
        <p className={css({ color: "fg.muted" })}>
          Edit <code>packages/react/src</code> — this page hot-reloads from source.
        </p>
      </header>

      <section className={css({ display: "flex", gap: "3", flexWrap: "wrap" })}>
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </section>

      <section className={css({ display: "flex", gap: "3", alignItems: "center" })}>
        {sizes.map((size) => (
          <Button key={size} size={size} variant="outline">
            size {size}
          </Button>
        ))}
      </section>

      <Button fullWidth onClick={() => setCount((value) => value + 1)}>
        Clicked {count} times
      </Button>
    </main>
  );
};
