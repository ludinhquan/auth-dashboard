export function isEmpty(item: any) {
  if (typeof item === 'string') return item.trim().length === 0;
  if (!item) return true;
  if (Array.isArray(item) && item.length === 0) return true;
  if (isObject(item) && Object.keys(item).length === 0) return true;
  return false;
}

export function get<T>(data: T, key: string): any {
  const fields: string[] = key.split('.');
  return fields.reduce(
    (prev: any, subField: string) => prev[subField],
    data ?? {},
  );
}

export function pick<T>(data: T, fields: (keyof T)[]): Partial<T> {
  return fields.reduce(
    (prev: Partial<T>, key) =>
      Object.assign(prev, { [key]: get(data, key as string) }),
    {},
  );
}

export function omit<T extends object>(data: T, keys: (keyof T)[]): Partial<T> {
  const omitFields = Array.isArray(keys) ? keys : [keys];
  const omitFieldSet: Set<keyof T> = new Set(omitFields);

  const pickFields = Object.keys(data).filter(
    (field) => !omitFieldSet.has(field as keyof T),
  ) as (keyof T)[];

  return pick(data, pickFields);
}

export function isObject(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    !(value instanceof RegExp)
  );
}
