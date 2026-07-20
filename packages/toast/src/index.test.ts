import { describe, expect, it } from "vitest";
import * as mod from "./index";

describe("@elz-ui/toast", () => {
  it("exports components", () => {
    expect(mod.ToastProvider).toBeTypeOf("function");
    expect(mod.useToast).toBeTypeOf("function");
    expect(mod.Toaster).toBeTypeOf("function");
    expect(mod.toast).toBeTypeOf("function");
  });

  it("exposes variant helpers on the imperative toast API", () => {
    expect(mod.toast.success).toBeTypeOf("function");
    expect(mod.toast.error).toBeTypeOf("function");
    expect(mod.toast.warn).toBeTypeOf("function");
    expect(mod.toast.info).toBeTypeOf("function");
  });

  it("returns an id from toast helpers", () => {
    const id = mod.toast.success("Saved");
    expect(id).toMatch(/^elz-toast-\d+$/);
  });
});
