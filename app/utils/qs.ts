export function qs(params: Record<string, string>) {
  return new URLSearchParams(params).toString();
}
