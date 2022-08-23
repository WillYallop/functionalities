import { IK_ImageMap, ST_FileDataObj } from "../../../types";

const flattenImageData = (imgMap: IK_ImageMap) => {
  const imagesArr = Array.from(imgMap.values());
  const flatData: Array<{
    key: string;
    name: string;
    height: number;
    width: number;
    data: ST_FileDataObj;
  }> = [];
  imagesArr.map((img) => {
    img.data.images.map((imgData) => {
      flatData.push({
        key: img.key,
        name: img.data.name,
        height: img.data.height,
        width: img.data.width,
        data: imgData,
      });
    });
  });
  return flatData;
};

export default flattenImageData;
