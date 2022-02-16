/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { pricePerItem } from "../constants";

interface IOptionCounts {
  [index: string]: Map<string, number>;
}

const OrderDetails = createContext<IOptionCounts[]>([]);

function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error("useOrderDetails must be used within OrderDetailsProvider");
  }

  return context;
}

function calculateSubtotal(optionType: string, optionCounts: IOptionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[optionType];
}

function OrderDetailsProvider(props: any) {
  const [optionCounts, setOptionCounts] = useState<IOptionCounts>({
    scoops: new Map<string, number>(),
    toppings: new Map<string, number>(),
  });

  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingsSubtotal,
      grandTotal,
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(
      itemName: string,
      newItemCount: string,
      optionType: string
    ) {
      const newOptionCounts = { ...optionCounts };

      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    }

    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}

export { OrderDetailsProvider, useOrderDetails };
