export default function styleUnion(
  a: string | undefined,
  b: string | undefined,
): string {
  if (!a) return b ?? '';
  if (!b) return a;
  const aSet = new Set(a.split(' '));
  const bSet = new Set(b.split(' '));
  const union = new Set([...aSet, ...bSet]);
  return Array.from(union).join(' ');
}
