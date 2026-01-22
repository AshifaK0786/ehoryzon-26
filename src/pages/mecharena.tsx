import React from "react";
import { EventRegisterForm } from "./eventRegister";
import events from "../data/events";

export default function MecharenaRegister() {
  const event = events.find((e) => e.slug === "mecharena");
  return <EventRegisterForm event={event} />;
}
