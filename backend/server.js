const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();
console.log("MongoDB URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; // Fetching MONGO_URI

app.use(cors());
app.use(express.json());
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Server is running...");
});


if (!MONGO_URI) {
    console.error("Error: MONGO_URI is not defined. Check your .env file.");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MonogoDB connected"))
    .catch(err => console.log(err));

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
