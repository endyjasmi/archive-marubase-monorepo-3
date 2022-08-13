import { Map as ImmutableMap } from "immutable";
import { BindingKey } from "./common.contract.js";

export interface CacheInterface {
  readonly storeMap: ImmutableMap<BindingKey, unknown>;

  delete(key: BindingKey): this;

  fork(): this;

  get(key: BindingKey): unknown;

  has(key: BindingKey): boolean;

  set(key: BindingKey, value: unknown): this;
}
