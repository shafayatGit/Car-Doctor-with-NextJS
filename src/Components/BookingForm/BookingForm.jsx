"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

export default function BookingForm({data}) {
    const { data: session } = useSession();
    const router = useRouter()
      const handleBookService = async (e) => {
          e.preventDefault();
    toast("Submitting Booking...");

    const form = e.target;
    const date = form.date.value;
    const phone = form.phone.value;
    const address = form.address.value;
    // console.log("updated data", date, phone,address)
    const bookingPayload = {

      // User Inputs
      date,
      phone,
      address,

    };
    const res = await fetch(`https://nextjs-car-doctor-lime.vercel.app/api/my-bookings/${data._id}`,{
        method: "PATCH",
        body: JSON.stringify(bookingPayload)
    })
   router.push("/my-bookings")
    const postedData = await res.json();
    console.log("Updated Data Response",postedData);
  };
  return (
    <div className="my-10">
      <div className="w-11/12 mx-auto">
        <h2 className="mt-10 mb-10 text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-orange-400">
          Book Service : {data?.service_name}
        </h2>
        <form onSubmit={handleBookService}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                defaultValue={session?.user?.name}
                readOnly
                type="text"
                name="name"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                defaultValue={session?.user?.email}
                readOnly
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due amount</span>
              </label>
              <input
                type="text"
                defaultValue={data?.service_price}
                readOnly
                name="price"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input defaultValue={data.date} type="date" name="date" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Your Phone"
                className="input input-bordered"
                defaultValue={data.phone}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Present Address</span>
              </label>
              <input
                type="text"
                name="address"
                placeholder="Your Address"
                className="input input-bordered"
                defaultValue={data.address}
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <input
              className="btn btn-primary btn-block"
              type="submit"
              value="Update Order"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
