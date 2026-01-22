import React from "react";
import { EventRegisterForm } from "./eventRegister";
import events from "../data/events";

export default function BuildscapeRegister() {
  const event = events.find((e) => e.slug === "buildscape");
  return <EventRegisterForm event={event} />;
}
