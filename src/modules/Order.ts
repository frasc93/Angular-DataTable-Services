import { Info } from "./DataProducts";

export interface Order {
    id: number;
    items: Info[];
    totalCost: number;
    date: Date;
  }
  