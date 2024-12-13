"use client";
import Test from "../components/Test";
import "@/app/global.css";

import { signup, login, updatePassword } from "@/app/actions/user";

export default function Home() {
  const handleSaveUser = async () => {
    const userName = "John Doe";
    const password = "test123";
    const displayName = "John";

    console.log("Signup:", { userName, password, displayName });

    const response = await signup({ userName, password, displayName });

    if (response.success && response.token) {
      localStorage.setItem("accessToken", response.token);
      console.log("Signup success:", response.token);
    } else {
      console.log("Signup failed:", response.error);
    }
  };

  const handleLogin = async () => {
    const userName = "John Doe";
    const password = "test123";

    console.log("Login:", { userName, password });
    const response = await login({ userName, password });

    if (response.success && response.token) {
      localStorage.setItem("accessToken", response.token);
      console.log("Login success:", response.token);
    } else {
      console.log("Login failed:", response.error);
    }
  };

  const handleUpdatePassword = async () => {
    const oldPassword = "test123";
    const newPassword = "newPassword123";

    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("No token found");
    }

    console.log("Update Password:", { oldPassword, newPassword });
    const result = await updatePassword({ oldPassword, newPassword }, token);
    if (result.success) {
      console.log("Update Password success");
    } else {
      console.log("Update Password failed:", result.error);
    }
  };

  return (
    <div>
      <h1>Sign up</h1>
      <button onClick={handleSaveUser}>Click me</button>
      <h1>Login</h1>
      <button onClick={handleLogin}>Click me</button>
      <h1>Update Password</h1>
      <button onClick={handleUpdatePassword}>Click me</button>
    </div>
  );
}
