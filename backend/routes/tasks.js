const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// ✅ Get all tasks (Only for logged-in users)
router.get("/", authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });  // ✅ Fetch only logged-in user's tasks
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
});

// ✅ Add a new task
router.post("/", authMiddleware, async (req, res) => {
    console.log("Authenticated User:", req.user);
    const { title, description } = req.body;
    const userId = req.user?.id; // Ensure userId exists
    console.log("Extracted userId:", userId); // Log the extracted userId
    if (!userId) {
        return res.status(400).json({ message: "User ID is missing from request" });
    }

    const newTask = new Task({
        title,
        description,
        userId, // ✅ Save task with logged-in user ID
    });

    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: "Error creating task" });
    }
});

// ✅ Update a task
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Delete a task
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
