import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  render(<App />);

  // Options page flow
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  const vanillaInput = screen.getByRole("spinbutton", {
    name: "Vanilla",
  });

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  const hotfudgeCheckbox = screen.getByRole("checkbox", {
    name: "Hot Fudge",
  });

  const orderButton = screen.getByRole("button", {
    name: /order sundae!/i,
  });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "3");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2");

  userEvent.click(hotfudgeCheckbox);
  userEvent.click(cherriesCheckbox);

  userEvent.click(orderButton);

  // Summary page flow
  const summaryHeading = screen.getByRole("heading", {
    name: /order summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", {
    name: "Scoops: $10.00",
  });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $3.00",
  });
  expect(toppingsHeading).toBeInTheDocument();

  // Check summary option items
  const optionItems = screen.getAllByRole("listitem");
  const optionItemsText = optionItems.map((item) => item.textContent);
  expect(optionItemsText).toEqual([
    "3 Chocolate",
    "2 Vanilla",
    "Hot Fudge",
    "Cherries",
  ]);

  // Accept terms and conditions and click button to confirm order
  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  expect(confirmOrderButton).toBeDisabled();

  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(tcCheckbox).not.toBeChecked();
  userEvent.click(tcCheckbox);
  expect(tcCheckbox).toBeChecked();
  expect(confirmOrderButton).toBeEnabled();

  userEvent.click(confirmOrderButton);

  // Confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // Click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /new order/i,
  });
  userEvent.click(newOrderButton);

  // Check that scoops and toppings have been reset
  const scoopsTotal = screen.getByText("Scoops total: $0.00");
  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  expect(toppingsTotal).toBeInTheDocument();

  await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await screen.findByRole("checkbox", {
    name: "Hot Fudge",
  });
});
