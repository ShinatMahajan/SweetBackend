import { Request, Response } from "express";
import {
  createSweetService,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} from "./sweet.service";

// CREATE sweet
export const createSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await createSweetService(req.body);
    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Failed to create sweet" });
  }
};

// GET all sweets
export const getSweets = async (req: Request, res: Response) => {
  try {
    const sweets = await getAllSweets();
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sweets" });
  }
};

// SEARCH sweets
export const searchSweet = async (req: Request, res: Response) => {
  try {
    const sweets = await searchSweets(req.query);
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};

// UPDATE sweet
export const updateSweetController = async (req: Request, res: Response) => {
  try {
    const sweet = await updateSweet(req.params.id, req.body);
    res.status(200).json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Failed to update sweet" });
  }
};

// DELETE sweet
export const deleteSweetController = async (req: Request, res: Response) => {
  try {
    await deleteSweet(req.params.id);
    res.status(200).json({ message: "Sweet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete sweet" });
  }
};

// PURCHASE sweet
export const purchaseSweetController = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;
    const qty = Number(quantity);
    if (!qty || qty <= 0) return res.status(400).json({ message: "Invalid quantity" });

    const sweet = await purchaseSweet(req.params.id, qty);
    res.status(200).json(sweet);
  } catch (error) {
    const msg = (error as any).message || "Purchase failed";
    if (msg === "Insufficient stock" || msg === "Sweet not found") return res.status(400).json({ message: msg });
    res.status(500).json({ message: msg });
  }
};

// RESTOCK sweet
export const restockSweetController = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;
    const qty = Number(quantity);
    if (!qty || qty <= 0) return res.status(400).json({ message: "Invalid quantity" });

    const sweet = await restockSweet(req.params.id, qty);
    res.status(200).json(sweet);
  } catch (error) {
    const msg = (error as any).message || "Restock failed";
    res.status(500).json({ message: msg });
  }
};
