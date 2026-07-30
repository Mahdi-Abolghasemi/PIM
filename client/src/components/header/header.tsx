import React from "react";
import Link from "next/link";
import Cookies, { Cookie } from "universal-cookie";

export default function Header() {
  const cookie: Cookie = new Cookies();
  let token: string = cookie.get("TOKEN") !== "" ? cookie.get("TOKEN") : "";

  async function logout() {
    await cookie.remove("TOKEN", { path: "/" });
    token = "";
  }

  return (
    <div className="bodyHeader">
      <h5>
        <Link href="/" className="mr-4">
          Home
        </Link>
        {!token ? (
          <Link href="/authorization/login">Login</Link>
        ) : (
          <Link href="/" onClick={logout}>
            Logout
          </Link>
        )}
      </h5>
    </div>
  );
}
