import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    let users = [];
    try {
      const stored = JSON.parse(localStorage.getItem("users"));
      if (Array.isArray(stored)) {
        users = stored;
      } else {
        console.warn("Users data in localStorage is not an array. Resetting...");
        localStorage.removeItem("users");
      }
    } catch (err) {
      console.error("Error reading users from localStorage:", err);
      localStorage.removeItem("users");
    }

    const user = users.find((user) => user.email === email);

    if (!user) {
      alert("User not found. Please register first.");
      return;
    }

    if (user.password !== password) {
      alert("Incorrect password. Please try again.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user)); // save full user info
    alert("Login successful!");
    router.push("/dashboard");
  };

  const inputStyle = { width: "300px", padding: "0.5rem", fontSize: "1.2rem", marginTop: "0.3rem" };
  const buttonStyle = { width: "320px", padding: "1rem", fontSize: "1.5rem", cursor: "pointer", marginTop: "1rem" };
  const labelStyle = { marginBottom: "1rem", display: "flex", flexDirection: "column", alignItems: "flex-start" };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Login</h1>

      <label style={labelStyle}>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
      </label>

      <label style={labelStyle}>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
      </label>

      <button onClick={handleLogin} style={buttonStyle}>
        Login
      </button>
      <button onClick={() => router.push("/")} style={buttonStyle}>
        Back to Home
      </button>
    </div>
  );
}