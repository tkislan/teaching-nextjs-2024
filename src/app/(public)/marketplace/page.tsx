import Link from "next/link";
import { createDB } from "../../../lib/db";

export default async function MarketplacePage() {
  const db = createDB();

  const marketplace = await db
    .selectFrom("marketplace")
    .selectAll()
    .orderBy("createdAt desc")
    .execute();

    return (
      <div>
        {marketplace.map((p) => (
          <div key={p.id} className="card bg-base-100 w-96 drop-shadow-md">
            <div className="card-body">
              <p>Name: {p.name}</p>
              <p>Description: {p.description}</p>
              <p>Category: {p.category}</p>
              <p>Price: {p.price}</p>
              <p>Created At: {new Date(p.createdAt).toString()}</p>
              <Link href={`/user/${p.userId}`}>
                {p.userId}
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
}
