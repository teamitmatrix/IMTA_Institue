/**
 * Standard return shape for Server Actions. Expected errors (validation,
 * unavailable services) are returned as values, not thrown, so forms can
 * show them via useActionState. Unexpected errors are thrown and caught by
 * error boundaries.
 */
export type ActionResult<TData = undefined> =
  | { ok: true; data: TData }
  | { ok: false; message: string; fieldErrors?: Record<string, string[] | undefined> };
