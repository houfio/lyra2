export function url(base: string | undefined, params: Record<string, string | number | boolean | undefined>) {
  const entries = Object.entries(params)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) => [k, String(v)]);
  const serialized = new URLSearchParams(Object.fromEntries(entries)).toString();

  return `${base ?? ''}${base && entries.length ? '?' : ''}${serialized}`;
}
