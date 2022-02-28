import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

interface IOrderConfirmation {
  setOrderPhase: Dispatch<SetStateAction<string>>;
}

export default function OrderConfirmation({
  setOrderPhase,
}: IOrderConfirmation) {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        //TODO: handle error here
      });
  }, []);

  function handleClick() {
    resetOrder();
    setOrderPhase("inProgress");
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank You!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>
          as per our terms and conditions, nothing will happen now
        </p>
        <Button onClick={handleClick}>New Order</Button>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
