import React from "react";
import { EventRegisterForm } from "./eventRegister";
import events from "../data/events";

export default function MasterchefManiaRegister() {
  const event = events.find((e) => e.slug === "masterchef-mania");
  return <EventRegisterForm event={event} />;
}
