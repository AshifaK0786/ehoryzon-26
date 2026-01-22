import React from "react";
import { EventRegisterForm } from "./eventRegister";
import { workshopList } from "../data/events";

export default function IprIpManagementRegister() {
  const event = workshopList.find((e) => e.slug === "ipr-ip-management");
  return <EventRegisterForm event={event} />;
}
