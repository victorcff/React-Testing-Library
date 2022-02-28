import "./App.css";
import Container from "react-bootstrap/Container";
import OrderEntry from "./components/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import { Dispatch, SetStateAction, useState } from "react";
import OrderSummary from "./components/OrderSummary";
import OrderConfirmation from "./components/OrderConfirmation";

interface IComponent {
  setOrderPhase: Dispatch<SetStateAction<string>>;
}
type Component = (arg0: IComponent) => JSX.Element;

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component: Component = OrderEntry;
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  );
}

export default App;
