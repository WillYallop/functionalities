const merge = (
  target: { [key: string]: any },
  source: { [key: string]: any }
) => {
  if (!source || !target) return target;
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object) {
      Object.assign(source[key], merge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
};
export default merge;
