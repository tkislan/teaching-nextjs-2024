import { ChangePasswordForm } from "./ChangePasswordForm";

export default async function ChangePassword() {
  return (
    <div className="card bg-base-100 w-128 drop-shadow-md">
      <div className="card-body">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
