"use server";

import { redirect } from "next/navigation";
import { assertAuth } from "../../../lib/auth";
import { createDB } from "../../../lib/db";

export async function createMarketplace(
  name: string,
  description: string,
  price: number,
  category: string,
  photoUrls: string[]
) {
  const userId = assertAuth();

  const db = createDB();

  const newMarketplace = await db
    .insertInto("marketplace")
    .values({
      name,
      description,
      price,
      category,
      userId,
      createdAt: new Date().getTime(),
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  if (photoUrls.length > 0) {
    await db
      .insertInto("marketplacePhotos")
      .values(
        photoUrls.map((photoUrl) => ({
          marketplaceId: newMarketplace.id,
          photoUrl,
          createdAt: new Date().getTime(),
        }))
      )
      .execute();
  }

  redirect(`/marketplace`);
}
