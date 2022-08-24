import { Request, Response } from "express";
import { s3MediaKitInstance } from "../../util/mediakit";

const streamImage = async (req: Request, res: Response) => {
  // store image kit
  const steamRes = s3MediaKitInstance.stream(req.params.key, "/images");

  // stream  image
  if (steamRes) {
    steamRes.pipe(res);
  }
};

export default streamImage;
