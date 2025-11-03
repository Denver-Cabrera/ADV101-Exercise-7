import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import clock from '../public/clock.jpg'

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    const buttonStyle = {
        padding: "15px 30px",
        fontSize: "18px",
        marginTop: "10px",
        cursor: "pointer",
        borderRadius: "5px",
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("user");
            if (!storedUser) {
                router.push("/login");
            } else {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                } catch (err) {
                    console.error("Error parsing user data:", err);
                    localStorage.removeItem("user");
                    router.push("/login");
                }
            }
        }
    }, [router]);

    const logout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1 style={{ fontSize: "50px", marginBottom: "20px" }}>Dashboard</h1>

            {user && <p>Welcome, {user.email}</p>}

            <button onClick={logout} style={buttonStyle}>
                Logout
            </button>
            <button onClick={() => router.push("/")} style={buttonStyle}>
                Back to Home
            </button>
            <div style={{ marginTop: "30px" }}>
                <Image src={clock}
                    alt="clock"
                    width='300'
                    height='300'
                    placeholder='blur'
                    marginTop='20px'
                />
            </div>
        </div>
    );
}
