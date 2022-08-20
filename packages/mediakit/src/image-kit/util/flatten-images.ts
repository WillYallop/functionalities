import { IK_ImageMap, ST_fileDataObj } from "../../../types";

const flattenImageData = (imgMap: IK_ImageMap) => {
  const imagesArr = Array.from(imgMap.values());
  const flatData: Array<{
    key: string;
    data: ST_fileDataObj;
  }> = [];
  imagesArr.map((img) => {
    img.data.images.map((imgData) => {
      flatData.push({
        key: img.key,
        data: imgData,
      });
    });
  });
  return flatData;
};

export default flattenImageData;
