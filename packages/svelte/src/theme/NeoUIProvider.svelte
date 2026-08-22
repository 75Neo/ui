<script lang="ts">
  import type { ThemeConfig } from "@75neo/styles";
  import type { Snippet } from "svelte";
  import { setNeoUITheme } from "./context";

  export type NeoUIProviderProps = {
    /** Per-component class overrides, merged into the built-in themes. */
    theme?: ThemeConfig;
    children?: Snippet;
  };

  let { theme, children }: NeoUIProviderProps = $props();

  setNeoUITheme(() => theme ?? null);
</script>

<!--
  Applies an app-wide theme to every 75NeoUI component below it. Components work without
  it — the provider is only needed to change their defaults.
-->
{@render children?.()}
