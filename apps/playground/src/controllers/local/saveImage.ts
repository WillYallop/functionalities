import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { ImageKit, MediaKit } from "mediakit";
import { localMediaKitInstance } from "../../util/mediakit";

// New ImageKit Instance
const ImageKitInst = new ImageKit();

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

    const Image = await ImageKitInst.injest(file.data, file.name);
    await Image.process();

    // store image kit
    const storeImageKitRes = localMediaKitInstance.save(ImageKitInst);

    await ImageKitInst.close();

    res.status(200).json(storeImageKitRes);
  } else {
    res.status(400).send("No files were uploaded.");
    return;
  }
};

export default saveImage;
