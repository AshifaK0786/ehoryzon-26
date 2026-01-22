import React from "react";
import { EventRegisterForm } from "./eventRegister";
import { workshopList } from "../data/events";

export default function StartupLegalEthicalRegister() {
  const event = workshopList.find((e) => e.slug === "startup-legal-ethical");
  return <EventRegisterForm event={event} />;
}
