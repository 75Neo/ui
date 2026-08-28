import { describe, it, expect } from "vitest";
import { defineComponent, h, computed } from "vue";
import { mount } from "@vue/test-utils";
import { provideThemeContext, injectThemeContext } from "../useTheme";

describe("provideThemeContext deep merge via defu", () => {
  it("deep merges child over parent without discarding sibling slots", async () => {
    const TestComp = defineComponent({
      setup() {
        const ctx = injectThemeContext();
        return () => h("div", String(JSON.stringify(ctx.ui.value)));
      },
    });

    const Outer = defineComponent({
      setup() {
        provideThemeContext(computed(() => ({ button: { base: "p-base", label: "p-label" } })));
        return () => h(Inner);
      },
    });
    const Inner = defineComponent({
      setup() {
        provideThemeContext(computed(() => ({ button: { base: "c-base" } })));
        return () => h(TestComp);
      },
    });

    const w = mount(Outer);
    expect(w.text()).toContain("c-base");
    expect(w.text()).toContain("p-label");
    expect(w.text()).not.toContain("p-base");
  });

  it("reactively updates when ui prop changes", async () => {
    const ui = computed(() => ({ button: { base: "initial" } }));
    const Comp = defineComponent({
      setup() {
        const ctx = provideThemeContext(ui);
        return () => h("div", JSON.stringify(ctx.ui.value));
      },
    });

    const Parent = defineComponent({
      setup() {
        return () => h(Comp);
      },
    });

    const wrapper = mount(Parent);
    expect(wrapper.text()).toContain("initial");
  });
});
