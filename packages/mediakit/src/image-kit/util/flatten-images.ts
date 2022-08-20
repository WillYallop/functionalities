import { IK_ImageMap, ST_fileDataObj } from "../../../types";

const flattenImageData = (imgMap: IK_ImageMap) => {
  const imagesArr = Array.from(imgMap.values());
  const flatData: Array<{
    key: string;
    data: Array<ST_fileDataObj>;
  }> = [];
  imagesArr.map((img) => {
    flatData.push({
      key: img.key,
      data: img.data.images,
    });
  });
  return flatData;
};

export default flattenImageData;
