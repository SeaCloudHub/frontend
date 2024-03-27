export function isEnumValue<T extends string>(enumObject: Record<string, T>, value: string): T | null {
  const enumValues = Object.values(enumObject);
  if (enumValues.includes(value as T)) {
    return value as T;
  }
  return null;
}
