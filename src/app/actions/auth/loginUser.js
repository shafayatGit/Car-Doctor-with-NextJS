"use server";

import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const loginUser = async (payload) => {
  const { email, password } = payload;
  // console.log(email, password);

  const userCollection = dbConnect("user");
  const user = await userCollection.findOne({ email });
  // console.log(user.password)

  if (!user) return null;
  const isPassOk = await bcrypt.compare(user.password, password);
  if (!isPassOk) return null;

  return(user);
};
