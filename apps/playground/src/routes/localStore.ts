import express from "express";
const router = express.Router();

// Controllers
import saveImage from "../controllers/local/saveImage";
import streamImage from "../controllers/local/streamImage";
import deleteImage from "../controllers/local/deleteImage";

// ------------------------------------
// routes
// ------------------------------------

// Components
router.post("/save-image", saveImage);
router.get("/stream-image/:key", streamImage);
router.delete("/delete-image/:key", deleteImage);

export default router;
