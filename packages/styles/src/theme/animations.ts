import { defineKeyframes, defineTokens } from "@pandacss/dev";

/**
 * Motion primitives. These are deliberately generic rather than per-component: a dialog,
 * a popover and a toast all want "fade plus scale", so they compose the same two.
 *
 * `collapse-in`/`collapse-out` read `--height`, which Ark UI sets on collapsible content
 * (accordion, collapsible) once it has measured the panel.
 */
export const keyframes = defineKeyframes({
  "fade-in": {
    from: { opacity: "0" },
    to: { opacity: "1" },
  },
  "fade-out": {
    from: { opacity: "1" },
    to: { opacity: "0" },
  },
  "scale-in": {
    from: { opacity: "0", transform: "scale(0.95)" },
    to: { opacity: "1", transform: "scale(1)" },
  },
  "scale-out": {
    from: { opacity: "1", transform: "scale(1)" },
    to: { opacity: "0", transform: "scale(0.95)" },
  },
  "slide-in-top": {
    from: { opacity: "0", transform: "translateY(-0.5rem)" },
    to: { opacity: "1", transform: "translateY(0)" },
  },
  "slide-in-bottom": {
    from: { opacity: "0", transform: "translateY(0.5rem)" },
    to: { opacity: "1", transform: "translateY(0)" },
  },
  "slide-in-left": {
    from: { opacity: "0", transform: "translateX(-0.5rem)" },
    to: { opacity: "1", transform: "translateX(0)" },
  },
  "slide-in-right": {
    from: { opacity: "0", transform: "translateX(0.5rem)" },
    to: { opacity: "1", transform: "translateX(0)" },
  },
  "collapse-in": {
    from: { height: "0", opacity: "0" },
    to: { height: "var(--height)", opacity: "1" },
  },
  "collapse-out": {
    from: { height: "var(--height)", opacity: "1" },
    to: { height: "0", opacity: "0" },
  },
  spin: {
    to: { transform: "rotate(360deg)" },
  },
});

/**
 * Ready-made shorthands pairing each keyframe with the duration and curve it should use.
 *
 * Entrances get `emphasized` (a hard decelerate — the element arrives and settles);
 * exits get `accelerate` and a shorter duration, because a user dismissing something
 * has already moved on.
 */
export const animations = defineTokens.animations({
  "fade-in": { value: "fade-in {durations.normal} {easings.emphasized}" },
  "fade-out": { value: "fade-out {durations.fast} {easings.accelerate}" },
  "scale-in": { value: "scale-in {durations.normal} {easings.emphasized}" },
  "scale-out": { value: "scale-out {durations.fast} {easings.accelerate}" },
  "slide-in-top": { value: "slide-in-top {durations.normal} {easings.emphasized}" },
  "slide-in-bottom": { value: "slide-in-bottom {durations.normal} {easings.emphasized}" },
  "slide-in-left": { value: "slide-in-left {durations.normal} {easings.emphasized}" },
  "slide-in-right": { value: "slide-in-right {durations.normal} {easings.emphasized}" },
  "collapse-in": { value: "collapse-in {durations.fast} {easings.default}" },
  "collapse-out": { value: "collapse-out {durations.fast} {easings.default}" },
  spin: { value: "spin 1s linear infinite" },
});
