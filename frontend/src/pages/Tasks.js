import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState("");
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editTask, setEditTask] = useState(null); // Store task to edit
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const storedUsername = localStorage.getItem("username"); // ✅ Get username
      console.log("Fetched Username from LocalStorage:", storedUsername); // ✅ Debugging
        setUsername(storedUsername || "User");

      axios
        .get("http://localhost:5000/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setTasks(res.data))
        .catch((err) => console.error(err));
    }
  }, [token, navigate]);

  // ✅ Add Task
  const handleAddTask = async () => {
    try {
        console.log("Sending request to add task");
        console.log("Token being sent:", token);
      const res = await axios.post("http://localhost:5000/tasks", newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks([...tasks, res.data]);
      setNewTask({ title: "", description: "" });
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete Task
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Edit Task - Open modal with selected task
  const handleEditClick = (task) => {
    setEditTask(task);
  };

  // ✅ Update Task in Database
  const handleUpdateTask = () => {
    axios
      .put(`http://localhost:5000/tasks/${editTask._id}`, editTask, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTasks(
          tasks.map((task) => (task._id === editTask._id ? res.data : task))
        );
        setEditTask(null);
      })
      .catch((err) => console.error(err));
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // ✅ Redirect to login page
  };
  return (
    <div>
    <button onClick={handleLogout}>Logout</button>
    <h1>Welcome, {username}</h1>
      <h1>Task Management</h1>
      <input
        type="text"
        placeholder="Title"
        value={newTask.title || ""}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />

      <input
        type="text"
        placeholder="Description"
        value={newTask.description || ""}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
      />
      <button onClick={handleAddTask}>Add Task</button>
      <h2>Your Tasks</h2>
      {tasks.map((task) => (
        <div key={task._id} className="task">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => handleEditClick(task)}>Edit</button>{" "}
          {/* ✅ Edit button */}
          <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
        </div>
      ))}

      {/* Edit Task Modal */}
      {editTask && (
        <div className="modal">
          <h2>Edit Task</h2>
          <input
            type="text"
            value={editTask?.title || ""}
            onChange={(e) =>
              setEditTask({ ...editTask, title: e.target.value })
            }
          />
          <input
            type="text"
            value={editTask?.description || ""}
            onChange={(e) =>
              setEditTask({ ...editTask, description: e.target.value })
            }
          />
          <button onClick={handleUpdateTask}>Update Task</button>
          <button onClick={() => setEditTask(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default Tasks;
