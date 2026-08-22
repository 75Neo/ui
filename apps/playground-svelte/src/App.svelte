<script lang="ts">
  import { Button } from "@75neo/svelte";
  import { css } from "@75neo/styles/css";

  const variants = ["solid", "subtle", "outline", "ghost", "link"] as const;
  const sizes = ["sm", "md", "lg"] as const;

  let count = $state(0);
</script>

<main class={css({ display: "grid", gap: "8", maxW: "3xl", mx: "auto", p: "10" })}>
  <header>
    <h1 class={css({ fontSize: "2xl", fontWeight: "bold" })}>75NeoUI · Svelte</h1>
    <p class={css({ color: "fg.muted" })}>
      Edit <code>packages/svelte/src</code> — this page hot-reloads from source.
    </p>
  </header>

  <section class={css({ display: "flex", gap: "3", flexWrap: "wrap" })}>
    {#each variants as variant (variant)}
      <Button {variant}>{variant}</Button>
    {/each}
  </section>

  <section class={css({ display: "flex", gap: "3", alignItems: "center" })}>
    {#each sizes as size (size)}
      <Button {size} variant="outline">size {size}</Button>
    {/each}
  </section>

  <Button fullWidth onclick={() => count++}>Clicked {count} times</Button>
</main>
