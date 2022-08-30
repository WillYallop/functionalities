import express from "express";
const router = express.Router();

// Controllers
import saveImage from "../controllers/s3/saveImage";
import streamImage from "../controllers/s3/streamImage";
import deleteImage from "../controllers/s3/deleteImage";
import saveVideo from "../controllers/s3/saveVideo";
import streamVideo from "../controllers/s3/streamVideo";
import videoPlayer from "../controllers/s3/videoPlayer";

// ------------------------------------
// routes
// ------------------------------------

// Components
router.post("/save-image", saveImage);
router.get("/stream-image/:key", streamImage);
router.delete("/delete-image/:key", deleteImage);
// Video
router.post("/save-video", saveVideo);
router.get("/stream-video/:key", streamVideo);

router.get("/video-player/:key", videoPlayer);

export default router;
