import express from "express";
const router = express.Router();

// Controllers
import saveImage from "../controllers/local/saveImage";

// ------------------------------------
// routes
// ------------------------------------

// Components
router.post("/save-image", saveImage);

export default router;
