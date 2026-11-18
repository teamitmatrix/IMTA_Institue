import type { DemoBlock } from "@/types/demos";

/** Renders pre-written example content blocks. */
export function ExampleBlocks({ blocks }: { blocks: DemoBlock[] }) {
  return (
    <div className="space-y-3 text-[0.95rem] leading-relaxed text-ink">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h":
            return (
              <p key={i} className="pt-1 text-sm font-semibold text-ink">
                {block.text}
              </p>
            );
          case "p":
            return (
              <p key={i} className="text-ink-muted">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-1.5 pl-5 text-ink-muted marker:text-brand">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal space-y-1.5 pl-5 text-ink-muted marker:font-mono marker:text-xs marker:text-ink-subtle">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            );
          case "code":
            return (
              <pre key={i} className="overflow-x-auto rounded-lg bg-navy px-4 py-3 font-mono text-sm text-on-navy">
                <code>{block.text}</code>
              </pre>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-lg border border-line">
                <table className="w-full min-w-[22rem] text-left text-sm">
                  {block.caption ? (
                    <caption className="border-b border-line bg-surface-muted px-3 py-2 text-left text-xs font-medium text-ink-subtle">
                      {block.caption}
                    </caption>
                  ) : null}
                  <thead className="bg-surface-muted text-ink">
                    <tr>
                      {block.head.map((cell) => (
                        <th key={cell} scope="col" className="px-3 py-2 font-semibold">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line text-ink-muted">
                    {block.rows.map((row) => (
                      <tr key={row.join("|")}>
                        {row.map((cell, c) => (
                          <td key={c} className="px-3 py-2 align-top">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
