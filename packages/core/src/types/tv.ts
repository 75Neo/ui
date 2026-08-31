export type TVClasses = string;

export type TVSlot<S extends string> = Partial<Record<S, TVClasses>>;
