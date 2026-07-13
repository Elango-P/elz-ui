import { describe, expect, it } from "vitest";
import * as mod from "./index";

describe("@elz-ui/tabs", () => {
  it("exports components", () => {
    expect(Object.keys(mod).length).toBeGreaterThan(0);
  });
});
