import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("https://todo-list-backend-j8wi.onrender.com/auth/login", { username, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.user.username);
            navigate("/tasks");
        } catch (err) {
            console.error(err);
            alert("Invalid credentials");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
        </div>
    );
}

export default Login;
