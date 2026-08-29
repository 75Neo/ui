import preview from "../.storybook/preview";
import { Avatar, Theme } from "@75neo/vue";
import { User } from "@lucide/vue";
import { ref } from "vue";

const meta = preview.meta({
  title: "Avatar",
  component: Avatar,
});

export const Default = meta.story({
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <Avatar src="https://github.com/nstcrystal.png" alt="Alex" fallback="AL" size="md" />
        <Avatar src="https://github.com/2giosangmitom.png" alt="Jamie" name="Jamie Doe" size="md" />
        <Avatar fallback="JD" size="md" />
      </div>
    `,
  }),
});

export const Sizes = meta.story({
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-end gap-4">
        <div class="flex flex-col items-center gap-2">
          <Avatar fallback="XS" size="xs" />
          <span class="text-xs text-muted">xs</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar fallback="SM" size="sm" />
          <span class="text-xs text-muted">sm</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar fallback="MD" size="md" />
          <span class="text-xs text-muted">md</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar fallback="LG" size="lg" />
          <span class="text-xs text-muted">lg</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar fallback="XL" size="xl" />
          <span class="text-xs text-muted">xl</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar fallback="2XL" size="2xl" />
          <span class="text-xs text-muted">2xl</span>
        </div>
      </div>
    `,
  }),
});

export const Shapes = meta.story({
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <div class="flex flex-col items-center gap-2">
          <Avatar fallback="CN" shape="circle" size="lg" />
          <span class="text-xs text-muted">circle</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar fallback="SQ" shape="square" size="lg" />
          <span class="text-xs text-muted">square</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Avatar src="https://github.com/nstcrystal.png" alt="Shape" shape="square" size="lg" />
          <span class="text-xs text-muted">square + image</span>
        </div>
      </div>
    `,
  }),
});

export const Fallbacks = meta.story({
  render: () => ({
    components: { Avatar, User },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <Avatar fallback="PA" size="md" />
          <Avatar name="Ada Lovelace" size="md" />
          <Avatar name="John" size="md" />
          <Avatar size="md">
            <template #fallback><User class="size-5" /></template>
          </Avatar>
        </div>
        <p class="text-xs text-muted">
          Fallback supports initials via <code>fallback</code> or auto-derived from <code>name</code>, and custom fallback slot (e.g. icon).
        </p>
      </div>
    `,
  }),
});

export const WithImage = meta.story({
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <Avatar src="https://github.com/nstcrystal.png" alt="User 1" fallback="U1" size="md" />
        <Avatar src="https://github.com/2giosangmitom.png" alt="User 2" fallback="U2" size="lg" />
        <Avatar src="https://github.com/nstcrystal.png" alt="User 3" fallback="U3" size="xl" />
      </div>
    `,
  }),
});

export const BrokenImage = meta.story({
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-4">
          <Avatar src="https://invalid.example/broken.jpg" alt="Broken" fallback="FB" size="md" />
          <Avatar src="https://invalid.example/broken.jpg" alt="Broken" name="Fallback User" size="md" />
        </div>
        <p class="text-xs text-muted">When image fails to load, fallback is shown via Ark UI.</p>
      </div>
    `,
  }),
});

export const WithStatus = meta.story({
  render: () => ({
    components: { Avatar },
    setup() {
      const status = ref("loading");
      const key = ref(0);
      const onStatusChange = (details: { status: string }) => {
        status.value = details.status;
      };
      const changeSrc = () => {
        key.value += 1;
      };
      return { status, key, onStatusChange, changeSrc };
    },
    template: `
      <div class="flex flex-col gap-3">
        <output class="text-sm">
          Status: <span class="font-mono font-semibold">{{ status }}</span>
        </output>
        <div class="flex items-center gap-4">
          <Avatar :key="key" :src="key % 2 === 0 ? 'https://github.com/nstcrystal.png' : 'https://github.com/2giosangmitom.png'" alt="Status" fallback="ST" size="lg" @status-change="onStatusChange" />
          <button type="button" @click="changeSrc" class="rounded bg-muted px-2 py-1 text-xs hover:bg-accented">Change src</button>
        </div>
      </div>
    `,
  }),
});

export const Composition = meta.story({
  render: () => ({
    components: { Avatar, User },
    template: `
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-4">
          <Avatar size="lg" shape="circle" src="https://github.com/nstcrystal.png" alt="avatar" fallback="PA" />
          <Avatar size="lg" shape="square">
            <template #fallback><User class="size-6" /></template>
          </Avatar>
        </div>
        <p class="text-xs text-muted">Use <code>#fallback</code> slot for custom fallback, or default slot to replace entire content.</p>
        <Avatar size="lg" shape="circle" fallback="CU">
          <template #default>
            <span class="flex size-full items-center justify-center bg-primary text-sm font-bold text-white">CU</span>
            <img src="https://github.com/2giosangmitom.png" alt="custom" class="size-full object-cover" data-slot="image" />
          </template>
        </Avatar>
      </div>
    `,
  }),
});

export const Themed = meta.story({
  render: () => ({
    components: { Avatar, Theme },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <Avatar fallback="TH" size="lg" />
          <Theme :ui="{ avatar: { root: 'ring-2 ring-primary ring-offset-2', fallback: 'bg-primary text-white' } }">
            <Avatar fallback="TH" size="lg" />
          </Theme>
          <Avatar fallback="TH" size="lg" :ui="{ root: 'ring-2 ring-success', fallback: 'bg-success text-white' }" />
        </div>
        <p class="text-xs text-muted">
          Middle: themed via <code>Theme</code> provider, right: per-instance <code>ui</code> prop.
        </p>
      </div>
    `,
  }),
});

export const Group = meta.story({
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex -space-x-2">
          <Avatar fallback="AL" size="md" class="ring-2 ring-white" />
          <Avatar fallback="JD" size="md" class="ring-2 ring-white" />
          <Avatar src="https://github.com/nstcrystal.png" alt="G1" fallback="G1" size="md" class="ring-2 ring-white" />
          <Avatar src="https://github.com/2giosangmitom.png" alt="G2" fallback="G2" size="md" class="ring-2 ring-white" />
          <Avatar fallback="+3" size="md" class="bg-accented ring-2 ring-white" />
        </div>
        <p class="text-xs text-muted">Stack avatars with negative space for group display.</p>
      </div>
    `,
  }),
});

export const Matrix = meta.story({
  render: () => ({
    components: { Avatar },
    setup() {
      const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
      const shapes = ["circle", "square"] as const;
      return { sizes, shapes };
    },
    template: `
      <div class="flex flex-col gap-6">
        <div v-for="shape in shapes" :key="shape" class="flex flex-col gap-2">
          <h3 class="text-sm font-semibold capitalize text-toned">{{ shape }}</h3>
          <div class="flex flex-wrap items-end gap-3">
            <div v-for="size in sizes" :key="shape + '-' + size" class="flex flex-col items-center gap-1">
              <Avatar :fallback="size.toUpperCase()" :size="size" :shape="shape" />
              <span class="text-[10px] text-muted">{{ size }}</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
});
