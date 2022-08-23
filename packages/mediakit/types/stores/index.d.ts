export interface ST_SaveFileResponse {
  saved: boolean;
  key: string;
  mime: string;
  extension: string;
}

export interface ST_FileDataObj {
  data: Buffer;
  mime: string;
  extension: string;
}
