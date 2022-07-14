import express, { NextFunction, Response, Request } from "express";
import morgan from "morgan";
import fileUpload, { UploadedFile } from "express-fileupload";
// import v1Routes from './routes/v1';

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
    useTempFiles: false,
    limits: { fileSize: 4 * 1024 * 1024 },
  })
);

// ------------------------------------
// Routes
// ------------------------------------
// app.use('/v1/dev/library', v1Routes.developer.library);

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
