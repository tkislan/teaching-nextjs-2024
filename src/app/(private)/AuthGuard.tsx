import { assertAuth } from "../../lib/auth";

export function AuthGuard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  assertAuth();

  return children;
}
