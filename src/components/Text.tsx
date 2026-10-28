import { splitTodo } from '../lib/placeholder'

/** Renders text, turning [[TODO: ...]] markers into visible placeholder chips. */
export default function Text({ children }: { children: string }) {
  return (
    <>
      {splitTodo(children).map((p, i) =>
        p.todo ? (
          <span key={i} className="todo-chip" title="Placeholder: replace with real information">
            TODO: {p.text}
          </span>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  )
}
