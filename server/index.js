// index.js
import express from "express";
import dotenv from 'dotenv';
import connectDb from "./database/db.js";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";

dotenv.config();
connectDb();
const app = express();
// const port = 3000; 

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook' || req.originalUrl === '/api/v1/purchase/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});


app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));



app.use(
  cors({
    origin: "https://client-khaki-eight.vercel.app", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow necessary methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow custom headers
    credentials: true, // Allow cookies and authentication headers
  })
);

// Handle Preflight Requests
app.options("*", cors()); // This allows all preflight requests


// Use your API routes
app.use('/api/v1/user', userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000; // Use environment variable or default to 3000 (for local dev)

// Vercel doesn't need explicit app.listen()

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

