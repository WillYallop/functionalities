import { Request, Response } from "express";
import { s3MediaKitInstance } from "../../util/mediakit";

const streamVideo = async (req: Request, res: Response) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // store video kit
  const steamRes = await s3MediaKitInstance.streamVideo(
    req.params.key,
    req.headers.range,
    "/videos"
  );

  // stream  video
  res.writeHead(206, steamRes?.headers);
  if (steamRes?.stream) {
    steamRes?.stream.pipe(res);
  }
};

export default streamVideo;
