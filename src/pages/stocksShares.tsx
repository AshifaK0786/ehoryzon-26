import React from "react";
import { EventRegisterForm } from "./eventRegister";
import { interEventList } from "../data/events";

export default function StocksSharesRegister() {
  const event = interEventList.find((e) => e.slug === "stocks-shares");
  return <EventRegisterForm event={event} />;
}
