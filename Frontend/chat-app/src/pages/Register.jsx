import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const { registerUser, loading } = useAuthContext();
  const [user, setUser] = useState({});
  function handleRegister(e) {
    e.preventDefault();
    registerUser(user);
  }
  return (
    <>
      <div className="flex justify-center h-[100%] mt-[150px] items-center ">
        <fieldset className="fieldset bg-base-200 border-base-300 shadow-xl/30 rounded-box w-xs border p-4">
          <div className="text-2xl text-center">Create new Account!!</div>
          <form className="flex flex-col" onSubmit={handleRegister}>
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              placeholder="name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
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
              className="btn btn-neutral bg-gray-900 mt-4"
            >
              Register
            </button>
            <p
              className="flex justify-center cursor-pointer p-1"
              onClick={() => navigate("/login")}
            >
              Already have account ? Login
            </p>
          </form>
        </fieldset>
      </div>
    </>
  );
};
