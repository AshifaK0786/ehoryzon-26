import React from "react";
import { EventRegisterForm } from "./eventRegister";
import { workshopList } from "../data/events";

export default function RisingCapitalFinanceRegister() {
  const event = workshopList.find((e) => e.slug === "rising-capital-finance");
  return <EventRegisterForm event={event} />;
}
