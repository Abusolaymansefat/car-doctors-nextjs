import dbConnect from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import React from "react";

export default async function Services() {
  const serviceCollection = await dbConnect("car-doctor");
  const data = await serviceCollection.find({}).toArray();

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="text-center mb-8">
        <p className="text-[#FF3811] font-semibold">Service</p>
        <h1 className="font-bold text-3xl mt-2">Our Service Area</h1>
        <p className="mt-2 text-gray-600">
          The majority have suffered alteration in some form, by injected <br />
          humour, or randomised words which don't look even slightly believable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item._id.toString()}
            className="border rounded-2xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={item.img}
              width={314}
              height={208}
              alt={item?.title ? `${item.title} image` : "Service image"}
              className="rounded-xl w-full object-cover"
            />
            <h2 className="font-bold text-2xl mt-4">{item.title}</h2>
            <p className="text-[#685c5a] font-semibold mt-2">
              Price: ${item.price}
            </p>

            {/* Link inside card */}
            <Link
              href={`/services/${item._id}`}
              className="text-orange-500 text-xl inline-flex items-center gap-1 mt-2"
            >
              View Details <FaArrowRight />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
