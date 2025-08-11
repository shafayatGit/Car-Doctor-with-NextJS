import BookingForm from "@/Components/BookingForm/BookingForm";
import MyAllBookings from "@/Components/myAllBookings/myAllBookings";
import { headers } from "next/headers";
import React from "react";

export default async function myBookings({ params }) {
  const p = await params;
  const res = await fetch(
    `https://nextjs-car-doctor-lime.vercel.app/api/my-bookings/${p.id}`,
    {
      headers: new Headers(await headers()),
    }
  );
  const data = await res.json();
  return <BookingForm data={data}></BookingForm>;
}
