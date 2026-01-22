import React from "react";
import { EventRegisterForm } from "./eventRegister";
import { intraeventList } from "../data/events";

export default function EthicalHackerRegister() {
  const event = intraeventList.find((e) => e.slug === "ethical-hacker");
  return <EventRegisterForm event={event} />;
}
