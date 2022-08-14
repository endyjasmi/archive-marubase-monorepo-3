import { BindingKey } from "./common.contract.js";

export interface CacheInterface {
  [Symbol.iterator](): IterableIterator<[BindingKey, unknown]>;

  delete(key: BindingKey): this;

  entries(): [BindingKey, unknown][];

  fork(): this;

  get(key: BindingKey): unknown;

  has(key: BindingKey): boolean;

  keys(): BindingKey[];

  set(key: BindingKey, value: unknown): this;

  values(): unknown[];
}
