import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

const renderWithContext = (ui: JSX.Element) =>
  render(ui, { wrapper: OrderDetailsProvider });

export * from "@testing-library/react";
export { renderWithContext as render };
