import CheckoutForm from "@/Components/CheckoutForm/CheckoutForm";
import React from "react";

export default async function checkoutPage({ params }) {
  const p = await params;
  const res = await fetch(`http://localhost:3000/api/service/${p.id}`);
  const data = await res.json();
  console.log(data);
  return (
    <div>
      <CheckoutForm></CheckoutForm>
    </div>
  );
}
