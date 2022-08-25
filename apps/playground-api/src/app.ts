import express, { NextFunction, Response, Request } from "express";
import morgan from "morgan";
import fileUpload, { UploadedFile } from "express-fileupload";
import localRoutes from "./routes/localStore";
import s3Routes from "./routes/s3Store";

interface Error {
  status?: number;
}

declare module "express-serve-static-core" {
  interface Request {
    files?: fileUpload.FileArray | undefined;
  }
}

const app = express();

// ------------------------------------
// MIDDLEWARE
// ------------------------------------
app.use(express.json());
app.use(morgan("dev"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp",
    limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // 2GB
  })
);

// ------------------------------------
// Routes
// ------------------------------------
app.use("/local", localRoutes);
app.use("/s3", s3Routes);

// ------------------------------------
// ERROR HANDLING
// ------------------------------------
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found");
  next(error);
});

app.use((error: Error, req: Request, res: Response) => {
  res.status(error.status || 500);
});

export default app;
