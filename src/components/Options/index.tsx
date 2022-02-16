import axios from "axios";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import AlertBanner from "../AlertBanner";
import ScoopOptions from "../ScoopOptions";
import ToppingOptions from "../ToppingOptions";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";

interface Props {
  optionType: string;
}

interface ItemsProps {
  name: string;
  imagePath: string;
}

function Options({ optionType }: Props) {
  const [items, setItems] = useState<ItemsProps[]>([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((e) => setError(true));
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = (
    optionType === "scoops" ? ScoopOptions : ToppingOptions
  ) as React.ElementType;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName: string, newItemCount: string) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>{orderDetails.totals.get(optionType)}</p>
      <Row>{optionItems}</Row>
    </>
  );
}

export default Options;
