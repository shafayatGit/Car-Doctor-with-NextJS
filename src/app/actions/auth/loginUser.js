"use server";

import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const loginUser = async (payload) => {
  const { email, password } = payload;

  const userCollection = await dbConnect("user");
  const user = await userCollection.findOne({ email });
  if (!email) return null;
  const isPassOk = await bcrypt.compare(user.password, password);
  if (!isPassOk) return null;
  return user;
};
