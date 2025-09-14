import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default async function Services() {
  const serviceCollection = await dbConnect(collectionNameObj.servicesCollection);
  const data = await serviceCollection.find({}).toArray();

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="text-center mb-8">
        <p className="text-[#FF3811] font-semibold">Service</p>
        <h1 className="font-bold text-3xl mt-2">Our Service Area</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div key={item._id.toString()} className="border rounded-xl p-4">
            <Image
              src={item.img}
              alt={item.title}
              width={314}
              height={208}
              className="rounded-lg w-full object-cover"
            />
            <h2 className="font-bold text-2xl mt-4">{item.title}</h2>
            <p className="text-gray-600 mt-2">Price: ${item.price}</p>
            <div className="flex justify-end mt-2">
              <Link href={`/services/${item._id}`} className="text-orange-500 text-xl">
                <FaArrowRight />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
