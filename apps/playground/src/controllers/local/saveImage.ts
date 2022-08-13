import { Request, Response } from "express";
import fs from "fs-extra";
import { ImageKit } from "mediakit";
import { localMediaKitInstance } from "../../util/mediakit";
import path from "path";

const saveImage = async (req: Request, res: Response) => {
  // get an image from using the fs npm import
  const image = await fs.readFile(path.resolve("../../assets/landscape.jpg"));

  const injestImg = new ImageKit(image);
  await injestImg.process();

  localMediaKitInstance.save(injestImg);

  res.status(200).json({
    message: "saveImage",
  });
};

export default saveImage;
