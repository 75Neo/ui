export type SlotClass = string | ((classes: string) => string);

export type ComponentUI = Record<string, SlotClass>;

export type ThemeUI = {
  [component: string]: ComponentUI | undefined;
};
