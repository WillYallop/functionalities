> [Back](/README.md)

# MediaKit

MediaKit is a backend utility package for processing, saving, getting and streaming images, files and video! We support both local and AWS S3 to store files processed with MediaKit.

Alongside the MediaKit class that is exported as default, there is an ImageKit and VideoKit class. These will be your main entry point for handling images and videos. They are responsible for injesting and processing their corresponding file type.

The MediaKit class is how you will save, delete, get and stream files.

## Install

```
npm install @functionalities/mediakit --save
```

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

## ImageKit
