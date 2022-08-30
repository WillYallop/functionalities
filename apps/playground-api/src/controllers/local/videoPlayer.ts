import { Request, Response } from "express";

const videoPlayer = async (req: Request, res: Response) => {
  res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <video id="videoPlayer" width="50%" controls muted="muted" autoplay>
          <source
            src="http://localhost:4646/local/stream-video/${req.params.key}"
            type="video/mp4"
          />
        </video>
      </body>
    </html>`);
};

export default videoPlayer;
