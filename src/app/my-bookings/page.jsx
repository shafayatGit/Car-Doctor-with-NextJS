import MyAllBookings from "@/Components/myAllBookings/myAllBookings";
import { headers } from "next/headers";
import React from "react";

const fetchMyBookings = async () => {
  const res = await fetch("http://localhost:3000/api/service", {
    headers: new Headers(await headers()),
  });
  const d = await res.json();
  //setData(d);
  return d;
};

export default async function myBookings() {
  const data = await fetchMyBookings();
  return <MyAllBookings data={data}></MyAllBookings>;
}
