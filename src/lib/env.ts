/**
 * Returns the environment variable value as boolean
 *
 * @param key The environment variable name
 *
 * @returns The environment variable value as boolean
 */
export function getBoolean(key: string) {
  const value = getString(key);
  const letter = value.trim().toLocaleLowerCase().substring(0, 1);
  return letter === "y" || letter === "t";
}

/**
 * Returns the environment variable value as a number
 *
 * @param key The environment variable name
 * @param defaultValue A required default value
 *
 * @returns The environment variable value
 */
export function getNumber(key: string, defaultValue: number) {
  const value = getString(key);
  const numberValue = Number(value);
  if (value.length === 0 || isNaN(numberValue)) {
    return defaultValue;
  }
  return numberValue;
}

/**
 * Returns the environment variable value as string
 *
 * @param key The environment variable name
 * @param defaultValue An optional default value
 *
 * @returns The environment variable value
 */
export function getString(key: string, defaultValue: string = "") {
  return `${process.env[key] || defaultValue}`.trim();
}
