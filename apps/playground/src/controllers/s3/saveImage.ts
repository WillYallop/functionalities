import { Request, Response } from "express";

const saveImage = async (req: Request, res: Response) => {
  res.status(200).json({
    message: "saveImage",
  });
};

export default saveImage;
