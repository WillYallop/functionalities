import express from "express";
const router = express.Router();

// Controllers
import saveImage from "../controllers/local/saveImage";
import streamImage from "../controllers/local/streamImage";
import deleteImage from "../controllers/local/deleteImage";
import saveVideo from "../controllers/local/saveVideo";
import streamVideo from "../controllers/local/streamVideo";
import videoPlayer from "../controllers/local/videoPlayer";

// ------------------------------------
// routes
// ------------------------------------

// Images
router.post("/save-image", saveImage);
router.get("/stream-image/:key", streamImage);
router.delete("/delete-image/:key", deleteImage);
// Video
router.post("/save-video", saveVideo);
router.get("/stream-video/:key", streamVideo);

router.get("/video-player/:key", videoPlayer);

export default router;
