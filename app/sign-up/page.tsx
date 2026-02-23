"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // default role
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Register gagal");
      }

      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-6">Sign Up</h1>

      <form
        onSubmit={handleRegister}
        className="flex flex-col items-center justify-center w-80"
      >
        {/* NAME */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          required
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mb-4 w-full"
          required
        />

        {/* ROLE
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 border border-gray-300 rounded-md mb-4 w-full"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select> */}

        <a href="/sign-in" className="text-sm text-blue-500 hover:underline mb-4">
          Already have an account?
        </a>

        <button
          type="submit"
          disabled={loading}
          className="p-2 border border-gray-300 rounded-md w-full"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        {error && <p className="text-red-500 mt-3">{error}</p>}
      </form>
    </div>
  );
}