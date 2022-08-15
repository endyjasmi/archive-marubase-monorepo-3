import { BindingKey, Constructor } from "./contracts/common.contract.js";
import { ForkType, ScopeInterface } from "./contracts/scope.contract.js";

export class Scope implements ScopeInterface {
  protected _container: Map<BindingKey, unknown>;

  protected _resolve: Map<BindingKey, unknown>;

  protected _singleton: Map<BindingKey, unknown>;

  public constructor(
    singleton: Map<BindingKey, unknown> = new Map(),
    container: Map<BindingKey, unknown> = new Map(),
    resolve: Map<BindingKey, unknown> = new Map(),
  ) {
    this._singleton = singleton;
    this._container = container;
    this._resolve = resolve;
  }

  public get container(): Map<BindingKey, unknown> {
    return this._container;
  }

  public get resolve(): Map<BindingKey, unknown> {
    return this._resolve;
  }

  public get singleton(): Map<BindingKey, unknown> {
    return this._singleton;
  }

  public fork(type: ForkType): this {
    const constructor = this.constructor as Constructor<this>;
    return type !== "container"
      ? new constructor(this._singleton, this._container)
      : new constructor(this._singleton);
  }
}
