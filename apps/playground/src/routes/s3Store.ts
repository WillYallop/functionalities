import express from "express";
const router = express.Router();

// Controllers
import saveImage from "../controllers/s3/saveImage";

// ------------------------------------
// routes
// ------------------------------------

// Components
router.post("/save-image", saveImage);

export default router;
