import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  return (
    <div className="card bg-base-100 w-96 drop-shadow-md">
      <div className="card-body">
        <LoginForm />
      </div>
    </div>
  );
}
