import express from "express";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";
import ReviewRouter from "./src/routes/review.routes.js";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

// Create an instance of an Express application
const app = express();

// Create an HTTP server to be used with the Express app
const server = http.createServer(app);

// Create a Socket.IO server
const io = new SocketIOServer(server);

//Middleware to attach the Socket.IO instance to the request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Middleware to parse incoming JSON requests
app.use(express.json());

// Configure CORS to allow requests from a specific origin
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Mount review routes at /api/reviews
app.use("/api/reviews", ReviewRouter);

// Middleware to handle errors
app.use(errorHandler);

// Set up Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

export { app, server, io };
