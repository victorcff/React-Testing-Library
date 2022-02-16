import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "..";
import userEvent from "@testing-library/user-event";

test("initial conditions", () => {
  render(<SummaryForm />);

  const button = screen.getByRole("button", { name: /confirm order/i });
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  expect(button).toBeDisabled();
  expect(checkbox).not.toBeChecked();
});

test("button is enabled or disabled according to checkbox state", () => {
  render(<SummaryForm />);

  const button = screen.getByRole("button", { name: /confirm order/i });
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  userEvent.click(checkbox);
  expect(button).toBeEnabled();

  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);

  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  const termsAndConditions = screen.getByText(/terms and conditions/i);

  expect(nullPopover).not.toBeInTheDocument();

  userEvent.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
