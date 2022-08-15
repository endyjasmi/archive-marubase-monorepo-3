import { BindingKey } from "./common.contract.js";

export interface ScopeInterface {
  readonly container: Map<BindingKey, unknown>;

  readonly resolve: Map<BindingKey, unknown>;

  readonly singleton: Map<BindingKey, unknown>;

  fork(type: ForkType): this;
}

export type ForkType = "container" | "resolve";
