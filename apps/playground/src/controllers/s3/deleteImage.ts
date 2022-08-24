import { Request, Response } from "express";
import { s3MediaKitInstance } from "../../util/mediakit";

const deleteImage = async (req: Request, res: Response) => {
  // store image kit
  const deleteImage = await s3MediaKitInstance.delete(
    req.params.key,
    "/images"
  );
  res.status(200).send(deleteImage);
};

export default deleteImage;
