import { type Recipe, variantValues } from "@75neo/core";

/** A compound-variant entry: variant values to match on, plus the classes they add. */
type CompoundVariant = Record<string, string | string[] | unknown>;

/**
 * A recipe that can be invoked, which every `tv()` result can. Kept separate from
 * `Recipe` so the shipped helper stays describable without the call signature.
 */
type CallableRecipe = Recipe & {
  (props?: Record<string, string>): Record<string, () => string>;
  compoundVariants: CompoundVariant[];
};

/** Every combination of the given variant keys, in declaration order. */
function combinations(recipe: Recipe, keys: string[]): Record<string, string>[] {
  let all: Record<string, string>[] = [{}];

  for (const key of keys) {
    const values = variantValues(recipe, key) as string[];
    all = all.flatMap((combo) => values.map((value) => ({ ...combo, [key]: value })));
  }

  return all;
}

function describe(combo: Record<string, string>): string {
  return Object.entries(combo)
    .map(([key, value]) => `${key}=${value}`)
    .join(" ");
}

/** The variant keys a compound entry discriminates on. */
function matchedKeys(entry: CompoundVariant): string[] {
  return Object.keys(entry).filter((key) => key !== "class" && key !== "className");
}

function entryMatches(entry: CompoundVariant, combo: Record<string, string>): boolean {
  return matchedKeys(entry).every((key) => {
    const expected = entry[key];
    return Array.isArray(expected) ? expected.includes(combo[key]) : expected === combo[key];
  });
}

/**
 * Assert a recipe covers every combination of its own variants.
 *
 * Two ways a recipe goes wrong, both invisible until someone looks at the rendered
 * component:
 *
 * - a `compoundVariants` entry is missing, so a combination the recipe claims to
 *   support falls through to the shared classes and renders unstyled;
 * - a `compoundVariants` entry was copy-pasted and its discriminator never changed,
 *   so two combinations resolve identically and one variant renders as another.
 *
 * The first is checked against the compound table: every combination of the keys the
 * table discriminates on must be matched by an entry. The second is checked against
 * the resolved output: no two combinations may produce the same classes.
 *
 * Throws naming the offending combination. Takes no hand-written lists: the recipe
 * describes itself.
 */
export function assertRecipeIsTotal(recipe: CallableRecipe): void {
  const compoundKeys = [...new Set(recipe.compoundVariants.flatMap(matchedKeys))];

  for (const combo of combinations(recipe, compoundKeys)) {
    if (!recipe.compoundVariants.some((entry) => entryMatches(entry, combo))) {
      throw new Error(`no compound variant matches ${describe(combo)}`);
    }
  }

  const slots = Object.keys(recipe.slots);
  const seen = new Map<string, Record<string, string>>();

  for (const combo of combinations(recipe, Object.keys(recipe.variants))) {
    const resolved = recipe(combo);
    const classes: Record<string, string> = {};

    for (const slot of slots) classes[slot] = resolved[slot]();

    const empty = slots.filter((slot) => !classes[slot]?.trim());
    if (empty.length > 0) {
      throw new Error(`recipe resolves an empty ${empty.join(", ")} for ${describe(combo)}`);
    }

    const fingerprint = JSON.stringify(classes);
    const clash = seen.get(fingerprint);

    if (clash) {
      throw new Error(`recipe resolves identically for ${describe(clash)} and ${describe(combo)}`);
    }

    seen.set(fingerprint, combo);
  }
}
