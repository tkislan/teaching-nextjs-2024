"use client";

import { logout } from "./logout-action";

export function LogoutButton() {
  return (
    <button
      className="btn btn-sm"
      onClick={() => {
        logout().then(() => {
          window.location.reload();
        });
      }}
    >
      Logout
    </button>
  );
}
