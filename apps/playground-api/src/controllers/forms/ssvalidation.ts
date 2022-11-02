import { Request, Response } from "express";

const standard = async (req: Request, res: Response) => {
  setTimeout(() => {
    // res.status(200).json({});
    res.status(422).json({
      errors: {
        firstName: ["Name is required", "Name must be at least 3 characters"],
        email: ["Email is required"],
        telephone: ["Telephone is required"],
      },
      message: "There was an error",
    });
  }, 3000);
};

export default standard;
