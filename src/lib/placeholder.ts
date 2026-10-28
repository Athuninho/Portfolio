export const isTodo = (s: string | undefined): boolean => !!s && s.includes('[[TODO')

/** Splits text into plain and [[TODO: ...]] parts. */
export function splitTodo(s: string): { text: string; todo: boolean }[] {
  const out: { text: string; todo: boolean }[] = []
  const re = /\[\[TODO:?\s*([^\]]*)\]\]/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(s))) {
    if (m.index > last) out.push({ text: s.slice(last, m.index), todo: false })
    out.push({ text: m[1].trim(), todo: true })
    last = m.index + m[0].length
  }
  if (last < s.length) out.push({ text: s.slice(last), todo: false })
  return out
}
