export type Result<T, E = undefined, D = undefined> =
  | { ok: true; fail: false; value: T }
  | { ok: false; fail: true; error: E | undefined; detail: D | undefined };

export const Ok = <T>(data: T): Result<T, never> => ({
  ok: true,
  fail: false,
  value: data,
});

export const Err = <E, D>(error?: E, detail?: D): Result<never, E, D> => ({
  ok: false,
  fail: true,
  error,
  detail,
});
