import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      alert("This email is already registered. Please log in.");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please log in.");
    router.push("/login");
  };

  const inputStyle = { width: "300px", padding: "0.5rem", fontSize: "1.2rem", marginTop: "0.3rem" };
  const buttonStyle = { width: "320px", padding: "1rem", fontSize: "1.5rem", cursor: "pointer", marginTop: "1rem" };
  const labelStyle = { marginBottom: "1rem", display: "flex", flexDirection: "column", alignItems: "flex-start" };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>Register</h1>
      
      <label style={labelStyle}>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
      </label>

      <label style={labelStyle}>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
      </label>

      <button onClick={handleRegister} style={buttonStyle}>Register</button>
      <button onClick={() => router.push("/")} style={buttonStyle}>Back to Home</button>
    </div>
  );
}
