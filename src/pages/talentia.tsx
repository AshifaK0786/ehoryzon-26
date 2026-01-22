import React from "react";
import { EventRegisterForm } from "./eventRegister";
import events from "../data/events";

export default function TalentiaRegister() {
  const event = events.find((e) => e.slug === "talentia");
  return <EventRegisterForm event={event} />;
}
