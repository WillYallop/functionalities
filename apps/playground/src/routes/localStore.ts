import express from "express";
const router = express.Router();

// Controllers
import saveImage from "../controllers/local/saveImage";
import streamImage from "../controllers/local/streamImage";

// ------------------------------------
// routes
// ------------------------------------

// Components
router.post("/save-image", saveImage);
router.get("/stream-image/:key", streamImage);

export default router;
