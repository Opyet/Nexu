import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/ping", (req, res) => {
  res.json({ message: "Nexu backend active 🚀" });
});

export default router;