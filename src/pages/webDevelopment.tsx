import React from "react";
import { EventRegisterForm } from "./eventRegister";
import events from "../data/events";

export default function WebDevelopmentRegister() {
  const event = events.find((e) => e.slug === "web-development");
  return <EventRegisterForm event={event} />;
}
