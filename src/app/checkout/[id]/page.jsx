import CheckoutForm from "@/Components/CheckoutForm/CheckoutForm";
import React from "react";

export default async function checkoutPage({ params }) {
  const p = await params;
  const res = await fetch(`https://nextjs-car-doctor-lime.vercel.app/api/service/${p.id}`);
  const data = await res.json();
  console.log(data);
  return (
    <div>
      <CheckoutForm data={data}></CheckoutForm>
    </div>
  );
}
