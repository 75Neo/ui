import preview from "../.storybook/preview";
import { AngleSlider } from "@75neo/vue";
import { ref } from "vue";

const meta = preview.meta({
  title: "AngleSlider",
  component: AngleSlider,
});

export const Default = meta.story({
  render: () => ({
    components: { AngleSlider },
    template: `
      <div class="flex flex-col items-center gap-8 py-8">
        <AngleSlider label="Rotation" :default-value="45" />
      </div>
    `,
  }),
});

export const Controlled = meta.story({
  render: () => ({
    components: { AngleSlider },
    setup() {
      const value = ref(90);
      const increment = () => {
        value.value = (value.value + 45) % 360;
      };
      const reset = () => {
        value.value = 0;
      };
      return { value, increment, reset };
    },
    template: `
      <div class="flex flex-col items-center gap-4 py-8">
        <AngleSlider label="Rotation" v-model="value" />
        <div class="text-sm text-muted">
          Value: <span class="font-mono font-semibold text-default">{{ value }}°</span>
          <button type="button" @click="increment" class="ml-3 rounded bg-muted px-2 py-1 text-xs hover:bg-accented">+45°</button>
          <button type="button" @click="reset" class="ml-1 rounded bg-muted px-2 py-1 text-xs hover:bg-accented">Reset</button>
        </div>
      </div>
    `,
  }),
});

export const Sizes = meta.story({
  render: () => ({
    components: { AngleSlider },
    template: `
      <div class="flex items-end gap-8 py-8">
        <div class="flex flex-col items-center gap-2">
          <AngleSlider size="sm" label="Small" :default-value="30" />
          <span class="text-xs text-muted">sm — 80px</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <AngleSlider size="md" label="Medium" :default-value="30" />
          <span class="text-xs text-muted">md — 100px</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <AngleSlider size="lg" label="Large" :default-value="30" />
          <span class="text-xs text-muted">lg — 140px</span>
        </div>
      </div>
    `,
  }),
});

export const Steps = meta.story({
  render: () => ({
    components: { AngleSlider },
    template: `
      <div class="flex flex-col items-center gap-8 py-8">
        <div class="flex flex-wrap items-end justify-center gap-8">
          <div class="flex flex-col items-center gap-2">
            <AngleSlider label="Step 1°" :step="1" :default-value="33" />
            <span class="text-xs text-muted">step=1</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <AngleSlider label="Step 15°" :step="15" :default-value="30" />
            <span class="text-xs text-muted">step=15</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <AngleSlider label="Step 45°" :step="45" :default-value="90" />
            <span class="text-xs text-muted">step=45</span>
          </div>
        </div>
        <p class="text-xs text-muted">Try dragging — thumb snaps to step increments.</p>
      </div>
    `,
  }),
});

export const Disabled = meta.story({
  render: () => ({
    components: { AngleSlider },
    template: `
      <div class="flex items-center gap-8 py-8">
        <AngleSlider label="Disabled" :default-value="120" disabled />
        <AngleSlider label="Active" :default-value="120" />
      </div>
    `,
  }),
});

export const ReadOnly = meta.story({
  render: () => ({
    components: { AngleSlider },
    template: `
      <div class="flex items-center gap-8 py-8">
        <AngleSlider label="Read only" :default-value="200" read-only />
        <span class="text-sm text-muted">Value is fixed — dragging is blocked</span>
      </div>
    `,
  }),
});

export const WithoutMarkers = meta.story({
  render: () => ({
    components: { AngleSlider },
    setup() {
      const dense = Array.from({ length: 12 }, (_, i) => i * 30);
      return { dense };
    },
    template: `
      <div class="flex items-center gap-8 py-8">
        <AngleSlider label="No markers" :default-value="75" :markers="[]" />
        <AngleSlider label="Custom markers" :default-value="90" :markers="[0,90,180,270]" />
        <AngleSlider label="Dense markers" :default-value="45" :markers="dense" />
      </div>
    `,
  }),
});

export const WithoutValueText = meta.story({
  render: () => ({
    components: { AngleSlider },
    template: `
      <div class="flex items-center gap-8 py-8">
        <AngleSlider label="With value" :default-value="60" :show-value-text="true" />
        <AngleSlider label="Hidden value" :default-value="60" :show-value-text="false" />
      </div>
    `,
  }),
});

export const Invalid = meta.story({
  render: () => ({
    components: { AngleSlider },
    template: `
      <div class="flex flex-col items-center gap-4 py-8">
        <AngleSlider label="Invalid" :default-value="10" invalid />
        <span class="text-xs text-error">Use \`invalid\` to indicate validation error</span>
      </div>
    `,
  }),
});

const onSubmit = (e: Event) => {
  const form = e.target as HTMLFormElement;
  const data = new FormData(form);
  alert(`Submitted value: ${data.get("angle") ?? "(empty)"}`);
};

export const WithForm = meta.story({
  render: () => ({
    components: { AngleSlider },
    setup() {
      return { onSubmit };
    },
    template: `
      <form class="flex flex-col items-center gap-4 py-8" @submit.prevent="onSubmit">
        <AngleSlider label="Angle (form)" name="angle" :default-value="45" />
        <button type="submit" class="rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-white hover:bg-primary/90">Submit</button>
        <span class="text-xs text-muted">Hidden input \`name="angle"\` is submitted with the form</span>
      </form>
    `,
  }),
});

export const Composition = meta.story({
  render: () => ({
    components: { AngleSlider },
    setup() {
      // For fully custom composition, import primitives from @ark-ui/vue/angle-slider
      // and style with `angleSlider` from @75neo/styles + useComponentUI.
      // Here we demo slot override + ui prop for quick customization.
      const customUi = { label: "text-xs uppercase tracking-widest text-muted" };
      return { customUi };
    },
    template: `
      <div class="flex flex-col items-center gap-4 py-8">
        <AngleSlider label="Composition via ui prop" :default-value="135" size="lg" :ui="customUi" />
        <span class="text-xs text-muted">Override any slot with <code>ui</code> prop or provide custom children via default slot</span>
        <AngleSlider :default-value="90" size="md">
          <template #default>
            <div class="flex flex-col items-center gap-2">
              <span class="text-xs font-semibold uppercase tracking-widest text-primary">Custom Slot</span>
              <AngleSlider label="Inner" :default-value="90" :markers="[0,90,180,270]" />
            </div>
          </template>
        </AngleSlider>
      </div>
    `,
  }),
});

export const Playground = meta.story({
  render: () => ({
    components: { AngleSlider },
    setup() {
      const value = ref(45);
      const step = ref(1);
      const size = ref<"sm" | "md" | "lg">("md");
      const disabled = ref(false);
      return { value, step, size, disabled };
    },
    template: `
      <div class="mx-auto flex max-w-md flex-col items-center gap-6 py-8">
        <AngleSlider label="Playground" v-model="value" :step="step" :size="size" :disabled="disabled" />
        <div class="w-full space-y-3 rounded-lg border border-default p-4">
          <div class="flex items-center justify-between gap-4">
            <label class="text-sm font-medium">Value: {{ value }}°</label>
            <input type="range" :min="0" :max="360" v-model.number="value" class="accent-primary flex-1" />
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <label class="text-sm">Step</label>
            <select v-model.number="step" class="rounded border border-default bg-default px-2 py-1 text-sm">
              <option :value="1">1</option>
              <option :value="5">5</option>
              <option :value="15">15</option>
              <option :value="45">45</option>
            </select>
            <label class="ml-4 text-sm">Size</label>
            <select v-model="size" class="rounded border border-default bg-default px-2 py-1 text-sm">
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
            </select>
            <label class="ml-auto flex items-center gap-1.5 text-sm">
              <input type="checkbox" v-model="disabled" />
              Disabled
            </label>
          </div>
        </div>
      </div>
    `,
  }),
});
