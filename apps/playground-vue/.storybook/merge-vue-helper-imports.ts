import type { Plugin } from "vite";

const VUE_HELPER_IMPORT = /^import\s*\{([^}]*)\}\s*from\s*["']vue["'];?[ \t]*$/gm;

/**
 * Works around a bug in storybook-vue-addon 0.7.1.
 *
 * The addon compiles each `<Story>` template on its own, then concatenates the
 * `import { … } from "vue"` line every one of them emits, deduplicating those lines by
 * exact string match. Two stories whose helper sets overlap without being identical —
 * which is almost any two — therefore both survive, and the build dies with
 * "Identifier `_openBlock` has already been declared".
 *
 * Merging the statements into a single import is enough to fix it. Deduplicating by the
 * full specifier text is safe because the compiler always emits `name as _name`, so an
 * identical local binding implies identical text.
 *
 * Drop this plugin once the addon merges its own imports.
 */
export function mergeVueHelperImports(): Plugin {
  return {
    name: "75neo:merge-vue-helper-imports",
    transform(code, id) {
      if (!id.includes(".stories.vue")) return null;

      const specifiers = new Set<string>();
      let matched = false;

      const stripped = code.replace(VUE_HELPER_IMPORT, (_line, group: string) => {
        matched = true;
        for (const specifier of group.split(",")) {
          const trimmed = specifier.trim();
          if (trimmed) specifiers.add(trimmed);
        }
        return "";
      });

      if (!matched) return null;

      return `import { ${[...specifiers].join(", ")} } from "vue";\n${stripped}`;
    },
  };
}
