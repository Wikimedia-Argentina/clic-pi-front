/**
 * Receives a string and returns the JSON parse value of it
 *
 * @param data The string to be parsed
 * @param isT A function that validates if the parsed object is valid
 */
export function JSONSafeParse<T>(
  data: any,
  isT: (d: any) => d is T,
  defaultValue?: T,
): T | undefined {
  try {
    if (typeof data === "string") {
      const parsed = JSON.parse(data);
      if (isT(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error(error);
  }
  return defaultValue;
}
