import { Request, Response } from "express";
import { localMediaKitInstance } from "../../util/mediakit";

const streamImage = async (req: Request, res: Response) => {
  // store image kit
  const steamRes = localMediaKitInstance.stream(req.params.key, "/images");

  // stream  image
  if (steamRes) {
    steamRes
      .on("data", (chunk) => {
        res.write(chunk);
      })
      .on("end", () => {
        res.end();
      })
      .on("error", (err) => {
        res.status(500).send(err);
      })
      .pipe(res);
  }
};

export default streamImage;
