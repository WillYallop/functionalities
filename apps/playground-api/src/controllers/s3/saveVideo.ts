import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { VideoKit } from "mediakit";
import { s3MediaKitInstance } from "../../util/mediakit";

const saveVideo = async (req: Request, res: Response) => {
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
  const VideoKitInst = new VideoKit({
    keyPrefix: "playground_",
  });

  await VideoKitInst.injest(file.tempFilePath, file.mimetype, file.name);

  // store video kit
  const storeImageKitRes = await s3MediaKitInstance.save(
    VideoKitInst,
    "/videos"
  );

  res.status(200).json(storeImageKitRes);
};

export default saveVideo;
