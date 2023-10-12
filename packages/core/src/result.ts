export type Result<T, E = undefined> =
  | { ok: true; fail: false; value: T }
  | { ok: false; fail: true; error: E | undefined };

export const Ok = <T>(data: T): Result<T, never> => ({
  ok: true,
  fail: false,
  value: data,
});

export const Err = <E>(error?: E): Result<never, E> => ({
  ok: false,
  fail: true,
  error,
});
