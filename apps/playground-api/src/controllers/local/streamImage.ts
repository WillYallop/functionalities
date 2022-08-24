import { Request, Response } from "express";
import { localMediaKitInstance } from "../../util/mediakit";

const streamImage = async (req: Request, res: Response) => {
  // store image kit
  const steamRes = localMediaKitInstance.stream(req.params.key, "/images");

  // stream  image
  if (steamRes) {
    steamRes.pipe(res);
  }
};

export default streamImage;
