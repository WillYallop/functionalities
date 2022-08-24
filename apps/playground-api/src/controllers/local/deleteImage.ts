import { Request, Response } from "express";
import { localMediaKitInstance } from "../../util/mediakit";

const deleteImage = async (req: Request, res: Response) => {
  // store image kit
  const deleteImage = await localMediaKitInstance.delete(
    req.params.key,
    "/images"
  );
  res.status(200).send(deleteImage);
};

export default deleteImage;
