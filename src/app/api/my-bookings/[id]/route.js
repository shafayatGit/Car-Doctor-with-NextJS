import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const p = await params;

  const bookingCollection = dbConnect("bookings");
  const data = await bookingCollection.findOne({ _id: new ObjectId(p.id) });

  return NextResponse.json(data);
};

export const PATCH = async (req, { params }) => {
  const p = await params;
  const bookingCollection = dbConnect("bookings");
  const query = { _id: new ObjectId(p.id) };

  const body = await req.json();
  const filter = {
    $set: { ...body },
  };
  const option = {
    upsert: true,
  };

  const updateResponse = await bookingCollection.updateOne(
    query,
    filter,
    option
  );
  revalidatePath("/my-bookings")
  return NextResponse.json(updateResponse)
};
