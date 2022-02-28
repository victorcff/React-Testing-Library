import { Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Options from "../Options";

interface IOrderEntry {
  setOrderPhase: Dispatch<SetStateAction<string>>;
}

function OrderEntry({ setOrderPhase }: IOrderEntry) {
  const [orderDetails] = useOrderDetails();
  return (
    <div>
      <h1>Design your sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button onClick={() => setOrderPhase("review")}>Order Sundae!</Button>
    </div>
  );
}

export default OrderEntry;
