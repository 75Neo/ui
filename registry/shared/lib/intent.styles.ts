export const INTENTS = ["primary", "secondary", "success", "info", "warning", "error"] as const;

export type Intent = (typeof INTENTS)[number];

export const intent = {
  primary:
    "[--intent:var(--ui-primary)] [--intent-hover:var(--ui-primary-hover)] [--intent-fg:var(--ui-primary-fg)] [--intent-soft:var(--ui-primary-soft)] [--intent-soft-fg:var(--ui-primary-soft-fg)] [--intent-border:var(--ui-primary-border)]",
  secondary:
    "[--intent:var(--ui-secondary)] [--intent-hover:var(--ui-secondary-hover)] [--intent-fg:var(--ui-secondary-fg)] [--intent-soft:var(--ui-secondary-soft)] [--intent-soft-fg:var(--ui-secondary-soft-fg)] [--intent-border:var(--ui-secondary-border)]",
  success:
    "[--intent:var(--ui-success)] [--intent-hover:var(--ui-success-hover)] [--intent-fg:var(--ui-success-fg)] [--intent-soft:var(--ui-success-soft)] [--intent-soft-fg:var(--ui-success-soft-fg)] [--intent-border:var(--ui-success-border)]",
  info: "[--intent:var(--ui-info)] [--intent-hover:var(--ui-info-hover)] [--intent-fg:var(--ui-info-fg)] [--intent-soft:var(--ui-info-soft)] [--intent-soft-fg:var(--ui-info-soft-fg)] [--intent-border:var(--ui-info-border)]",
  warning:
    "[--intent:var(--ui-warning)] [--intent-hover:var(--ui-warning-hover)] [--intent-fg:var(--ui-warning-fg)] [--intent-soft:var(--ui-warning-soft)] [--intent-soft-fg:var(--ui-warning-soft-fg)] [--intent-border:var(--ui-warning-border)]",
  error:
    "[--intent:var(--ui-error)] [--intent-hover:var(--ui-error-hover)] [--intent-fg:var(--ui-error-fg)] [--intent-soft:var(--ui-error-soft)] [--intent-soft-fg:var(--ui-error-soft-fg)] [--intent-border:var(--ui-error-border)]",
} satisfies Record<Intent, string>;

export const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

export const focusRingInset =
  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus";

export const intentSlot = <S extends string>(slot: S) =>
  Object.fromEntries(INTENTS.map((name) => [name, { [slot]: intent[name] }])) as Record<
    Intent,
    Record<S, string>
  >;
