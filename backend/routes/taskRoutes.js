const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

//Get all tasks
router.get("/",authMiddleware, async (req, res) => {
    // const tasks = await Task.find();
    // res.json(tasks);
    try {
        const userId = req.user.id; // Get logged-in user's ID
        const tasks = await Task.find({ userId }); // Fetch tasks for that user only
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Create a task
router.post("/",authMiddleware, async (req, res) => {
    // console.log("User Data:", req.user);
    // console.log("Task creation endpoint hit"); // Debugging step
    // const newTask = new Task(req.body);
    // await newTask.save();
    // res.json(newTask);
    try {
        const { title, description, completed } = req.body;
        const userId = req.user.id; // Extract user ID from token

        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        const newTask = new Task({ title, description, completed: completed || false, userId });
        await newTask.save();

        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//Update a task
router.put("/:id", async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
});

//Delete a task
router.delete("/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

module.exports = router;

