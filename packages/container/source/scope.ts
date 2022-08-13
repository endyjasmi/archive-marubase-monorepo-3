import { Cache } from "./cache.js";
import { CacheInterface } from "./contracts/cache.contract.js";
import { Constructor } from "./contracts/common.contract.js";
import { ForkType, ScopeInterface } from "./contracts/scope.contract.js";

export class Scope implements ScopeInterface {
  protected _container: CacheInterface;

  protected _resolve: CacheInterface;

  protected _singleton: CacheInterface;

  public constructor(
    singleton?: CacheInterface,
    container?: CacheInterface,
    resolve?: CacheInterface,
  ) {
    this._singleton = singleton ?? new Cache();
    this._container = container ?? this._singleton;
    this._resolve = resolve ?? this._container;
  }

  public get container(): CacheInterface {
    return this._container;
  }

  public get resolve(): CacheInterface {
    return this._resolve;
  }

  public get singleton(): CacheInterface {
    return this._singleton;
  }

  public fork(type: ForkType): this {
    const constructor = this.constructor as Constructor<this>;
    const { container, resolve, singleton } = this;
    return type !== "container"
      ? new constructor(singleton, container, resolve.fork())
      : new constructor(singleton, container.fork());
  }
}
