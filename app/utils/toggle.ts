export function toggle<T>(value: T, array: T[]) {
  if (array.includes(value)) {
    return array.filter((v) => v !== value);
  }

  return [
    ...array,
    value
  ];
}
