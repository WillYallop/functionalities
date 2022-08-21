// includes utility functions and data for the stores, such as how we generate its names, how we handle different file types etc.

interface ST_Options {}

export default class Store {
  options: ST_Options;
  constructor(options?: ST_Options) {
    this.options = { ...options };
  }
  fileKey(key: string, ext: string) {
    return `${key}.${ext}`;
  }
}
