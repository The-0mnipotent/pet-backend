import { config } from "dotenv";
import express, { json } from "express";
import { connect } from "mongoose";
import router from "./routes/petRoutes.js";

config();

const app = express();
app.use(json());
app.use(express.static("public"));

// Set up a basic route
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/pets", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // Connect to MongoDB
  connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("Connected to MongoDB");
      console.log(`Server is running on port ${PORT}`);
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
});
