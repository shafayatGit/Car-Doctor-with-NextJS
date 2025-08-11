import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  const p = await params;
  const bookingCollection = dbConnect("bookings");
  const data = await bookingCollection.findOne({ _id: new ObjectId(p.id) });
  const singleBooking =await bookingCollection.findOne({ _id: new ObjectId(p.id) });

  const MatchEmail = email == singleBooking.email;
  if (MatchEmail) {
    return NextResponse.json(data);
  }
  return NextResponse.json({ success: false, message: "Forbidden Access" });
};

export const PATCH = async (req, { params }) => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  const p = await params;
  const bookingCollection = dbConnect("bookings");
  const query = { _id: new ObjectId(p.id) };
  const currentBooking = await bookingCollection.findOne(query);

  const MatchEmail = email == currentBooking.email;

  if (MatchEmail) {
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
    revalidatePath("/my-bookings");
    return NextResponse.json(updateResponse);
  }
  return NextResponse.json({ success: false, massage: "Forbidden access!" });
};
