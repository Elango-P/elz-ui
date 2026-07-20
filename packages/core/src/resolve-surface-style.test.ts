import { describe, expect, it } from "vitest";
import { resolveSurfaceStyle } from "./resolve-surface-style";

describe("resolveSurfaceStyle", () => {
  it("returns consumer style only when className is set", () => {
    expect(
      resolveSurfaceStyle("p-4 bg-white", { color: "red" }, { padding: "1.5rem" }),
    ).toEqual({ color: "red" });
  });

  it("merges defaults with style when className is absent", () => {
    expect(
      resolveSurfaceStyle(undefined, { color: "red" }, { padding: "1.5rem", color: "blue" }),
    ).toEqual({ padding: "1.5rem", color: "red" });
  });

  it("treats empty className as absent", () => {
    expect(resolveSurfaceStyle("  ", { color: "red" }, { padding: "1rem" })).toEqual({
      padding: "1rem",
      color: "red",
    });
  });
});
