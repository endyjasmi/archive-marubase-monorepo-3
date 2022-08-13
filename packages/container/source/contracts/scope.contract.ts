import { CacheInterface } from "./cache.contract.js";

export interface ScopeInterface {
  readonly container: CacheInterface;

  readonly resolve: CacheInterface;

  readonly singleton: CacheInterface;

  fork(type: ForkType): this;
}

export type ForkType = "container" | "resolve";
