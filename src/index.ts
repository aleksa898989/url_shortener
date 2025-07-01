import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import urlRoutes from "./routes/url";
import { redirectToOriginal } from "./controllers/urlController";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Serve static files first
app.use(express.static(path.join(__dirname, "../public")));

// API routes
app.use("/api", urlRoutes);

// Home page route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Short URL redirect route (must be last)
app.get("/:shortCode", redirectToOriginal as express.RequestHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
