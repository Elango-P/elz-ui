/** @vitest-environment jsdom */
import * as React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./index";

afterEach(() => {
  cleanup();
});

describe("@elz-ui/accordion", () => {
  it("exports components", async () => {
    const mod = await import("./index");
    expect(mod.Accordion).toBeTypeOf("object");
    expect(mod.AccordionItem).toBeTypeOf("object");
    expect(mod.AccordionTrigger).toBeTypeOf("object");
    expect(mod.AccordionContent).toBeTypeOf("object");
  });

  it("opens and closes by independent click by default", () => {
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>What is Elz UI?</AccordionTrigger>
          <AccordionContent>A modular React component library.</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByRole("button", { name: /what is elz ui/i });
    const content = screen.getByText("A modular React component library.");
    const panel = content.closest("[data-slot='accordion-content']");
    const item = content.closest("[data-slot='accordion-item']");

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(panel?.getAttribute("data-state")).toBe("closed");
    expect(item?.getAttribute("data-state")).toBe("closed");

    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(panel?.getAttribute("data-state")).toBe("open");

    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(panel?.getAttribute("data-state")).toBe("closed");
  });

  it("keeps other items open by default when opening another", () => {
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>Default First</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Default Second</AccordionTrigger>
          <AccordionContent>Content B</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const first = screen.getByRole("button", { name: /default first/i });
    const second = screen.getByRole("button", { name: /default second/i });

    fireEvent.click(first);
    fireEvent.click(second);
    expect(first.getAttribute("aria-expanded")).toBe("true");
    expect(second.getAttribute("aria-expanded")).toBe("true");
  });

  it("closes other items when autoclose is true", () => {
    render(
      <Accordion autoclose>
        <AccordionItem value="a">
          <AccordionTrigger>Autoclose First</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Autoclose Second</AccordionTrigger>
          <AccordionContent>Content B</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const first = screen.getByRole("button", { name: /autoclose first/i });
    const second = screen.getByRole("button", { name: /autoclose second/i });

    fireEvent.click(first);
    expect(first.getAttribute("aria-expanded")).toBe("true");
    expect(second.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(second);
    expect(first.getAttribute("aria-expanded")).toBe("false");
    expect(second.getAttribute("aria-expanded")).toBe("true");

    fireEvent.click(second);
    expect(second.getAttribute("aria-expanded")).toBe("false");
  });

  it("closes other items when autoclose is true with type multiple", () => {
    render(
      <Accordion type="multiple" autoclose>
        <AccordionItem value="a">
          <AccordionTrigger>Multi Autoclose First</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Multi Autoclose Second</AccordionTrigger>
          <AccordionContent>Content B</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const first = screen.getByRole("button", { name: /multi autoclose first/i });
    const second = screen.getByRole("button", { name: /multi autoclose second/i });

    fireEvent.click(first);
    fireEvent.click(second);
    expect(first.getAttribute("aria-expanded")).toBe("false");
    expect(second.getAttribute("aria-expanded")).toBe("true");
  });

  it("does not close the open item when autoclose and collapsible={false}", () => {
    render(
      <Accordion autoclose collapsible={false}>
        <AccordionItem value="a">
          <AccordionTrigger>Locked open</AccordionTrigger>
          <AccordionContent>Stay open</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByRole("button", { name: /locked open/i });
    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
  });

  it("applies headerClassName and headerStyle from AccordionItem", () => {
    render(
      <Accordion>
        <AccordionItem
          value="a"
          headerClassName="header-from-item"
          headerStyle={{ backgroundColor: "rgb(26, 107, 92)", color: "rgb(255, 255, 255)" }}
        >
          <AccordionTrigger>Styled header</AccordionTrigger>
          <AccordionContent>Body</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByRole("button", { name: /styled header/i });
    expect(trigger.className).toContain("header-from-item");
    expect(trigger.style.backgroundColor).toBe("rgb(26, 107, 92)");
    expect(trigger.style.color).toBe("rgb(255, 255, 255)");
  });
});
