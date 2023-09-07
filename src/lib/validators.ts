export function isString(data: any): data is string {
  return typeof data === "string";
}

export function isNumber(data: any): data is number {
  return !isNaN(data);
}

export function isObject<T>(data: T | undefined): data is T {
  return typeof data === "object" && data !== null;
}
