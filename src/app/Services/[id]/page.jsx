// import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
// import { ObjectId } from "mongodb";
// import Image from "next/image";

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Image from "next/image";

export default async function ServiceDetailsPage({ params }) {
  const { id } = params;

  // MongoDB collection connect
  const serviceCollection = await dbConnect(collectionNameObj.servicesCollection);

  let service = null;

  try {
    // ObjectId ভ্যালিড হলে _id দিয়ে খোঁজা
    if (ObjectId.isValid(id)) {
      service = await serviceCollection.findOne({ _id: new ObjectId(id) });
    }

    // যদি ObjectId ভ্যালিড না হয় বা ডেটা না পাওয়া যায়, service_id দিয়ে চেষ্টা করা
    if (!service) {
      service = await serviceCollection.findOne({ service_id: id });
    }
  } catch (error) {
    console.error("Error fetching service:", error);
  }

  if (!service) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
        <p>No service matches the provided ID.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{service.title}</h1>

      <Image
        src={service.img}
        alt={service.title}
        width={500}
        height={300}
        className="rounded-lg object-cover"
      />

      <p className="mt-2 font-semibold">Price: ${service.price}</p>
      <p className="mt-2">{service.description || "No description available."}</p>

      {/* Facilities */}
      {service.facility && service.facility.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Facilities</h2>
          <ul className="list-disc list-inside">
            {service.facility.map((fac, idx) => (
              <li key={idx}>
                <strong>{fac.name}:</strong> {fac.details}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
