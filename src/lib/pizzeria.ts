import margherita from "@/assets/margherita.asset.json";
import calabresa from "@/assets/calabresa.asset.json";
import frango from "@/assets/frango.asset.json";
import queijos from "@/assets/queijos.asset.json";
import chocolate from "@/assets/chocolate.asset.json";

export const pizzas = [
  {
    name: "Margherita da Casa",
    description: "Molho de tomate, muçarela, tomate e manjericão.",
    medium: 42,
    large: 56,
    image: margherita.url,
    category: "Clássica",
  },
  {
    name: "Calabresa Especial",
    description: "Calabresa, cebola roxa e azeitonas.",
    medium: 44,
    large: 59,
    image: calabresa.url,
    category: "Clássica",
  },
  {
    name: "Frango Cremoso",
    description: "Frango, requeijão cremoso e milho.",
    medium: 46,
    large: 62,
    image: frango.url,
    category: "Cremosa",
  },
  {
    name: "Quatro Queijos",
    description: "Muçarela, gorgonzola, parmesão e provolone.",
    medium: 49,
    large: 66,
    image: queijos.url,
    category: "Cremosa",
  },
  {
    name: "Chocolate com Morango",
    description: "Chocolate e morangos.",
    medium: 45,
    large: 60,
    image: chocolate.url,
    category: "Doce",
  },
] as const;

export const contact = {
  demonstrationOnly: true,
  externalUrl: null,
  phone: "(21) 00000-0000",
} as const;
export const hours = {
  opening: 18,
  closing: 23,
  days: ["terça", "quarta", "quinta", "sexta", "sábado", "domingo"],
} as const;
export const currency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
