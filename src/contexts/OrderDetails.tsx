/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { pricePerItem } from "../constants";
import { formatCurrency } from "../utils";

type Totals = {
  scoops: number;
  toppings: number;
  grandTotal: number;
};

type UpdateItemCount = (
  itemName: string,
  newItemCount: string,
  optionType: string
) => void;

type ResetOrder = () => void;

type ContextValue = [
  {
    scoops: Map<string, number>;
    toppings: Map<string, number>;
    totals: Totals;
  },
  UpdateItemCount,
  ResetOrder
];

interface IOptionCounts {
  [index: string]: Map<string, number>;
}

const OrderDetails = createContext<ContextValue | null>(null);

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

  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
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

    function resetOrder() {
      setOptionCounts({
        scoops: new Map<string, number>(),
        toppings: new Map<string, number>(),
      });
    }

    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}

export { OrderDetailsProvider, useOrderDetails };
