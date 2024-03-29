import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { ImageKit } from "mediakit";
import { localMediaKitInstance } from "../../util/mediakit";

const saveImage = async (req: Request, res: Response) => {
  if (!req.files) {
    res.status(400).send("No files were uploaded.");
    return;
  }

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

  // New ImageKit Instance
  const ImageKitInst = new ImageKit({
    keyPrefix: "playground_",
    width: 500,
    height: 500,
  });

  const Image = await ImageKitInst.injest(file.data, file.name);
  await Image.process();

  // store image kit
  const storeImageKitRes = await localMediaKitInstance.save(
    ImageKitInst,
    "/images"
  );

  res.status(200).json(storeImageKitRes);
};

export default saveImage;
