import express from "express";
const router = express.Router();

// Controllers
import saveImage from "../controllers/s3/saveImage";
import streamImage from "../controllers/s3/streamImage";
import deleteImage from "../controllers/s3/deleteImage";

// ------------------------------------
// routes
// ------------------------------------

// Components
router.post("/save-image", saveImage);
router.get("/stream-image/:key", streamImage);
router.delete("/delete-image/:key", deleteImage);

export default router;
