import { Router } from "express";
import {
  createSweet,
  getSweets,
  searchSweet,
  updateSweetController,
  deleteSweetController,
  purchaseSweetController,
  restockSweetController,
} from "./sweet.controller";
import { authMiddleware, adminMiddleware } from "../../middleware/auth.middleware";

const router = Router();

// CREATE sweet (protected)
router.post("/", authMiddleware, createSweet);

// GET all sweets (protected)
router.get("/", authMiddleware, getSweets);

// SEARCH sweets (protected)
router.get("/search", authMiddleware, searchSweet);

// UPDATE sweet (protected)
router.put("/:id", authMiddleware, updateSweetController);

// DELETE sweet (admin only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteSweetController);

// PURCHASE sweet (protected)
router.post("/:id/purchase", authMiddleware, purchaseSweetController);

// RESTOCK sweet (admin only)
router.post("/:id/restock", authMiddleware, adminMiddleware, restockSweetController);

export default router;
