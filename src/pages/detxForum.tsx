import React from "react";
import { EventRegisterForm } from "./eventRegister";
import { interEventList } from "../data/events";

export default function DetxForumRegister() {
  const event = interEventList.find((e) => e.slug === "detx-forum");
  return <EventRegisterForm event={event} />;
}
