import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Home() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://todo-list-backend-j8wi.onrender.com/tasks")
            .then(res => setTasks(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Task List</h1>
            <button onClick={()=>navigate("./login")}>Login</button>
            <button onClick={()=>navigate("./register")}>Register</button>
            {tasks.map(task => (
                <div key={task._id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;