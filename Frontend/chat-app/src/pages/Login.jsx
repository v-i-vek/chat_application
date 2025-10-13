import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const { loginUser, loading } = useAuthContext();
  const [user, setUser] = useState({});

  function handleLogin(e) {
    e.preventDefault();
    console.log("user", user);
    loginUser(user);
  }
  return (
    <>
      <div className="flex justify-center h-[100%] mt-[150px] items-center ">
        <fieldset className="fieldset bg-base-200 border-base-300 shadow-xl/30 rounded-box w-xs border p-4">
          <div className="text-2xl text-center">welcome back!!</div>
          <form className="flex flex-col" onSubmit={handleLogin}>
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <button
              disabled={loading}
              type="submit"
              className="btn btn-neutral mt-4 bg-gray-900"
            >
              Login
            </button>
            <p
              className="flex justify-center cursor-pointer p-1"
              onClick={() => navigate("/register")}
            >
              Don't have accound ? create Account
            </p>
          </form>
        </fieldset>
      </div>
    </>
  );
};
