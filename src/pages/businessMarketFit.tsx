import React from "react";
import { EventRegisterForm } from "./eventRegister";
import { workshopList } from "../data/events";

export default function BusinessMarketFitRegister() {
  const event = workshopList.find((e) => e.slug === "business-market-fit");
  return <EventRegisterForm event={event} />;
}
