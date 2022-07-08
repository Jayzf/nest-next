// Ref: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html

const slice = Array.prototype.slice;

export function curryr2(fn: (a: any, b: any) => any) {
  return (b: any) => (a: any) => fn.apply(null, [a, b]);
}

export const truthy = (any: any): boolean => !!any;

export function isDefined(val: unknown): boolean {
  if (val == null || typeof val === 'undefined') return false;
  return true;
}

export function isObject(obj: any): boolean {
  return typeof obj === 'object' && !!obj;
}

export const decimalInt = curryr2(parseInt)(10);

export function isEmpty(str: string): boolean {
  return str.trim() === '';
}

export function keys(obj: any): string[] {
  return isObject(obj) ? Object.keys(obj) : [];
}

export function each(
  list: any[],
  iterateeFn: (item: any, index: number) => void,
): any[] {
  const _keys: string[] = keys(list);
  for (let i = 0, len = _keys.length; i < len; i++) {
    iterateeFn(list[_keys[i]], i);
  }
  return list;
}

export function map(
  list: any[],
  mapperFn: (item: any, index: number) => any,
): any[] {
  const result: any[] = [];
  each(list, (item, index) => {
    result.push(mapperFn(item, index));
  });
  return result;
}
