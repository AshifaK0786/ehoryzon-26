import React from "react";
import { EventRegisterForm } from "./eventRegister";
import events from "../data/events";

export default function ThiraiTriviaRegister() {
  const event = events.find((e) => e.slug === "thirai-trivia");
  return <EventRegisterForm event={event} />;
}
