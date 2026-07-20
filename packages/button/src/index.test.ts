import { describe, expect, it } from "vitest";
import * as mod from "./index";

describe("@elz-ui/button", () => {
  it("exports Button and buttonVariants", () => {
    expect(mod.Button).toBeTypeOf("object");
    expect(mod.buttonVariants).toBeTypeOf("function");
  });
});
