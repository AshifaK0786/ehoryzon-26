import React from "react";
import { EventRegisterForm } from "./eventRegister";
import events from "../data/events";

export default function ElectricalOdysseyRegister() {
  const event = events.find((e) => e.slug === "electrical-odyssey");
  return <EventRegisterForm event={event} />;
}
