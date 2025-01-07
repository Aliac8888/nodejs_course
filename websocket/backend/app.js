const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");

const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/auth");

const PORT = process.env.PORT || 3000;

dotenv.config({ path: "../.env" });
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5171/",
  },
});
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/posts", authMiddleware.authenticate, postRoutes);

app.use("/api/auth", authRoutes);

app.set("io", io);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
