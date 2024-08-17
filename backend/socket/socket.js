import { Server } from "socket.io";
import http from "http";
import express from "express";
import docModel from "../models/docModel.js";
import cors from "cors"; // Import CORS

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});
// const documents = {}; // Store documents in-memory

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("join_document", async(docId) => {
    socket.join(docId);
    console.log(`User ${socket.id} joined document ${docId}`);

    try {
      // Fetch the document from the database by its ID
      const doc = await docModel.findById(docId);

      if (doc) {
        // Send the document content to the newly connected user
        socket.emit("document_content", doc.content);
      } else {
        // Handle the case where the document doesn't exist
        console.error(`Document ${docId} not found.`);
        socket.emit("document_content", ""); // Send empty content to the client
      }
    } catch (error) {
      console.error(`Error fetching document ${docId}:`, error);
      // Optionally, send an error message to the client
      socket.emit("error_message", "Error fetching document content.");
    }
  });

  socket.on("edit_document", async({ docId, updatedContent }) => {
    try {
      // Update the document content in the database
      const updatedDoc = await docModel.findByIdAndUpdate(
        docId,
        { content: updatedContent },
        { new: true } // Return the updated document
      );

      if (updatedDoc) {
        // Broadcast the updated content to all clients except the sender
        socket.to(docId).emit("document_update", updatedContent);
      } else {
        console.error(`Document ${docId} not found for update.`);
      }
    } catch (error) {
      console.error(`Error updating document ${docId}:`, error);
      // Optionally, send an error message to the client
      socket.emit("error_message", "Error updating document content.");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Connection error:", err);
  });
});

export { app, io, server };
