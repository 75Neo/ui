export type TVClasses = string | ((classes: string) => string);

export type TVSlot<S extends string = string> = Partial<Record<S, TVClasses>>;
