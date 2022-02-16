export interface IPricePerItem {
  [optionType: string]: number;
}

export const pricePerItem = {
  scoops: 2,
  toppings: 1.5,
} as IPricePerItem;
