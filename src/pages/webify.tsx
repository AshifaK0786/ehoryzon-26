import React from "react";
import { EventRegisterForm } from "./eventRegister";
import events from "../data/events";

export default function WebifyRegister() {
  const event = events.find((e) => e.slug === "webify");
  return <EventRegisterForm event={event} />;
}
