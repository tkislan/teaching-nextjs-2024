import { assertAuth } from "../../../lib/auth";
import { createDB } from "../../../lib/db";
import { EditProfileForm } from "./EditProfileForm";

export default async function EditUserProfile() {
  const userId = assertAuth();

  const db = createDB();

  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", userId)
    .executeTakeFirstOrThrow();

  return (
    <div className="card bg-base-100 w-96 drop-shadow-md">
      <div className="card-body">
        <EditProfileForm
          username={user.username}
          displayName={user.displayName}
        />
      </div>
    </div>
  );
}
