import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const buttonStyle = {
    padding: "15px 30px",
    fontSize: "18px",
    marginTop: "10px",
    cursor: "pointer",
    borderRadius: "5px"
  };

  return (
    <div style={{ textAlign: "center", marginTop: "15vh" }}>
      <h1 style={{ fontSize: "60px" }}>Home</h1>
      <button onClick={() => router.push("/login")} style={{ ...buttonStyle, marginTop: "20px" }}>Login</button>
      <button onClick={() => router.push("/register")} style={buttonStyle}>Register</button>
    </div>
  );
}
