declare const brand: unique symbol;
export type Brand<TValue, TBrand extends string> = TValue & {
  readonly [brand]: TBrand;
};

export type Nullable<T> = T | null;
export type Maybe<T> = T | null | undefined;

export type DeepReadonly<T> = T extends (infer U)[]
  ? DeepReadonlyArray<U>
  : T extends object
    ? DeepReadonlyObject<T>
    : T;
type DeepReadonlyArray<T> = readonly DeepReadonly<T>[];
type DeepReadonlyObject<T> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>;
};

export type Result<T, E = Error> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };

export const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
export const err = <E>(error: E): Result<never, E> => ({ ok: false, error });

export type AsyncState<T, E = Error> =
  | { readonly status: 'idle' }
  | { readonly status: 'loading' }
  | { readonly status: 'success'; readonly data: T }
  | { readonly status: 'error'; readonly error: E };

export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type NonEmptyArray<T> = readonly [T, ...T[]];
