export function isEmpty(item: any) {
  if (typeof item === 'string') return item.trim().length === 0;
  if (!item) return true;
  if (Array.isArray(item) && item.length === 0) return true;
  if (isObject(item) && Object.keys(item).length === 0) return true;
  return false;
}

export function flat<T>(arr: T[][]): T[] {
  let temp: T[] = [];
  arr.forEach((item) => {
    temp = [...temp, ...item];
  });
  return temp;
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

function omit<T>(data: T, keys: (keyof T)[]): Partial<T> {
  const omitFields = Array.isArray(keys) ? keys : [keys];
  const omitFieldSet: Set<keyof T> = new Set(omitFields);

  const pickFields = Object.keys(data).filter(
    (field) => !omitFieldSet.has(field as keyof T),
  ) as (keyof T)[];

  return pick(data, pickFields);
}

export { omit };

export function isObject(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    !(value instanceof RegExp)
  );
}

export function isNil(value: unknown): value is null | undefined {
  return value === undefined || value === null;
}

export function normalize(value = '') {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

export function compare(a: unknown, b: any): boolean {
  if (b === null || b === undefined || typeof b !== typeof a) return false;
  if (a === b) return true;
  return JSON.stringify(a) === JSON.stringify(b);
}

type ExcludeValueType = null | undefined | '' | {} | [] | number | string;

export function removeEmptyProps<T>(
  item: T,
  excludeValue: ExcludeValueType | ExcludeValueType[] = [
    null,
    undefined,
    '',
    {},
    [],
  ],
  recursive = true,
): T {
  const excludeValues = Array.isArray(excludeValue)
    ? excludeValue
    : [excludeValue];

  const removeEmptyArray = excludeValues.some((item) => isEmptyArray(item));
  const removeEmptyObject = excludeValues.some((item) => isEmptyObject(item));

  const excludeSet = new Set(excludeValues);

  const filtered: any = {};
  for (const key of Object.keys(item)) {
    if (isObject(item[key]))
      item[key] = removeEmptyProps(item[key], excludeValues, recursive);
    if (excludeSet.has(item[key])) continue;
    if (removeEmptyArray && isEmptyArray(item[key])) continue;
    if (removeEmptyObject && isEmptyObject(item[key])) continue;
    filtered[key] = item[key];
  }

  return filtered;
}

function isEmptyArray(item: any) {
  return Array.isArray(item) && item.length === 0;
}

function isEmptyObject(item: any) {
  return isObject(item) && Object.keys(item).length === 0;
}
