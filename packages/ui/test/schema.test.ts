import { describe, expect, it } from "vitest";
import {
  ValidationError,
  configSchema,
  jsonSchemas,
  registryIndexSchema,
  registryItemSchema,
  validate,
} from "../src/schema.js";

const uiFile = {
  path: "registry/react/ui/button/Button.tsx",
  type: "registry:ui",
  content: "export default null;",
};

const button = { name: "button", type: "registry:ui", files: [uiFile] };

describe("registryItemSchema", () => {
  it("accepts a component with a ui file and a lib file", () => {
    const item = validate(registryItemSchema, "button.json", {
      ...button,
      files: [
        uiFile,
        { path: "registry/shared/lib/button.styles.ts", type: "registry:lib", content: "" },
      ],
    });
    expect(item.files).toHaveLength(2);
  });

  it("accepts a theme item that ships only css", () => {
    const theme = validate(registryItemSchema, "theme.json", {
      name: "theme",
      type: "registry:theme",
      css: { "@layer base": { ":root": { "--ui-radius": "0.25rem" } } },
    });
    expect(theme.files).toBeUndefined();
  });

  it("rejects a component with no files", () => {
    expect(() =>
      validate(registryItemSchema, "x.json", { name: "x", type: "registry:ui" }),
    ).toThrow(/only a registry:theme item may ship without files/);
  });

  it("rejects component css, which belongs in the package", () => {
    expect(() =>
      validate(registryItemSchema, "x.json", {
        ...button,
        css: { "@keyframes fade": { from: { opacity: "0" } } },
      }),
    ).toThrow(/component CSS belongs in @75neo\/ui/);
  });

  it("rejects a file outside the registry layout", () => {
    expect(() =>
      validate(registryItemSchema, "x.json", {
        ...button,
        files: [{ ...uiFile, path: "somewhere/else/Button.tsx" }],
      }),
    ).toThrow(/registry\/<framework>\/ui/);
  });

  it("rejects a ui file that is missing its component directory", () => {
    expect(() =>
      validate(registryItemSchema, "x.json", {
        ...button,
        files: [{ ...uiFile, path: "registry/react/ui/Button.tsx" }],
      }),
    ).toThrow(ValidationError);
  });

  it.each([
    ["an unknown type", { name: "x", type: "registry:page", files: [uiFile] }],
    ["an empty name", { name: "", type: "registry:ui", files: [uiFile] }],
    ["dependencies that are not strings", { ...button, dependencies: [1] }],
    ["a file with no content", { ...button, files: [{ path: uiFile.path, type: "registry:ui" }] }],
  ])("rejects %s", (_label, value) => {
    expect(() => validate(registryItemSchema, "x.json", value)).toThrow(ValidationError);
  });

  it("names the offending field in the message", () => {
    try {
      validate(registryItemSchema, "button.json", { ...button, dependencies: [1] });
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect((error as ValidationError).message).toContain("button.json");
      expect((error as ValidationError).message).toContain("dependencies.0");
    }
  });

  it("accepts arbitrarily nested css on a theme item", () => {
    const theme = validate(registryItemSchema, "theme.json", {
      name: "theme",
      type: "registry:theme",
      css: { a: { b: { c: { d: "1px" } } }, "@custom-variant dark (&:where(.dark))": {} },
    });
    expect(theme.css).toBeDefined();
  });
});

describe("registryIndexSchema", () => {
  it("accepts an index", () => {
    const index = validate(registryIndexSchema, "registry.json", {
      name: "75neo",
      homepage: "https://75neo-ui.pages.dev",
      items: [{ name: "button", type: "registry:ui", description: "A button." }],
    });
    expect(index.items[0]?.name).toBe("button");
  });

  it("rejects an index without items", () => {
    expect(() => validate(registryIndexSchema, "registry.json", { name: "75neo" })).toThrow(
      ValidationError,
    );
  });
});

describe("configSchema", () => {
  const config = {
    framework: "react",
    css: "src/styles/global.css",
    registry: "https://75neo-ui.pages.dev/r",
    paths: { ui: "src/components/ui", lib: "src/lib" },
    aliases: { ui: "@/components/ui", lib: "@/lib" },
  };

  it("accepts a complete config", () => {
    expect(validate(configSchema, "75neoui.json", config).framework).toBe("react");
  });

  it("rejects an unknown framework", () => {
    expect(() =>
      validate(configSchema, "75neoui.json", { ...config, framework: "svelte" }),
    ).toThrow(ValidationError);
  });

  it("rejects an empty css path", () => {
    expect(() => validate(configSchema, "75neoui.json", { ...config, css: "" })).toThrow(
      ValidationError,
    );
  });
});

describe("jsonSchemas", () => {
  it("emits a draft schema for the index and the item", () => {
    const schemas = jsonSchemas();
    expect(Object.keys(schemas)).toEqual(["registry.json", "registry-item.json"]);
    for (const schema of Object.values(schemas)) {
      expect(schema).toHaveProperty("$schema");
      expect(schema).toHaveProperty("properties");
    }
  });
});
