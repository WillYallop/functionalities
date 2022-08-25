import express from "express";
const router = express.Router();

// Controllers
import saveImage from "../controllers/local/saveImage";
import streamImage from "../controllers/local/streamImage";
import deleteImage from "../controllers/local/deleteImage";
import saveVideo from "../controllers/local/saveVideo";

// ------------------------------------
// routes
// ------------------------------------

// Images
router.post("/save-image", saveImage);
router.get("/stream-image/:key", streamImage);
router.delete("/delete-image/:key", deleteImage);
// Video
router.post("/save-video", saveVideo);

export default router;
