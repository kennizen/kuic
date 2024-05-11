type Result<T, E extends Error> = [T, null] | [null, E];

export function formatBytes(bytes: number, decimals: number = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function intoResult<T extends (...args: any[]) => ReturnType<T>, E extends Error>(
  cb: T,
  ...args: Parameters<T>
): Result<ReturnType<T>, E> {
  try {
    const res = cb(args);
    return [res, null];
  } catch (error) {
    return [null, error as E];
  }
}
