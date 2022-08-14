import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { ImageKit } from "mediakit";
import { localMediaKitInstance } from "../../util/mediakit";

const saveImage = async (req: Request, res: Response) => {
  if (req.files) {
    const keys: Array<string> = Object.keys(req.files);
    let file: UploadedFile;
    if (Array.isArray(req.files[keys[0]])) {
      const [firstFile] = req.files[keys[0]] as UploadedFile[];
      file = firstFile;
    } else file = req.files[keys[0]] as UploadedFile;

    if (!file) {
      res.status(400).send({
        message: "No file was uploaded",
      });
      return;
    }

    const injestedCB = () => {
      res.status(200).json({
        data: injestImg.data,
      });
      localMediaKitInstance.save(injestImg);
    };

    // injest new image into imagekit
    const injestImg = new ImageKit(file.data, {
      name: file.name,
      injested: injestedCB,
    });
  } else {
    res.status(400).send("No files were uploaded.");
    return;
  }
};

export default saveImage;
