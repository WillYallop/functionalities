import express from "express";
const router = express.Router();

// Controllers
import standard from "../controllers/forms/standard";
import ssvalidation from "../controllers/forms/ssvalidation";

// ------------------------------------
// routes
// ------------------------------------
router.post("/standard", standard);
router.post("/ssvalidation", ssvalidation);

export default router;
