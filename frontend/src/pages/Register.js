import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post("https://todo-list-backend-j8wi.onrender.com/auth/register", { username, password });
            alert("User registered successfully!");
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert("Error registering user");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
            <button onClick={()=> navigate("../login")}>Login</button>
        </div>
    );
}

export default Register;
