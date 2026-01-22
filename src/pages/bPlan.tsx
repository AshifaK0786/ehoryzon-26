import React from "react";
import { EventRegisterForm } from "./eventRegister";
import { interEventList } from "../data/events";

export default function BPlanRegister() {
  const event = interEventList.find((e) => e.slug === "b-plan");
  return <EventRegisterForm event={event} />;
}
