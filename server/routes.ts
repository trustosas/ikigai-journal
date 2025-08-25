import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertJournalEntrySchema, type JournalResponses } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Save journal progress
  app.post("/api/journal/save", async (req, res) => {
    try {
      const data = insertJournalEntrySchema.parse(req.body);
      
      // For demo purposes, use a static user ID
      // In a real app, this would come from authentication
      const userId = "demo-user";
      
      // Check if entry exists
      const existing = await storage.getJournalEntry(userId);
      
      if (existing) {
        const updated = await storage.updateJournalEntry(existing.id, data);
        res.json(updated);
      } else {
        const entry = await storage.saveJournalEntry(userId, data);
        res.json(entry);
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  // Get journal progress
  app.get("/api/journal", async (req, res) => {
    try {
      const userId = "demo-user";
      const entry = await storage.getJournalEntry(userId);
      
      if (entry) {
        res.json(entry);
      } else {
        res.json(null);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch journal entry" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
