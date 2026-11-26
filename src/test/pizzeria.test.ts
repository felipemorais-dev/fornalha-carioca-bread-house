import { describe, expect, it } from "vitest";
import { contact, hours, pizzas } from "@/lib/pizzeria";

describe("Demonstration rules", () => {
  it.each([
    ["Margherita da Casa", 42, 56],
    ["Calabresa Especial", 44, 59],
    ["Frango Cremoso", 46, 62],
    ["Quatro Queijos", 49, 66],
    ["Chocolate com Morango", 45, 60],
  ])("%s retains the supplied fictitious prices", (name, medium, large) => {
    const pizza = pizzas.find((item) => item.name === name);
    expect(pizza?.medium).toBe(medium);
    expect(pizza?.large).toBe(large);
  });
  it("cannot open an external WhatsApp conversation", () => {
    expect(contact.demonstrationOnly).toBe(true);
    expect(contact.externalUrl).toBeNull();
    expect(contact.phone).toBe("(21) 00000-0000");
  });
  it("uses the supplied demonstration opening hours", () => {
    expect(hours.opening).toBe(18);
    expect(hours.closing).toBe(23);
    expect(hours.days).toEqual(["terça", "quarta", "quinta", "sexta", "sábado", "domingo"]);
  });
});
