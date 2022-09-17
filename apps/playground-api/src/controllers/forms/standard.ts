import { Request, Response } from "express";

const standard = async (req: Request, res: Response) => {
  setTimeout(() => {
    // res.status(500).send("error");
    res.status(200).send("ok");
  }, 3000);
};

export default standard;
