"use client";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

export default function DeleteBookingButton({ id }) {
  // console.log(id)
  const router = useRouter();
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://nextjs-car-doctor-lime.vercel.app/api/service/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          router.refresh();
          console.log(data);

          if (!res.ok) {
            throw new Error("Failed to delete");
          }

          Swal.fire("Deleted!", "Your item has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", "Something went wrong while deleting.", "error");
        }
      }
    });
  };
//   const handleDelete = async (id) => {};
  return (
    <div>
      <>
        <MdDelete
          onClick={() => handleDelete(id)}
          className="h-8 w-8 font-bold"
        />
      </>
    </div>
  );
}
