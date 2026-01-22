import React from "react";
import { EventRegisterForm } from "./eventRegister";
import { workshopList } from "../data/events";

export default function ProductMarketFitRegister() {
  const event = workshopList.find((e) => e.slug === "product-market-fit");
  return <EventRegisterForm event={event} />;
}
