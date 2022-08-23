import { IK_ImageMap, ST_FileDataObj } from "../../../types";
declare const flattenImageData: (imgMap: IK_ImageMap) => {
    key: string;
    name: string;
    height: number;
    width: number;
    data: ST_FileDataObj;
}[];
export default flattenImageData;
//# sourceMappingURL=flatten-images.d.ts.map