import React, { useState } from "react";
import { authLogin_type } from "@/types/authorization/auth_type";
import { Auth_service } from "@/services/authorization/auth_service";
import { useRouter } from "next/router";

export default function Login() {
  const objAuth: Auth_service = new Auth_service();
  const [loginData, setLoginData] = useState<authLogin_type>({
    userName: "",
    password: "",
  });
  const [error, setError] = useState({
    message: "",
    show: false,
  });
  const [fieldValidations, setFieldValidations] = useState({
    userName: true,
    password: true,
  });

  const router = useRouter();

  const changeData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    switch (e.target.name) {
      case "userName":
        setLoginData({ ...loginData, userName: e.target.value });
        break;
      case "password":
        setLoginData({ ...loginData, password: e.target.value });
        break;
    }
  };

  const login = async () => {
    let error: number = 0;
    const _fieldValidations = {
      userName: true,
      password: true,
    };

    if (loginData.userName === "") {
      _fieldValidations.userName = false;
      error++;
    }

    if (loginData.password === "") {
      _fieldValidations.password = false;
      error++;
    }

    setFieldValidations(_fieldValidations);

    if (error === 0) {
      let success: boolean = false;
      await objAuth.Login(loginData).then((res) => (success = res));

      if (success) {
        setError({ message: "", show: false });
        router.push("/dashboard");
      } else {
        setError({
          message: "User name or password is not correct.",
          show: true,
        });
      }
    }
  };

  return (
    <div className="bodyAutentication">
      <div className="formAutentication">
        <div className="formAutentication_h2">
          <h2 className="text-center">Login</h2>
        </div>
        <form>
          <div className="mb-4">
            <input
              className={`mt-2 shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                fieldValidations.userName
                  ? "border border-gray-400 text-gray-700"
                  : "border-2 border-red-500 text-red-500"
              }`}
              type="text"
              name="userName"
              aria-label="UserName"
              placeholder="Enter UserName"
              onChange={changeData}
            />
            <p
              className="text-red-500 italic py-2 px-3 text-sm"
              style={{
                display: fieldValidations.userName ? "none" : "inline",
              }}
            >
              Please fill out this field.
            </p>
          </div>
          <div className="mb-4">
            <input
              className={`mt-2 shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                fieldValidations.password
                  ? "border border-gray-400 text-gray-700"
                  : "border-2 border-red-500 text-red-500"
              }`}
              type="password"
              name="password"
              aria-label="Password"
              placeholder="Enter Password"
              onChange={changeData}
            />
            <p
              className="text-red-500 italic py-2 px-3 text-sm"
              style={{
                display: fieldValidations.password ? "none" : "inline",
              }}
            >
              Please fill out this field.
            </p>
          </div>
        </form>
        <div className="mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-2 rounded"
            aria-label="Log in"
            onClick={login}
          >
            Log In
          </button>
        </div>
        <div
          style={{
            display: error.show ? "inline" : "none",
          }}
        >
          <p className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-2 rounded">
            {error.message}
          </p>
        </div>
      </div>
    </div>
  );
}
