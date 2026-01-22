import React from "react";
import { EventRegisterForm } from "./eventRegister";
import events from "../data/events";

export default function IplAuctionRegister() {
  const event = events.find((e) => e.slug === "ipl-auction");
  return <EventRegisterForm event={event} />;
}
