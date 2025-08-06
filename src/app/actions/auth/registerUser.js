"use server";
import bcrypt from "bcrypt"
import dbConnect from "@/lib/dbConnect";

export const registerUser = async (payload) => {
  const userCollection = dbConnect("user");
  const {email,name,password} = payload;

  const user = await userCollection.findOne({ email: payload.email });
  if (!user) {
    const hashedPass = await bcrypt.hash(password,10);
    payload.password = hashedPass
    const result = await userCollection.insertOne(payload);
    result.insertedId = result.insertedId.toString()
    return result;
  }
  return null;
};
