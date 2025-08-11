import dbConnect from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

export default async function ServicesSection() {
  const servicesCollection = dbConnect("services");
  const data = await servicesCollection.find({}).toArray();

  //   console.log(data);
  return (
    <div>
      <h2 className="mt-10 text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-orange-400">
        Our Premium Services
      </h2>
      <p className="mt-4 text-center mb-10 text-lg text-gray-600 leading-relaxed">
        We provide top-notch solutions tailored to your needs, ensuring quality,
        reliability, and innovation in every project we deliver. Your
        satisfaction is our priority.
      </p>
      <div className="mb-32 grid grid-cols-12 gap-4 container mx-auto">
        {data.map((item) => {
          return (
            <div
              className="col-span-12 md:col-span-6 lg:col-span-4 p-4 h-full border"
              key={item._id}
            >
              <figure className="w-full h-3/4 flex justify-center items-center">
                <Image
                  className="w-full h-full object-fit"
                  src={item.img}
                  width={314}
                  height={108}
                  alt={item.title}
                />
              </figure>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <h2 className="font-bold text-xl">{item.title}</h2>
                  <p className="font-bold text-xl text-orange-500">
                    Price : ${item.price}
                  </p>
                </div>
                <div>
                  <Link
                    href={`/services/${item._id}`}
                    className="text-orange-500"
                  >
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
