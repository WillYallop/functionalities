# MediaKit - v0.2.1

> For exmaples visit the repo and go to /apps/playground-api and look at the local and s3 controllers.

MediaKit is a backend utility package for processing, saving, getting and streaming images, files and video! We support both local and AWS S3 to store files processed with MediaKit.

Alongside the MediaKit class that is exported as default, there is an ImageKit and VideoKit class. These will be your main entry point for handling images and videos. They are responsible for injesting and processing their corresponding file type.

The MediaKit class is how you will save, delete, get and stream files.

---

## Install

```
npm install @functionalities/mediakit --save
```

---

## Initialise MediaKit

Initialise a MediaKit instance, passing down config depending on how you wish to store your files.

```typescript
export const localInstance = new MediaKit({
  storeMethod: "local",
  localOptions: {
    directory: "./uploads",
  },
});
```

> Local Store Exmaple

```typescript
export const s3Instance = new MediaKit({
  storeMethod: "s3",
  s3Options: {
    bucket: "bucket",
    region: "eu-central-1",
    accessKeyId: "",
    secretAccessKey: "",
  },
});
```

> AWS S3 Store Example

### Public methods

- save
- delete
- get
- stream
- streamVideo

---

## ImageKit

The ImageKit is responsible for injesting images to process and save. All images injested with an instance of this class will be process with the config defined in it.

```typescript
// Create a new instance
const IKInstance = new ImageKit({
  keyPrefix: "example_",
});
```

You can injest an image with the MediaKit instance. This will return an Image class instance. With this you can then process it.

```typescript
const Image = await IKInstance.injest(file.data, file.name); // blob, string
await Image.process();
```

Once you have injested and process all of the images you need in this ImageKit instance, you can then save it using the MediaKit.save method. Depending on the store type you selected for that controls where the file is stored. Once the file has been stored successfully, the ImageKit instance will have its injested images cleared.

```typescript
// store image kit
const storeImageKitRes = await localInstance.save(
  IKInstance, // your ImageKit instance, or VideoKit instance
  "/images" // the subdirectory you wish it to be installed under
);

// response interface
interface MK_SaveSingleFileRes {
  success: boolean;
  key: string;
  name: string;
  height?: number;
  width?: number;
  folder?: string;
  files: Array<{
    saved: boolean;
    key: string;
    mime: string;
    extension: string;
  }>;
}
```

> You will want to save this data in a database so you can stream, delete the image later on.

---

## VideoKit

The VideoKit is responsible for injesting videos. In the future this may have some form of processing.

```typescript
// New ImageKit Instance
const VKInstance = new VideoKit({
  keyPrefix: "example_",
});
```

Similar to the ImageKit, when injesting a video into the VideoKit it will return a Video class instance. However, this currently has no public methods for processing it.

```typescript
await VKInstance.injest(file.tempFilePath, file.mimetype, file.name); // string, string, string
```

Now you have injested all of the videos you want to save. You can use your MediaKit instance.

```typescript
// store video kit
const storeImageKitRes = await localMediaKitInstance.save(
  VideoKitInst,
  "/videos"
);

// response interface
interface MK_SaveSingleFileRes {
  success: boolean;
  key: string;
  name: string;
  height?: number;
  width?: number;
  folder?: string;
  files: Array<{
    saved: boolean;
    key: string;
    mime: string;
    extension: string;
  }>;
}
```

> You will want to save this data in a database so you can stream, delete the image later on.

---

## Future

- A FileKit with proccesing methods will be added.
