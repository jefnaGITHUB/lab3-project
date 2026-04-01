import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  console.log("running the health check");
  res.json({
    status: "OK",
    service: "Backend",
  });
});

app.get("/api/message", (req, res) => {
  console.log("running the message endpoint");
  const messages = [
    "Ryan is cool",
    "Santi is cool",
    "Someone is cool",
    "Nobody is cool",
  ];
  const randomMsg = messages[Math.floor(Math.random() * messages.length)];
  res.json({ message: randomMsg });
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
