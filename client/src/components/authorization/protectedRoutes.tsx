import React from "react";
import Cookies, { Cookie } from "universal-cookie";
import Login from "@/pages/authorization/login";
import { useRouter } from "next/router";

/* eslint-disable  @typescript-eslint/no-explicit-any */
function ProtectedRoutes({ children }: any) {
  const cookie: Cookie = new Cookies();
  const token: string = cookie.get("TOKEN") !== "" ? cookie.get("TOKEN") : "";
  console.log(`token is: ${token}`); //********** */
  const router = useRouter();

  const url: string[] = [
    "/dashboard",
    "/phonebook",
    "/phonebook/details",
    "/phonebook/addOrEdit",
  ];

  if (url.includes(router.route)) {
    if (token) {
      return children;
    } else {
      return (
        <main>
          <Login />
        </main>
      );
    }
  } else {
    return children;
  }
}

export default ProtectedRoutes;
