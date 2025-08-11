import BookingForm from "@/Components/BookingForm/BookingForm";
import MyAllBookings from "@/Components/myAllBookings/myAllBookings";
import { headers } from "next/headers";
import React from "react";

export default async function myBookings({ params }) {
  const p = await params;
  const res = await fetch(`http://localhost:3000/api/my-bookings/${p.id}`,{
    headers: await headers()
  });
  const data = await res.json();
  return <BookingForm data={data}></BookingForm>;
}
