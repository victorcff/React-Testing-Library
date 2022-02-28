import { DefaultRequestBody, rest } from "msw";

export const handlers = [
  rest.get<DefaultRequestBody>(
    "http://localhost:3030/scoops",
    (req, res, ctx) => {
      return res(
        ctx.json([
          { name: "Chocolate", imagePath: "/images/chocolate.png" },
          { name: "Vanilla", imagePath: "/images/vanilla.png" },
          { name: "Mint chip", imagePath: "/images/mintChip.png" },
          { name: "Salted caramel", imagePath: "/images/saltedCaramel.png" },
        ])
      );
    }
  ),
  rest.get<DefaultRequestBody>(
    "http://localhost:3030/toppings",
    (req, res, ctx) => {
      return res(
        ctx.json([
          { name: "Cherries", imagePath: "/images/cherries.png" },
          { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
          { name: "Hot Fudge", imagePath: "/images/hot-fudge.png" },
        ])
      );
    }
  ),

  rest.post<DefaultRequestBody>(
    "http://localhost:3030/order",
    (req, res, ctx) => {
      return res(ctx.json([{ orderNumber: 123455676 }]));
    }
  ),
];
