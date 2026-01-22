import React from "react";
import { EventRegisterForm } from "./eventRegister";
import events from "../data/events";

export default function GameathonRegister() {
  const event = events.find((e) => e.slug === "gameathon");
  return <EventRegisterForm event={event} />;
}
