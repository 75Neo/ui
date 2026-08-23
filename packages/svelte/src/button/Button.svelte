<script lang="ts">
  import type { ButtonSlots, ButtonVariants } from "@75neo/styles";
  import { Ark } from "@ark-ui/svelte/factory";
  // Imported per icon rather than from the barrel, which Lucide recommends so Vite's
  // dev server does not have to process the whole set.
  import LoaderCircleIcon from "@lucide/svelte/icons/loader-circle";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { useComponentTheme } from "../theme";
  import type { IconComponent } from "../types";

  // `class` is narrowed to a string because Svelte 5 types it as `ClassValue`, which is
  // wider than what the theme's slot function accepts.
  export type ButtonProps = Omit<HTMLButtonAttributes, "class"> &
    ButtonVariants & {
      /** The button's text. Ignored when `children` is given. */
      label?: string;
      /** Shown on whichever side `leading`/`trailing` selects — leading by default. */
      icon?: IconComponent;
      /** Forces `icon` to the leading side. */
      leading?: boolean;
      /** Shown before the label, whatever `icon` is doing. */
      leadingIcon?: IconComponent;
      /** Forces `icon` to the trailing side. */
      trailing?: boolean;
      /** Shown after the label, whatever `icon` is doing. */
      trailingIcon?: IconComponent;
      /** Replaces whichever icon is showing with a spinner, and disables the button. */
      loading?: boolean;
      /** The spinner. Defaults to Lucide's `loader-circle`. */
      loadingIcon?: IconComponent;
      class?: string;
      /**
       * Per-slot class overrides — `{ label: "font-bold" }`. Merged over the theme and
       * under `class`, which reaches the root element.
       */
      ui?: ButtonSlots;
      children?: Snippet;
    };

  let {
    label,
    icon,
    leading,
    leadingIcon,
    trailing,
    trailingIcon,
    loading,
    loadingIcon = LoaderCircleIcon,
    color,
    variant,
    size,
    block,
    square,
    disabled,
    ui,
    class: className,
    children,
    ...rest
  }: ButtonProps = $props();

  const theme = useComponentTheme("button");

  /*
   * Which side each icon lands on: a bare `icon` leads unless `trailing` says
   * otherwise, `leadingIcon`/`trailingIcon` are absolute, and the spinner takes over
   * whichever side is already occupied.
   */
  const isLeading = $derived(
    Boolean((icon && leading) || (icon && !trailing) || (loading && !trailing) || leadingIcon),
  );
  const isTrailing = $derived(
    Boolean((icon && trailing) || (loading && trailing) || (trailingIcon && trailing !== false)),
  );

  const LeadingIcon = $derived(loading ? loadingIcon : (leadingIcon ?? icon));
  const TrailingIcon = $derived(
    loading && !isLeading ? loadingIcon : (trailingIcon ?? icon),
  );

  const slots = $derived(
    theme()({
      color,
      variant,
      size,
      block,
      loading,
      leading: isLeading,
      trailing: isTrailing,
      // An icon on its own gets equal padding, so the caller does not have to say so.
      square: square ?? (!children && label === undefined),
    }),
  );
</script>

<!--
  Ark's polymorphic element (so `asChild` works) wearing the shared `button` theme.

  A label, an icon on either side, a loading state that replaces whichever icon is
  showing, and `square` inferred when there is nothing but an icon.
-->
<Ark
  as="button"
  class={slots.base({ class: [ui?.base, className] })}
  disabled={disabled ?? loading}
  {...rest}
>
  {#if isLeading && LeadingIcon}
    <LeadingIcon
      class={slots.leadingIcon({ class: ui?.leadingIcon })}
      aria-hidden="true"
      focusable="false"
    />
  {/if}

  {#if children}
    {@render children()}
  {:else if label !== undefined}
    <span class={slots.label({ class: ui?.label })}>{label}</span>
  {/if}

  {#if isTrailing && TrailingIcon}
    <TrailingIcon
      class={slots.trailingIcon({ class: ui?.trailingIcon })}
      aria-hidden="true"
      focusable="false"
    />
  {/if}
</Ark>
